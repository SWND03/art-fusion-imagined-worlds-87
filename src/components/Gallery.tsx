
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { GalleryHorizontal, Download } from "lucide-react";

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Dreamer",
      style: "Surreal",
      description: "A fusion of mountain landscapes with surreal elements",
      position: "right" // Person positioned on the right side
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Desert Portal",
      style: "Fantasy",
      description: "Desert dunes merged with fantasy architecture",
      position: "left" // Person positioned on the left side
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Enchanted Waters",
      style: "Watercolor",
      description: "Watercolor effect on merged landscape photography",
      position: "right" // Person positioned on the right side
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Sacred Fusion",
      style: "Gothic",
      description: "Architecture merged with mystical elements",
      position: "left" // Person positioned on the left side
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Urban Dreams",
      style: "Cyberpunk",
      description: "Modern architecture with futuristic elements",
      position: "center" // Person positioned in the center
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Nature's Harmony",
      style: "Pastoral",
      description: "Peaceful countryside merged with wildlife",
      position: "right" // Person positioned on the right side
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Celestial Journey",
      style: "Cosmic",
      description: "Space-themed composite with ethereal elements",
      position: "left" // Person positioned on the left side
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Oceanic Encounter",
      style: "Aquatic",
      description: "Deep sea imagery fused with portrait photography",
      position: "right" // Person positioned on the right side
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Guardian",
      style: "Fantasy",
      description: "Character integration with majestic mountain landscape",
      position: "left" // Person positioned on the left side
    }
  ];

  const handleDownloadDemo = (image) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    // Set the href to the image URL
    link.href = image.url;
    // Set the download attribute with a filename
    link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    // Append to the document
    document.body.appendChild(link);
    // Trigger the download
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Inspiration Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore these amazing artworks created with Imaginary Art Fusion. 
          Each piece represents a unique blend of styles and imagery, with subjects 
          integrated at different positions within the scene.
        </p>
      </div>

      {/* Featured Carousel */}
      <div className="mb-16">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryImages.slice(0, 5).map((image) => (
              <CarouselItem key={image.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-2xl font-semibold">{image.title}</h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white border border-white/30 hover:bg-white/20"
                            onClick={() => handleDownloadDemo(image)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <p className="text-sm opacity-90 mb-2">{image.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                            Style: {image.style}
                          </span>
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                            Subject: {image.position} aligned
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.slice(5).map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{image.title}</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white border border-white/30 hover:bg-white/20"
                  onClick={() => handleDownloadDemo(image)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <p className="text-sm opacity-90 mb-2">{image.description}</p>
              <div className="flex justify-between items-center">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                  Style: {image.style}
                </span>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                  Subject: {image.position} aligned
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link to="/gallery">
          <Button 
            variant="outline" 
            size="lg"
            className="hover:bg-purple-500 hover:text-white transition-colors gap-2"
          >
            <GalleryHorizontal className="h-5 w-5" />
            View Full Gallery
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
