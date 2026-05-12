#!/bin/bash
# Local script to fetch Facebook data (same as GitHub Actions workflow)

# Load environment variables from .env
set -a
source .env
set +a

BASE="https://graph.facebook.com/v19.0"
FIELDS_POSTS="id,message,created_time,full_picture,permalink_url,attachments{media_type,media,subattachments,url},reactions.summary(true),comments.summary(true),shares"
FIELDS_PHOTOS="id,name,created_time,images,link,album"

echo "Fetching posts from FB_PAGE=$FB_PAGE..."
curl -sf \
  "$BASE/$FB_PAGE/posts?fields=$FIELDS_POSTS&limit=20&access_token=$FB_TOKEN" \
  -o posts_raw.json

echo "Fetching photos from FB_PAGE=$FB_PAGE..."
curl -sf \
  "$BASE/$FB_PAGE/photos?type=uploaded&fields=$FIELDS_PHOTOS&limit=30&access_token=$FB_TOKEN" \
  -o photos_raw.json

echo "Processing data with Python..."
python3 process-fb-data.py

echo "Done! Check fb-data.json"
