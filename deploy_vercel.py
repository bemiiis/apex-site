import os, json, hashlib, mimetypes, urllib.request, urllib.error

SITE_DIR     = "/Users/bema/Desktop/Projects/apex-site"
PROJECT_NAME = "runapex"
TOKEN        = open(os.path.expanduser("~/.vercel_token")).read().strip()

HEADERS_JSON = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def sha1(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def api(method, path, body=None, headers=None):
    url  = f"https://api.vercel.com{path}"
    data = json.dumps(body).encode() if body else None
    hdrs = headers or HEADERS_JSON
    req  = urllib.request.Request(url, data=data, headers=hdrs, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        print("API error:", e.code, e.read().decode()); raise

files = []
for root, dirs, names in os.walk(SITE_DIR):
    dirs[:] = [d for d in dirs if not d.startswith(".")]
    for name in names:
        if name.startswith("."): continue
        full = os.path.join(root, name)
        rel  = os.path.relpath(full, SITE_DIR)
        size = os.path.getsize(full)
        files.append({"path": rel, "full": full, "sha": sha1(full), "size": size})

print(f"Deploying {len(files)} files...")

for f in files:
    with open(f["full"], "rb") as fh:
        content = fh.read()
    mime = mimetypes.guess_type(f["full"])[0] or "application/octet-stream"
    hdrs = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": mime,
        "x-vercel-digest": f["sha"],
        "Content-Length": str(f["size"]),
    }
    req = urllib.request.Request(
        "https://api.vercel.com/v2/files",
        data=content, headers=hdrs, method="POST"
    )
    try:
        with urllib.request.urlopen(req) as r: pass
    except urllib.error.HTTPError as e:
        if e.code != 409: raise

payload = {
    "name": PROJECT_NAME,
    "files": [{"file": f["path"], "sha": f["sha"], "size": f["size"]} for f in files],
    "projectSettings": {"framework": None, "outputDirectory": None},
    "target": "production",
}
deploy = api("POST", "/v13/deployments", payload)
url = deploy.get("url", "")
print(f"Done — https://{url}")
