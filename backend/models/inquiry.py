from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

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
    status: str = "new"  # new, contacted, closed
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Rahul Sharma",
                "email": "rahul@example.com",
                "phone": "9876543210",
                "eventType": "wedding",
                "guestCount": "200",
                "eventDate": "2024-06-15",
                "message": "Looking for premium wedding catering package"
            }
        }
