import os

# Kalan bozuk Turkce karakter kaliplari -> dogru karakter
replacements = [
    ('\u00c3\u00bc', '\u00fc'),   # ü
    ('\u00c3\u009c', '\u00dc'),   # Ü
    ('\u00c3\u00b6', '\u00f6'),   # ö
    ('\u00c3\u0096', '\u00d6'),   # Ö
    ('\u00c3\u00a7', '\u00e7'),   # ç
    ('\u00c3\u0087', '\u00c7'),   # Ç
    ('\u00c4\u009f', '\u011f'),   # ğ
    ('\u00c4\u009e', '\u011e'),   # Ğ
    ('\u00c5\u009f', '\u015f'),   # ş
    ('\u00c5\u009e', '\u015e'),   # Ş
    ('\u00c4\u00b0', '\u0130'),   # İ
    ('\u00c4\u00b1', '\u0131'),   # ı
    ('\u00c3\u00a2', '\u00e2'),   # â
    ('\u00c3\u00ae', '\u00ee'),   # î
    ('\u00c3\u00bb', '\u00fb'),   # û
    # Ekstra patlayan pattern'lar
    ('ÅŸ', 'ş'),
    ('Å\x9f', 'ş'),
    ('Å\x9e', 'Ş'),
    ('Ä\x9f', 'ğ'),
    ('Ä\x9e', 'Ğ'),
    ('Ä\xb0', 'İ'),
    ('Ä\xb1', 'ı'),
    ('Ã¼', 'ü'),
    ('Ãœ', 'Ü'),
    ('Ã¶', 'ö'),
    ('Ã\x96', 'Ö'),
    ('Ã§', 'ç'),
    ('Ã\x87', 'Ç'),
    ('Ä\x9f', 'ğ'),
]

files = [
    'index.html',
    'products.html',
    'about.html',
    'contact.html',
]

for fname in files:
    if not os.path.exists(fname):
        print(f'BULUNAMADI: {fname}')
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for bad, good in replacements:
        content = content.replace(bad, good)
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    changed = sum(1 for a, b in zip(original, content) if a != b)
    print(f'OK: {fname} ({changed} karakter degistirildi)')

print('TAMAMLANDI')
