import os
import re

CSS_REPLACE = """
.custom-cursor{
    position: fixed;
    width: 30px;
    height: 30px;
    pointer-events: none;
    z-index: 9999;
}
"""

JS_REPLACE = """document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        gsap.to(mouseGlow, {
            x: e.clientX - 150,
            y: e.clientY - 150,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    if (cursor) {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.08,
            ease: "power1.out"
        });
    }
});"""

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html') or f.endswith('.css') or f.endswith('.js'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            modified = False

            # Replace custom-cursor css block
            if '.custom-cursor {' in content:
                content = re.sub(r'\.custom-cursor\s*\{[^}]+\}', CSS_REPLACE.strip(), content)
                modified = True

            # Fix heart particle left/top offset
            if "heart.style.left = e.clientX + 'px';" in content:
                content = content.replace("heart.style.left = e.clientX + 'px';", "heart.style.left = (e.clientX - 15) + 'px';")
                modified = True
            if "heart.style.top = e.clientY + 'px';" in content:
                content = content.replace("heart.style.top = e.clientY + 'px';", "heart.style.top = (e.clientY - 15) + 'px';")
                modified = True

            # Manual brace counting for mousemove replacement
            start_str = "document.addEventListener('mousemove', (e) => {"
            if start_str in content:
                start_idx = content.find(start_str)
                brace_count = 0
                in_block = False
                end_idx = -1
                for i in range(start_idx, len(content)):
                    if content[i] == '{':
                        brace_count += 1
                        in_block = True
                    elif content[i] == '}':
                        brace_count -= 1
                    
                    if in_block and brace_count == 0:
                        end_idx = i + 2 # to include ');'
                        break
                
                if end_idx != -1:
                    content = content[:start_idx] + JS_REPLACE + content[end_idx:]
                    modified = True

            if modified:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Updated {path}")
