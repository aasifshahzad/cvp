"""
Script to fix is_approved field for existing users
Run this to update existing admin, doctor, and staff users
"""
import logging
from sqlmodel import Session, select

from core.db import engine
from models.users_model import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def fix_user_approval():
    """Update is_approved field for existing users"""
    with Session(engine) as session:
        # Update admin user
        admin = session.exec(
            select(User).where(User.email == "admin@cvp.com")
        ).first()
        
        if admin:
            admin.is_approved = True
            session.add(admin)
            logger.info(f"Updated admin user: {admin.email}")
        else:
            logger.warning("Admin user not found")
        
        # Update doctor user
        doctor = session.exec(
            select(User).where(User.email == "doctor@cvp.com")
        ).first()
        
        if doctor:
            doctor.is_approved = True
            session.add(doctor)
            logger.info(f"Updated doctor user: {doctor.email}")
        else:
            logger.warning("Doctor user not found")
        
        # Update staff user
        staff = session.exec(
            select(User).where(User.email == "staff@cvp.com")
        ).first()
        
        if staff:
            staff.is_approved = True
            session.add(staff)
            logger.info(f"Updated staff user: {staff.email}")
        else:
            logger.warning("Staff user not found")
        
        session.commit()
        logger.info("User approval status updated successfully")


if __name__ == "__main__":
    logger.info("Fixing user approval status...")
    fix_user_approval()
    logger.info("Done!")

# Made with Bob
