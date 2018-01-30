"""add last login and post update columns

Revision ID: e1c458791003
Revises: f72e54a6c741
Create Date: 2018-01-29 23:09:47.273168

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1c458791003'
down_revision = 'f72e54a6c741'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('last_login', sa.DateTime, nullable=True))
    op.add_column('users', sa.Column('last_post_fetch', sa.DateTime, nullable=True))


def downgrade():
    drop_column('users', 'last_login')
    drop_column('users', 'last_post_fetch')
