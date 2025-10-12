#!/bin/bash

# Image Optimization Script for ICSD
# Converts PNG portraits from SOURCE FILES to WebP format (600×800)
# Usage: ./scripts/optimize-images.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SOURCE_DIR="SOURCE FILES"
TARGET_DIR="public/images/stories"
TARGET_WIDTH=600
TARGET_HEIGHT=800
WEBP_QUALITY=85

echo -e "${GREEN}🖼️  ICSD Image Optimization${NC}"
echo "================================"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ Error: ImageMagick is not installed${NC}"
    echo "Please install ImageMagick:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Error: SOURCE FILES directory not found${NC}"
    exit 1
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Counter for processed images
processed=0
skipped=0

echo -e "${YELLOW}Processing images from ${SOURCE_DIR}...${NC}"
echo ""

# Process each PNG file in SOURCE FILES
for source_file in "$SOURCE_DIR"/*.png; do
    # Check if any PNG files exist
    if [ ! -e "$source_file" ]; then
        echo -e "${YELLOW}⚠️  No PNG files found in SOURCE FILES${NC}"
        exit 0
    fi

    # Get filename without path and extension
    filename=$(basename "$source_file" .png)

    # Convert to kebab-case for web-friendly URLs
    # (e.g., "BarabelMercenary" -> "barabel-mercenary")
    web_filename=$(echo "$filename" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')

    # Target file path
    target_file="$TARGET_DIR/${web_filename}.webp"

    # Skip if already processed and up-to-date
    if [ -f "$target_file" ] && [ "$target_file" -nt "$source_file" ]; then
        echo -e "⏭️  ${YELLOW}Skipping${NC} $filename (already optimized)"
        ((skipped++))
        continue
    fi

    echo -e "🔄 ${YELLOW}Processing${NC} $filename..."

    # Convert and resize image
    # -resize: Fit image within target dimensions while preserving aspect ratio
    # -gravity center: Center the image
    # -extent: Ensure exact output dimensions with transparent background
    # -quality: WebP quality setting (85 = high quality, good compression)
    convert "$source_file" \
        -resize "${TARGET_WIDTH}x${TARGET_HEIGHT}^" \
        -gravity center \
        -extent "${TARGET_WIDTH}x${TARGET_HEIGHT}" \
        -quality $WEBP_QUALITY \
        "$target_file"

    if [ $? -eq 0 ]; then
        # Get file sizes for comparison
        source_size=$(du -h "$source_file" | cut -f1)
        target_size=$(du -h "$target_file" | cut -f1)

        echo -e "   ✅ ${GREEN}Success${NC}: ${web_filename}.webp (${source_size} → ${target_size})"
        ((processed++))
    else
        echo -e "   ❌ ${RED}Failed${NC} to process $filename"
    fi

    echo ""
done

# Summary
echo "================================"
echo -e "${GREEN}✨ Optimization Complete${NC}"
echo "   Processed: $processed images"
echo "   Skipped: $skipped images"
echo "   Output: $TARGET_DIR/"
echo ""
