import os

def main():
    pages_dir = os.path.join(os.getcwd(), 'src', 'pages')
    for filename in os.listdir(pages_dir):
        if not filename.endswith('.tsx'):
            continue
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        updated_content = content.replace('\\${SITE_URL}', '${SITE_URL}')
        
        if updated_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Fixed backslashes in {filename}")

if __name__ == '__main__':
    main()
