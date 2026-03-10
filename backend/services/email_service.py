import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = os.getenv("GMAIL_USER")
        self.sender_password = os.getenv("GMAIL_APP_PASSWORD")
        self.recipient_email = os.getenv("NOTIFICATION_EMAIL", "srd.hospitality.india@gmail.com")
        
    def send_inquiry_notification(self, inquiry_data: dict) -> bool:
        """Send email notification when new inquiry is received"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"New Inquiry from {inquiry_data['name']} - {inquiry_data['eventType'].title()}"
            msg['From'] = self.sender_email
            msg['To'] = self.recipient_email
            
            # Create HTML email body
            html = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f5f2; border-radius: 10px;">
                        <h2 style="color: #61525a; border-bottom: 3px solid #fad24b; padding-bottom: 10px;">
                            🎉 New Catering Inquiry
                        </h2>
                        
                        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <h3 style="color: #61525a; margin-top: 0;">Customer Details:</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{inquiry_data['name']}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                        <a href="mailto:{inquiry_data['email']}" style="color: #61525a;">{inquiry_data['email']}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                        <a href="tel:{inquiry_data['phone']}" style="color: #61525a;">{inquiry_data['phone']}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Event Type:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                        <span style="background-color: #fad24b; padding: 4px 12px; border-radius: 4px; font-weight: bold;">
                                            {inquiry_data['eventType'].title()}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Guest Count:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{inquiry_data.get('guestCount', 'Not specified')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Event Date:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{inquiry_data.get('eventDate', 'Not specified')}</td>
                                </tr>
                            </table>
                            
                            <h3 style="color: #61525a; margin-top: 30px;">Message:</h3>
                            <div style="background-color: #f7f5f2; padding: 15px; border-radius: 5px; border-left: 4px solid #61525a;">
                                {inquiry_data['message']}
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 15px; background-color: #61525a; color: white; border-radius: 8px; text-align: center;">
                            <p style="margin: 0; font-size: 14px;">
                                <strong>Action Required:</strong> Please respond to this inquiry within 24 hours for best customer experience.
                            </p>
                        </div>
                        
                        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
                            <p>This inquiry was submitted through Mangalam Caterers website</p>
                            <p>Time: {inquiry_data.get('createdAt', 'N/A')}</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Attach HTML content
            part = MIMEText(html, 'html')
            msg.attach(part)
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
                
            logger.info(f"Email notification sent successfully for inquiry from {inquiry_data['name']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False
    
    def send_confirmation_to_customer(self, customer_email: str, customer_name: str) -> bool:
        """Send confirmation email to customer"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = "Thank you for contacting Mangalam Caterers"
            msg['From'] = self.sender_email
            msg['To'] = customer_email
            
            html = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f5f2; border-radius: 10px;">
                        <h2 style="color: #61525a; text-align: center;">
                            Thank You for Your Inquiry!
                        </h2>
                        
                        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <p>Dear {customer_name},</p>
                            
                            <p>Thank you for reaching out to <strong>Mangalam Caterers</strong>. We have received your inquiry and appreciate your interest in our catering services.</p>
                            
                            <p>Our team will review your requirements and get back to you within <strong>24 hours</strong> with more information about our packages and availability.</p>
                            
                            <div style="background-color: #fad24b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="margin: 0 0 10px 0; color: #61525a;">Contact Us Directly:</h3>
                                <p style="margin: 5px 0;">📞 Phone: <a href="tel:9899301832" style="color: #61525a;">9899301832</a></p>
                                <p style="margin: 5px 0;">📧 Email: <a href="mailto:srd.hospitality.india@gmail.com" style="color: #61525a;">srd.hospitality.india@gmail.com</a></p>
                                <p style="margin: 5px 0;">💬 WhatsApp: <a href="https://wa.me/919899301832" style="color: #61525a;">Chat with us</a></p>
                            </div>
                            
                            <p>We look forward to making your event memorable!</p>
                            
                            <p style="margin-top: 30px;">
                                Best regards,<br>
                                <strong>Mangalam Caterers Team</strong><br>
                                11-D, Knowledge Park III, Greater Noida, Uttar Pradesh
                            </p>
                        </div>
                        
                        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
                            <p>This is an automated confirmation email. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            part = MIMEText(html, 'html')
            msg.attach(part)
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
                
            logger.info(f"Confirmation email sent to customer: {customer_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send confirmation email: {str(e)}")
            return False

# Create singleton instance
email_service = EmailService()
