import os
from PIL import Image

def optimize():
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    
    # 1. Optimize companylogo-96.png into companylogo.webp, favicon-32x32.png, favicon-16x16.png
    logo_src = os.path.join(public_dir, 'companylogo-96.png')
    
    if os.path.exists(logo_src):
        with Image.open(logo_src) as img:
            # Save 96x96 webp
            webp_path = os.path.join(public_dir, 'companylogo.webp')
            img.save(webp_path, 'WEBP', quality=90)
            print(f"Created optimized WebP logo at {webp_path}")
            
            # Save 32x32 favicon
            fav32_path = os.path.join(public_dir, 'favicon-32x32.png')
            img.resize((32, 32), Image.Resampling.LANCZOS).save(fav32_path, 'PNG')
            print(f"Created 32x32 favicon at {fav32_path}")
            
            # Save 16x16 favicon
            fav16_path = os.path.join(public_dir, 'favicon-16x16.png')
            img.resize((16, 16), Image.Resampling.LANCZOS).save(fav16_path, 'PNG')
            print(f"Created 16x16 favicon at {fav16_path}")
    else:
        print(f"Error: {logo_src} not found!")

    # 2. Optimize healthcare.jpg to healthcare.webp
    healthcare_src = os.path.join(public_dir, 'healthcare.jpg')
    if os.path.exists(healthcare_src):
        with Image.open(healthcare_src) as img:
            health_webp_path = os.path.join(public_dir, 'healthcare.webp')
            img.save(health_webp_path, 'WEBP', quality=80)
            print(f"Created WebP image for healthcare at {health_webp_path}")
    else:
        print(f"Error: {healthcare_src} not found!")

    # 3. Remove giant companylogo.png and favicon.png if they exist
    giant_logo = os.path.join(public_dir, 'companylogo.png')
    giant_favicon = os.path.join(public_dir, 'favicon.png')
    
    if os.path.exists(giant_logo):
        os.remove(giant_logo)
        print(f"Removed giant logo: {giant_logo}")
        
    if os.path.exists(giant_favicon):
        os.remove(giant_favicon)
        print(f"Removed giant favicon: {giant_favicon}")

if __name__ == '__main__':
    optimize()
