from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from models.inquiry import Inquiry, InquiryCreate
from services.email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form / Inquiry Endpoints
@api_router.post("/contact/inquiry", response_model=dict)
async def create_inquiry(inquiry: InquiryCreate):
    """
    Submit a contact form inquiry
    - Saves to database
    - Sends email notification to business owner
    - Sends confirmation email to customer
    """
    try:
        # Create inquiry object
        inquiry_obj = Inquiry(**inquiry.model_dump())
        inquiry_dict = inquiry_obj.model_dump()
        
        # Convert datetime to ISO string for MongoDB
        inquiry_dict['createdAt'] = inquiry_dict['createdAt'].isoformat()
        
        # Save to database
        result = await db.inquiries.insert_one(inquiry_dict)
        
        if result.inserted_id:
            logger.info(f"New inquiry saved from {inquiry.name} ({inquiry.email})")
            
            # Send email notification to business owner (async)
            try:
                email_sent = email_service.send_inquiry_notification(inquiry_dict)
                if email_sent:
                    logger.info("Email notification sent to business owner")
                else:
                    logger.warning("Failed to send email notification to business owner")
            except Exception as e:
                logger.error(f"Error sending email notification: {str(e)}")
            
            # Send confirmation email to customer
            try:
                confirmation_sent = email_service.send_confirmation_to_customer(
                    inquiry.email, 
                    inquiry.name
                )
                if confirmation_sent:
                    logger.info(f"Confirmation email sent to customer: {inquiry.email}")
            except Exception as e:
                logger.error(f"Error sending confirmation email: {str(e)}")
            
            return {
                "success": True,
                "message": "Thank you! Your inquiry has been received. We'll contact you within 24 hours.",
                "inquiryId": inquiry_obj.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save inquiry")
            
    except Exception as e:
        logger.error(f"Error processing inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing inquiry: {str(e)}")

@api_router.get("/contact/inquiries", response_model=List[dict])
async def get_inquiries(status: str = None, limit: int = 100):
    """
    Get all inquiries (for admin panel)
    Optional filter by status: new, contacted, closed
    """
    try:
        query = {}
        if status:
            query["status"] = status
        
        inquiries = await db.inquiries.find(query, {"_id": 0}).sort("createdAt", -1).limit(limit).to_list(limit)
        
        return inquiries
    except Exception as e:
        logger.error(f"Error fetching inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching inquiries: {str(e)}")

@api_router.get("/contact/inquiries/{inquiry_id}", response_model=dict)
async def get_inquiry(inquiry_id: str):
    """Get a specific inquiry by ID"""
    try:
        inquiry = await db.inquiries.find_one({"id": inquiry_id}, {"_id": 0})
        
        if not inquiry:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        
        return inquiry
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching inquiry: {str(e)}")

@api_router.patch("/contact/inquiries/{inquiry_id}/status", response_model=dict)
async def update_inquiry_status(inquiry_id: str, status: str):
    """Update inquiry status (for admin use)"""
    try:
        valid_statuses = ["new", "contacted", "closed"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = await db.inquiries.update_one(
            {"id": inquiry_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found or status unchanged")
        
        return {"success": True, "message": f"Inquiry status updated to {status}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating inquiry status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating inquiry: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()