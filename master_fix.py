import os

files = [
    '/var/www/evseren/frontend/src/app/cart/page.tsx',
    '/var/www/evseren/frontend/src/app/checkout/page.tsx',
    '/var/www/evseren/frontend/src/app/dashboard/page.tsx',
    '/var/www/evseren/frontend/src/app/orders/page.tsx',
    '/var/www/evseren/frontend/src/app/orders/[id]/page.tsx',
    '/var/www/evseren/frontend/src/app/page.tsx' # Ana Sayfa Eklendi
]

for f_path in files:
    if os.path.exists(f_path):
        try:
            with open(f_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lines = content.splitlines()
            # Önceki dinamik ve use client satırlarını temizle
            clean_lines = [l for l in lines if 'dynamic' not in l and 'use client' not in l]
            
            # Ana sayfa sunucu bileşeni (server component) olabilir, 
            # sadece use-client olanlarda en üste koyalım.
            if 'use client' in content:
                new_content = '"use client";\nexport const dynamic = "force-dynamic";\n' + '\n'.join(clean_lines).lstrip()
            else:
                new_content = 'export const dynamic = "force-dynamic";\n' + '\n'.join(clean_lines).lstrip()
            
            # useSession() çağrısını useSession() || {} olarak mühürle
            if 'useSession()' in new_content:
                new_content = new_content.replace('useSession()', '(useSession() || {})')
            
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed A-Z (Including Home): {f_path}')
        except Exception as e:
            print(f'Error fixing {f_path}: {e}')
