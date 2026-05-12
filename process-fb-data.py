import json
from datetime import datetime, UTC

with open("posts_raw.json") as f:
    posts_raw = json.load(f)
with open("photos_raw.json") as f:
    photos_raw = json.load(f)

out = {
    "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "posts": posts_raw.get("data", []),
    "photos": photos_raw.get("data", []),
}

with open("fb-data.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print(f"✓ Wrote {len(out['posts'])} posts, {len(out['photos'])} photos to fb-data.json")
