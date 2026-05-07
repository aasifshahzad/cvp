"""add audit_log model

Revision ID: 72b5e3eba95c
Revises: 46da6b8459ca
Create Date: 2026-01-02 22:39:37.812152

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '72b5e3eba95c'
down_revision: Union[str, Sequence[str], None] = '46da6b8459ca'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # This migration is deprecated/duplicated - no schema changes
    pass


def downgrade() -> None:
    """Downgrade schema."""
    # This migration is deprecated/duplicated - no schema changes
    pass

