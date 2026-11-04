import os
import glob

# Paths to all HTML and JS files
files = glob.glob('*.html') + glob.glob('*.js')

for filepath in files:
    if filepath == 'replace_numbers.py': continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content

    # 1. Replace ALL wa.me/905314602597 with wa.me/905077567887
    content = content.replace('wa.me/905314602597', 'wa.me/905077567887')
    
    # 2. Replace the specific topbar/footer HTML blocks that show the 531 number
    # Topbar usually has: <a href="tel:+905314602597"...>...</a> | <a href="tel:+905077567887"...>...</a>
    # We want to remove the 531 part and just keep the 507 part.
    
    # Let's just blindly replace visual 531 with 507 everywhere EXCEPT contact.html where we might need to be careful.
    # Actually, the user says "remove 531 from the page, let it be the other number, and in contact section make it the second number".
    
    if filepath == 'contact.html':
        # In contact.html, we need to keep 531 as the secondary number.
        # Let's swap 531 and 507 so 507 is primary.
        # It's easier to first change all 507 to a placeholder, then 531 to 507, then placeholder to 531.
        
        # WhatsApp link fix (already done above, let's make sure BOTH WA links are correct if there are two)
        pass # We will do a generic swap
    
    else:
        # For all other pages, replace all +90 531 460 25 97 with +90 507 756 78 87
        # and +905314602597 with +905077567887
        # Then we might have duplicates like 507 | 507, we can clean that up.
        content = content.replace('+90 531 460 25 97', '+90 507 756 78 87')
        content = content.replace('+905314602597', '+905077567887')
        
        # Fix duplicates in topbar if it became: +90 507 756 78 87 | +90 507 756 78 87
        # The exact string in topbar:
        dup1 = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 507 756 78 87</a> | \n            <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a>'
        dup2 = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 507 756 78 87</a> |\n            <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a>'
        dup3 = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 507 756 78 87</a> | <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a>'
        
        target = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 507 756 78 87</a>'
        
        content = content.replace(dup1, target).replace(dup2, target).replace(dup3, target)
        
        # Footer duplicate cleanup
        footer_dup1 = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a><br>\n                        <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a><br>'
        footer_target = '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a><br>'
        content = content.replace(footer_dup1, footer_target)
        
        # WhatsApp Footer duplicate
        wa_dup1 = '<a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (1)</a><br>\n                        <a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (2)</a>'
        wa_target = '<a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek</a>'
        content = content.replace(wa_dup1, wa_target)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

# Now handle contact.html specifically
# We want 507 to be primary and 531 to be secondary.
with open('contact.html', 'r', encoding='utf-8') as f:
    c_content = f.read()

# We will just do a manual swap for the topbar and the main contact info in contact.html
# Topbar in contact.html:
c_content = c_content.replace('<a href="tel:+905314602597" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 531 460 25 97</a> | \n            <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a>', '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;"><i class="fas fa-phone-alt"></i> +90 507 756 78 87</a>')

# Contact info section
c_content = c_content.replace('<span><a href="tel:+905314602597" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a></span><br>\n                <span><a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a></span>', '<span><a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a> (Birinci Hat)</span><br>\n                <span><a href="tel:+905314602597" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a> (İkinci Hat)</span>')

c_content = c_content.replace('<span><a href="https://wa.me/905314602597" target="_blank" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a></span><br>\n                <span><a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a></span>', '<span><a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a> (Birinci Hat)</span><br>\n                <span><a href="https://wa.me/905314602597" target="_blank" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a> (İkinci Hat)</span>')

# Footer in contact.html
c_content = c_content.replace('<a href="tel:+905314602597" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a><br>\n                        <a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a>', '<a href="tel:+905077567887" style="color:inherit;text-decoration:none;">+90 507 756 78 87</a><br>\n                        <a href="tel:+905314602597" style="color:inherit;text-decoration:none;">+90 531 460 25 97</a>')

c_content = c_content.replace('<a href="https://wa.me/905314602597" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (1)</a><br>\n                        <a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (2)</a>', '<a href="https://wa.me/905077567887" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (1)</a><br>\n                        <a href="https://wa.me/905314602597" target="_blank" style="color:inherit;text-decoration:none;">WhatsApp Destek (2)</a>')

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(c_content)
print("Updated contact.html specifically")

