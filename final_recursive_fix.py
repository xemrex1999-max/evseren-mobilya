import os

root_dir = '/var/www/evseren/frontend/src/app'

# Tüm page.tsx dosyalarını rekürsif olarak bul
for root, dirs, files in os.walk(root_dir):
    for name in files:
        if name == 'page.tsx':
            f_path = os.path.join(root, name)
            try:
                with open(f_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Build'i engellemeyecekse (sadece dynamic olanlarda veya fetch olanlarda gereklidir ama
                # kırmak yerine hepsini mühürlemek en güvenli "tek hamle" çözümüdür)
                lines = content.splitlines()
                clean_lines = [l for l in lines if 'dynamic' not in l and 'use client' not in l]
                
                # Directive sıralama mantığı
                if 'use client' in content:
                    new_content = '"use client";\nexport const dynamic = "force-dynamic";\n' + '\n'.join(clean_lines).lstrip()
                else:
                    new_content = 'export const dynamic = "force-dynamic";\n' + '\n'.join(clean_lines).lstrip()
                
                # useSession() build-time çökme koruması
                if 'useSession()' in new_content:
                    new_content = new_content.replace('useSession()', '(useSession() || {})')
                
                with open(f_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Final Fix Applied: {f_path}')
            except Exception as e:
                print(f'Error fixing {f_path}: {e}')
