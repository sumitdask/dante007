import os
import re
import urllib.request

files = [
    'index.html',
    'google-ads-mot-garage-stoke-on-trent.html',
    'google-ads-sillet-tyres-aberdeen.html',
    'google-ads-xpress-tyres-manchester.html'
]

print("=== 1. HTTP STATUS CHECK (Live Server http://localhost:8080) ===")
for f in files:
    url = f"http://localhost:8080/{f}"
    try:
        res = urllib.request.urlopen(url)
        print(f"{f}: HTTP {res.status} OK (length: {len(res.read())} bytes)")
    except Exception as e:
        print(f"{f}: FAILED - {e}")

print("\n=== 2. ASSET RESOLUTION CHECK ===")
missing_assets = []
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    imgs = re.findall(r'src=["\']([^"\']+)["\']', content)
    for img in imgs:
        if img.startswith('http') or img.startswith('data:'):
            continue
        full_path = os.path.normpath(img)
        if not os.path.exists(full_path):
            print(f"[{f}] Missing image: {img}")
            missing_assets.append((f, img))
    modal_imgs = re.findall(r'openProofModal\([^)]+["\'](assets/[^"\']+)["\']\)', content)
    for mimg in modal_imgs:
        full_path = os.path.normpath(mimg)
        if not os.path.exists(full_path):
            print(f"[{f}] Missing modal image: {mimg}")
            missing_assets.append((f, mimg))

if not missing_assets:
    print("ALL referenced image assets exist on disk!")

print("\n=== 3. INTERNAL ANCHOR NAVIGATION CHECK ===")
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    anchors = re.findall(r'href=["\']#([^"\']+)["\']', content)
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', content))
    missing_ids = [a for a in anchors if a not in ids and a != '']
    if missing_ids:
        print(f"[{f}] Missing target IDs for anchors: {set(missing_ids)}")
    else:
        print(f"[{f}] All internal anchor links match valid element IDs!")

print("\n=== 4. CASE STUDY DOM ELEMENT CHECKS FOR JAVASCRIPT ===")
js_elements = [
    'slider-track', 'slider-arrow-prev', 'slider-arrow-next',
    'slider-dots-group', 'slider-counter-info', 'slider-viewport',
    'proof-modal', 'proof-modal-title', 'proof-modal-desc',
    'proof-modal-img', 'proof-modal-image-wrap', 'current-year'
]
for f in files[1:]:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', content))
    missing_js = [elem for elem in js_elements if elem not in ids]
    if missing_js:
        print(f"[{f}] Missing JS DOM elements: {missing_js}")
    else:
        print(f"[{f}] All slider and modal JS elements present!")
