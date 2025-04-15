
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Dreamer",
      style: "Surreal"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1655720035710-6b4acf01259a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Urban Adventure",
      style: "Cyberpunk"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1655720032094-b357a0d1ac73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Fantasy Forest",
      style: "Watercolor"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1674318012388-141651b08a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Ocean Journey",
      style: "Digital Paint"
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Inspiration Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore some of the amazing artworks created with Imaginary Art Fusion by our community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryImages.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src={image.url} 
              alt={image.title} 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold">{image.title}</h3>
              <p className="text-sm opacity-80">Style: {image.style}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          View More Examples
        </Button>
      </div>
    </section>
  );
};

export default Gallery;
