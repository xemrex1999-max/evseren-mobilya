
import os
import json
import sys

base_path = '.'
folders = ['evrensen', 'pirlife']
products = []
id_counter = 100

def get_cat(name):
    name = name.lower()
    if 'yatak' in name: return 'yatak'
    if 'yemek' in name: return 'yemek'
    if 'dugun' in name or 'paket' in name: return 'dugun'
    if 'koltuk' in name: return 'koltuk'
    if 'tv' in name: return 'tv'
    if 'kose' in name: return 'kose'
    return 'mobilya'

for folder in folders:
    folder_path = os.path.join(base_path, folder)
    if not os.path.exists(folder_path):
        continue
    
    for sub in os.listdir(folder_path):
        sub_path = os.path.join(folder_path, sub)
        if os.path.isdir(sub_path):
            try:
                images = [f for f in os.listdir(sub_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            except:
                continue
                
            if images:
                primary_img = f"{folder}/{sub}/{images[0]}"
                products.append({
                    "id": id_counter,
                    "name": sub,
                    "price": 45000 + (id_counter % 10) * 1000,
                    "oldPrice": 52000 + (id_counter % 10) * 1000,
                    "cat": get_cat(sub),
                    "img": primary_img,
                    "badge": "YENI" if id_counter % 3 == 0 else ""
                })
                id_counter += 1

with open('products_found.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Success: {len(products)} products found.")
