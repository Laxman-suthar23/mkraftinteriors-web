#!/bin/bash

# Database backup script for Karni Interiors

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="karni_interiors_backup_$DATE.sql"

echo "🗄️  Starting database backup..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Extract database connection details from DATABASE_URL
if [[ -z "$DATABASE_URL" ]]; then
    echo "❌ DATABASE_URL environment variable is required"
    exit 1
fi

echo "📦 Creating database backup..."

# For PostgreSQL
if [[ $DATABASE_URL == postgres* ]] || [[ $DATABASE_URL == postgresql* ]]; then
    pg_dump $DATABASE_URL > "$BACKUP_DIR/$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✅ Database backup created successfully!"
        echo "📄 Backup file: $BACKUP_DIR/$BACKUP_FILE"
        
        # Compress the backup
        gzip "$BACKUP_DIR/$BACKUP_FILE"
        echo "🗜️  Backup compressed: $BACKUP_DIR/$BACKUP_FILE.gz"
    else
        echo "❌ Database backup failed!"
        exit 1
    fi
else
    echo "❌ Unsupported database type. Only PostgreSQL is supported."
    exit 1
fi

# Clean up old backups (keep last 7 days)
echo "🧹 Cleaning up old backups..."
find $BACKUP_DIR -name "karni_interiors_backup_*.sql.gz" -mtime +7 -delete

echo "✅ Backup process completed!"
