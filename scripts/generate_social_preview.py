import os
from PIL import Image, ImageDraw, ImageFont

def generate_social_preview():
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    output_path = os.path.join(public_dir, 'companylogo-social.webp')
    
    # 1. Create a 1200x630 canvas with dark navy background (#060B1A)
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), color='#060B1A')
    draw = ImageDraw.Draw(img)
    
    # 2. Draw some aesthetic ambient gradient circles
    # Accent cyan glow
    glow = Image.new('RGBA', (600, 600), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for r in range(300, 0, -2):
        alpha = int((1 - r/300) * 15)  # Soft fade
        glow_draw.ellipse([300 - r, 300 - r, 300 + r, 300 + r], fill=(79, 140, 255, alpha))
    
    # Paste glows
    img.paste(glow, (600, 20), glow)
    
    # Draw simple vector grid (like section-white grid in dark mode)
    grid_color = (255, 255, 255, 4)  # very faint white
    grid_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    grid_size = 40
    for x in range(0, width, grid_size):
        grid_draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 6))
    for y in range(0, height, grid_size):
        grid_draw.line([(0, y), (width, y)], fill=(255, 255, 255, 6))
    img.paste(grid_img, (0, 0), grid_img)
    
    # 3. Draw text/branding
    # Let's use simple shapes to construct a nice logo icon
    # Draw nested circles for Orbit logo
    draw.ellipse([80, 240, 180, 340], fill=None, outline='#4F8CFF', width=3)
    draw.ellipse([100, 260, 160, 320], fill=None, outline='#1F3A93', width=2)
    draw.ellipse([120, 280, 140, 300], fill='#4F8CFF')
    
    # For text, since custom fonts may not be installed on user system, we can draw neat vector representations
    # or just use default PIL font which is simple, or write title with standard PIL text
    try:
        font_title = ImageFont.load_default(size=48)
        font_sub = ImageFont.load_default(size=24)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    draw.text((220, 250), "Orbit DevStudio", fill='#FFFFFF', font=font_title)
    draw.text((220, 315), "Premium Software Engineering Studio", fill='#4F8CFF', font=font_sub)
    draw.text((220, 350), "Web, Mobile, and Scale on Demand", fill='#64748B', font=font_sub)
    
    # Save as WebP
    img.save(output_path, 'WEBP', quality=85)
    print(f"Social preview image generated at: {output_path}")

if __name__ == '__main__':
    generate_social_preview()
