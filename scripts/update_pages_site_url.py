import os
import re

def main():
    pages_dir = os.path.join(os.getcwd(), 'src', 'pages')
    for filename in os.listdir(pages_dir):
        if not filename.endswith('.tsx') or filename == 'Home.tsx':
            continue
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'SITE_URL' in content:
            print(f"Skipping {filename} - SITE_URL already present")
            continue

        # Insert dynamic import
        lines = content.split('\n')
        inserted = False
        for i, line in enumerate(lines):
            if line.startswith('import '):
                lines.insert(i + 1, "import { SITE_URL } from '../config/site';")
                inserted = True
                break
        
        if not inserted:
            lines.insert(0, "import { SITE_URL } from '../config/site';")
        
        content = '\n'.join(lines)

        # 1. Replace attributes: href="https://orbitdevstudios.vercel.app/xyz" -> href={`${SITE_URL}/xyz`}
        content = re.sub(
            r'href="https://orbitdevstudios.vercel.app([^"]*)"',
            r'href={`\${SITE_URL}\1`}',
            content
        )

        # 2. Replace content="https://orbitdevstudios.vercel.app/xyz" -> content={`${SITE_URL}/xyz`}
        content = re.sub(
            r'content="https://orbitdevstudios.vercel.app([^"]*)"',
            r'content={`\${SITE_URL}\1`}',
            content
        )

        # 3. Replace JSON/object strings: "https://orbitdevstudios.vercel.app/xyz" -> `${SITE_URL}/xyz`
        content = re.sub(
            r'"https://orbitdevstudios.vercel.app([^"]*)"',
            r'`\${SITE_URL}\1`',
            content
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

if __name__ == '__main__':
    main()
