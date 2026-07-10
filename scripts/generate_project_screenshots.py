import os
from PIL import Image, ImageDraw, ImageFont

def generate_screenshots():
    # Make directory if not exists
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    projects_dir = os.path.join(public_dir, 'projects')
    os.makedirs(projects_dir, exist_ok=True)
    
    # 1280x800 desktop viewport dimension
    width, height = 1280, 800
    
    projects_info = [
        {
            "filename": "aura.webp",
            "title": "Aura Design Studio",
            "bg": "#0B0F19",
            "primary": "#4F8CFF",
            "accent": "#ffffff",
            "style": "minimalist"
        },
        {
            "filename": "designerss.webp",
            "title": "Designerss Creative",
            "bg": "#0D0D0D",
            "primary": "#F59E0B",
            "accent": "#E5E7EB",
            "style": "architectural"
        },
        {
            "filename": "pharmacare.webp",
            "title": "PharmaCare Dashboard",
            "bg": "#F8FAFC",  # Light dashboard look (since it's a demo software screenshot)
            "primary": "#0F172A",
            "accent": "#3B82F6",
            "style": "dashboard"
        },
        {
            "filename": "wedding.webp",
            "title": "Elegant Wedding invitation",
            "bg": "#FAF5F5",
            "primary": "#881337",
            "accent": "#BE123C",
            "style": "romantic"
        },
        {
            "filename": "navnidhi.webp",
            "title": "Navnidhi Industrial Portal",
            "bg": "#0F172A",
            "primary": "#10B981",
            "accent": "#FFFFFF",
            "style": "corporate"
        },
        {
            "filename": "shivedlife.webp",
            "title": "ShivedLife Medicare",
            "bg": "#ECFDF5",
            "primary": "#065F46",
            "accent": "#10B981",
            "style": "medical"
        },
        {
            "filename": "bookverse.webp",
            "title": "BookVerse Storefront",
            "bg": "#FAF7F2",
            "primary": "#1E1B4B",
            "accent": "#4338CA",
            "style": "bookstore"
        }
    ]
    
    for proj in projects_info:
        img = Image.new('RGB', (width, height), color=proj["bg"])
        draw = ImageDraw.Draw(img)
        
        # Draw some mock website layout based on style
        if proj["style"] == "minimalist":
            # Draw architectural lines and hero text
            draw.line([(100, 200), (1180, 200)], fill="#ffffff", width=2)
            draw.line([(100, 600), (1180, 600)], fill="#ffffff", width=2)
            draw.text((150, 250), proj["title"], fill=proj["primary"])
            draw.text((150, 350), "MINIMALISM & SPACE", fill="#ffffff")
            # Draw mock image boxes
            draw.rectangle([700, 250, 1100, 550], outline="#ffffff", width=2)
            draw.text((850, 380), "Media Grid Showcase", fill="#888888")
            
        elif proj["style"] == "architectural":
            draw.rectangle([100, 100, 400, 700], fill="#1E1E1E")
            draw.text((450, 150), proj["title"], fill=proj["primary"])
            draw.text((450, 220), "STRUCTURES OF TOMORROW", fill="#ffffff")
            draw.line([(450, 300), (1180, 300)], fill="#333333", width=1)
            # Grid of lines resembling blueprints
            for y in range(350, 700, 50):
                draw.line([(450, y), (1180, y)], fill="#222222", width=1)
            for x in range(450, 1180, 100):
                draw.line([(x, 350), (x, 700)], fill="#222222", width=1)
                
        elif proj["style"] == "dashboard":
            # Header
            draw.rectangle([0, 0, width, 80], fill="#0F172A")
            draw.text((50, 25), proj["title"], fill="#FFFFFF")
            # Sidebar
            draw.rectangle([0, 80, 240, height], fill="#1E293B")
            # Sidebar menu items
            for i, menu in enumerate(["Overview", "Patients", "Inventory", "Analytics"]):
                draw.text((40, 120 + i*50), menu, fill="#94A3B8")
            # Main panel cards
            draw.rectangle([280, 120, 560, 280], fill="#FFFFFF", outline="#E2E8F0", width=2)
            draw.text((310, 150), "Total Operations", fill="#64748B")
            draw.text((310, 200), "99.98% Success", fill=proj["accent"])
            
            draw.rectangle([600, 120, 880, 280], fill="#FFFFFF", outline="#E2E8F0", width=2)
            draw.text((630, 150), "Patient Safety", fill="#64748B")
            draw.text((630, 200), "100% Compliant", fill="#10B981")
            
            draw.rectangle([920, 120, 1200, 280], fill="#FFFFFF", outline="#E2E8F0", width=2)
            # Large chart area
            draw.rectangle([280, 320, 1200, 750], fill="#FFFFFF", outline="#E2E8F0", width=2)
            draw.text((310, 350), "Monthly Medical Production Analytics", fill="#0F172A")
            # Draw a line chart inside
            draw.line([(350, 650), (500, 500), (700, 580), (900, 420), (1150, 480)], fill=proj["accent"], width=4)
            
        elif proj["style"] == "romantic":
            # Centered warm design
            draw.text((300, 200), "You are invited to the wedding of", fill="#BE123C")
            draw.text((300, 300), "Caleb & Jessica", fill=proj["primary"])
            draw.text((300, 450), "Join us for our digital celebration.", fill="#888888")
            # Decorative borders
            draw.rectangle([100, 100, 1180, 700], outline=proj["accent"], width=2)
            
        elif proj["style"] == "corporate":
            # Dark industrial site
            draw.text((100, 150), proj["title"], fill=proj["primary"])
            draw.text((100, 220), "B2B Logistics and Heavy Materials Trading", fill="#94A3B8")
            # Draw some grid items resembling B2B catalogs
            for c in range(3):
                col_x = 100 + c * 380
                draw.rectangle([col_x, 320, col_x + 340, 680], fill="#1E293B", outline="#334155", width=2)
                draw.text((col_x + 30, 350), f"Heavy Product Category 0{c+1}", fill="#ffffff")
                draw.text((col_x + 30, 400), "Supplies & Parts", fill=proj["primary"])
                
        elif proj["style"] == "medical":
            # Medical green portal
            draw.text((100, 150), proj["title"], fill=proj["primary"])
            draw.text((100, 220), "Your trusted medical companion", fill="#34D399")
            draw.rectangle([100, 300, 1180, 700], fill="#FFFFFF", outline="#D1FAE5", width=2)
            draw.text((150, 350), "Schedule an Online Consultation", fill="#065F46")
            
        elif proj["style"] == "bookstore":
            # Book store items
            draw.text((100, 100), proj["title"], fill=proj["primary"])
            # Let's draw 4 books
            for i in range(4):
                col_x = 100 + i * 280
                draw.rectangle([col_x, 180, col_x + 240, 520], fill=proj["accent"])
                draw.text((col_x + 30, 250), f"Book Volume {i+1}", fill="#ffffff")
                draw.text((col_x + 30, 550), f"Pricing ${24.99 + i * 5}", fill="#1E1B4B")
                
        # Save as WebP
        out_path = os.path.join(projects_dir, proj["filename"])
        img.save(out_path, 'WEBP', quality=80)
        print(f"Generated screenshot mockup for {proj['title']} at {out_path}")

if __name__ == '__main__':
    generate_screenshots()
