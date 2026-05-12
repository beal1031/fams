# Local script to fetch Facebook data (PowerShell version)

# Load .env file
$envContent = Get-Content .env | Where-Object { $_ -notmatch '^\s*#' -and $_ -match '=' }
foreach ($line in $envContent) {
    $parts = $line -split '=', 2
    if ($parts.Length -eq 2) {
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        [Environment]::SetEnvironmentVariable($key, $value)
    }
}

$FB_TOKEN = [Environment]::GetEnvironmentVariable("FB_TOKEN")
$FB_PAGE = [Environment]::GetEnvironmentVariable("FB_PAGE")

Write-Host "Fetching posts from FB_PAGE=$FB_PAGE..." -ForegroundColor Cyan

$BASE = "https://graph.facebook.com/v19.0"
$FIELDS_POSTS = "id,message,created_time,full_picture,permalink_url,attachments{media_type,media,subattachments,url},reactions.summary(true),comments.summary(true),shares"
$FIELDS_PHOTOS = "id,name,created_time,images,link,album"

$postsUrl = "$BASE/$FB_PAGE/posts?fields=$FIELDS_POSTS&limit=20&access_token=$FB_TOKEN"
Invoke-WebRequest -Uri $postsUrl -OutFile posts_raw.json

Write-Host "Fetching photos from FB_PAGE=$FB_PAGE..." -ForegroundColor Cyan
$photosUrl = "$BASE/$FB_PAGE/photos?type=uploaded&fields=$FIELDS_PHOTOS&limit=30&access_token=$FB_TOKEN"
Invoke-WebRequest -Uri $photosUrl -OutFile photos_raw.json

Write-Host "Processing data with Python..." -ForegroundColor Cyan

python3 process-fb-data.py

Write-Host "Done! Check fb-data.json" -ForegroundColor Green
