"""
Vercel Serverless Function Entry Point for FastAPI Backend
This file wraps the FastAPI app to work with Vercel's serverless architecture
"""
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import sys
from pathlib import Path

# Add parent directory to path to import modules
sys.path.append(str(Path(__file__).parent.parent))

# Import email service
try:
    from services.email_service import email_service
except ImportError:
    # Fallback for Vercel deployment
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    
    class EmailService:
        def __init__(self):
            self.smtp_host = "smtp.gmail.com"
            self.smtp_port = 587
            self.sender_email = os.getenv("GMAIL_USER")
            self.sender_password = os.getenv("GMAIL_APP_PASSWORD")
            self.recipient_email = os.getenv("NOTIFICATION_EMAIL", "srd.hospitality.india@gmail.com")
        
        def send_inquiry_notification(self, inquiry_data: dict) -> bool:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f"New Inquiry from {inquiry_data['name']} - {inquiry_data['eventType'].title()}"
                msg['From'] = self.sender_email
                msg['To'] = self.recipient_email
                
                html = f"""
                <html>
                    <body style="font-family: Arial, sans-serif;">
                        <h2>🎉 New Catering Inquiry</h2>
                        <p><strong>Name:</strong> {inquiry_data['name']}</p>
                        <p><strong>Email:</strong> {inquiry_data['email']}</p>
                        <p><strong>Phone:</strong> {inquiry_data['phone']}</p>
                        <p><strong>Event Type:</strong> {inquiry_data['eventType']}</p>
                        <p><strong>Guest Count:</strong> {inquiry_data.get('guestCount', 'N/A')}</p>
                        <p><strong>Event Date:</strong> {inquiry_data.get('eventDate', 'N/A')}</p>
                        <p><strong>Message:</strong><br>{inquiry_data['message']}</p>
                    </body>
                </html>
                """
                
                part = MIMEText(html, 'html')
                msg.attach(part)
                
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.sender_email, self.sender_password)
                    server.send_message(msg)
                return True
            except Exception as e:
                logging.error(f"Email error: {str(e)}")
                return False
        
        def send_confirmation_to_customer(self, customer_email: str, customer_name: str) -> bool:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = "Thank you for contacting Mangalam Caterers"
                msg['From'] = self.sender_email
                msg['To'] = customer_email
                
                html = f"""
                <html>
                    <body style="font-family: Arial, sans-serif;">
                        <h2>Thank You for Your Inquiry!</h2>
                        <p>Dear {customer_name},</p>
                        <p>Thank you for reaching out to Mangalam Caterers. We'll get back to you within 24 hours.</p>
                        <p>📞 9899301832 | 📧 srd.hospitality.india@gmail.com</p>
                    </body>
                </html>
                """
                
                part = MIMEText(html, 'html')
                msg.attach(part)
                
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.sender_email, self.sender_password)
                    server.send_message(msg)
                return True
            except Exception as e:
                logging.error(f"Email error: {str(e)}")
                return False
    
    email_service = EmailService()

# Models
class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    eventType: str
    guestCount: Optional[str] = None
    eventDate: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=1000)

class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    eventType: str
    guestCount: Optional[str] = None
    eventDate: Optional[str] = None
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# MongoDB connection with connection pooling for serverless
mongo_url = os.getenv('MONGO_URL', os.getenv('MONGODB_URI'))
if not mongo_url:
    raise ValueError("MONGO_URL or MONGODB_URI environment variable is required")

client = AsyncIOMotorClient(
    mongo_url,
    maxPoolSize=10,
    minPoolSize=1,
    maxIdleTimeMS=45000,
    serverSelectionTimeoutMS=5000
)
db = client[os.getenv('DB_NAME', 'test_database')]

# Create FastAPI app
app = FastAPI(title="Mangalam Caterers API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Update with your Vercel frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Health check
@app.get("/")
@app.get("/api")
async def root():
    return {"message": "Mangalam Caterers API", "status": "running"}

# Contact Form Endpoints
@app.post("/api/contact/inquiry")
async def create_inquiry(inquiry: InquiryCreate):
    """Submit a contact form inquiry"""
    try:
        inquiry_obj = Inquiry(**inquiry.model_dump())
        inquiry_dict = inquiry_obj.model_dump()
        inquiry_dict['createdAt'] = inquiry_dict['createdAt'].isoformat()
        
        # Save to database
        result = await db.inquiries.insert_one(inquiry_dict)
        
        if result.inserted_id:
            logger.info(f"Inquiry saved from {inquiry.name}")
            
            # Send emails (non-blocking)
            try:
                email_service.send_inquiry_notification(inquiry_dict)
                email_service.send_confirmation_to_customer(inquiry.email, inquiry.name)
            except Exception as e:
                logger.error(f"Email error: {str(e)}")
            
            return {
                "success": True,
                "message": "Thank you! Your inquiry has been received. We'll contact you within 24 hours.",
                "inquiryId": inquiry_obj.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save inquiry")
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/contact/inquiries")
async def get_inquiries(status: str = None, limit: int = 100):
    """Get all inquiries"""
    try:
        query = {"status": status} if status else {}
        inquiries = await db.inquiries.find(query, {"_id": 0}).sort("createdAt", -1).limit(limit).to_list(limit)
        return inquiries
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/contact/inquiries/{inquiry_id}")
async def get_inquiry(inquiry_id: str):
    """Get specific inquiry"""
    try:
        inquiry = await db.inquiries.find_one({"id": inquiry_id}, {"_id": 0})
        if not inquiry:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        return inquiry
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# For Vercel serverless - must be at module level
# Vercel looks for 'app' variable specifically
app = app  # This ensures 'app' is available at module level
