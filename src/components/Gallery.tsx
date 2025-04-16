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

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Dreamer",
      style: "Surreal",
      description: "A fusion of mountain landscapes with surreal elements"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Desert Portal",
      style: "Fantasy",
      description: "Desert dunes merged with fantasy architecture"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Enchanted Waters",
      style: "Watercolor",
      description: "Watercolor effect on merged landscape photography"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Sacred Fusion",
      style: "Gothic",
      description: "Architecture merged with mystical elements"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Urban Dreams",
      style: "Cyberpunk",
      description: "Modern architecture with futuristic elements"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Nature's Harmony",
      style: "Pastoral",
      description: "Peaceful countryside merged with wildlife"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Inspiration Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore some of the amazing artworks created with Imaginary Art Fusion by our community. 
          Each piece represents a unique blend of styles and imagery.
        </p>
      </div>

      {/* Featured Carousel */}
      <div className="mb-16">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryImages.slice(0, 3).map((image) => (
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
                        <h3 className="text-2xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{image.description}</p>
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                          Style: {image.style}
                        </span>
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
        {galleryImages.slice(3).map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-sm opacity-90 mb-2">{image.description}</p>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                Style: {image.style}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link to="/gallery">
          <Button 
            variant="outline" 
            size="lg"
            className="hover:bg-purple-500 hover:text-white transition-colors"
          >
            View Full Gallery
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
