from django.core.management.base import BaseCommand
from products.models import Component
import requests
from bs4 import BeautifulSoup

CATEGORIES = {
    "GPU": "https://www.newegg.com/GPU-Video-Graphics-Device/Category/ID-38",
    "CPU": "https://www.newegg.com/CPU-Processor/Category/ID-34",
    "RAM": "https://www.newegg.com/Memory/Category/ID-17",
    "Motherboard": "https://www.newegg.com/Motherboard/Category/ID-20",
    "Computer Case": "https://www.newegg.com/Computer-Case/Category/ID-9",
    "Power Supply": "https://www.newegg.com/Power-Supply/Category/ID-32"
}

class Command(BaseCommand):
    help = "Scrape PC components and save them into the database"

    def handle(self, *args, **kwargs):
        total_count = 0

        for category, url in CATEGORIES.items():
            response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
            soup = BeautifulSoup(response.text, "lxml")

            count = 0
            for item in soup.select(".item-cell"):
                name_tag = item.select_one(".item-title")
                price_tag = item.select_one(".price-current strong")
                img_tag = item.select_one(".item-img img")

                if name_tag and price_tag:
                    Component.objects.update_or_create(
                        name=name_tag.text.strip(),
                        defaults={
                            "price": float(price_tag.text.strip().replace(",", "")),
                            "category": category,
                            "source_url": url,
                            "brand": self.get_brand(name_tag.text),
                            "image_url": img_tag.get("src")
                        }
                    )
                    count += 1

            self.stdout.write(self.style.SUCCESS(f"Scraoed {count} {category}(s)"))
            total_count += count

        self.stdout.write(self.style.SUCCESS(f"✅ Scrapped {count} components!"))

    def get_brand(self, name: str) -> str:
            name_lower = name.lower()

            if "intel" in name_lower:
                 return "Intel"
            elif "amd" in name_lower:
                 return "AMD"
            elif "nvidia" in name_lower or "geforce" in name_lower or "rtx" in name_lower or "gtx" in name_lower:
                 return "NVIDIA"
            elif "corsair" in name_lower:
                 return "Corsair"
            elif "v-color" in name_lower:
                 return "V-COLOR"
            elif "g.skill" in name_lower:
                 return "G.SKILL"
            elif "team group" in name_lower:
                 return "Team Group"
            elif "patriot" in name_lower or "viper" in name_lower:
                 return "Patriot"
            elif "samsung" in name_lower:
                 return "Samsung"
            elif "msi" in name_lower:
                 return "MSI"
            elif "asrock" in name_lower:
                 return "ASRock"
            elif "gigabyte" in name_lower:
                 return "GIGABYTE"
            elif "asus" in name_lower:
                 return "ASUS"
            elif "montech" in name_lower:
                 return "MONTECH"
            return "Unknown"