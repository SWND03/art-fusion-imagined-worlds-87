
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Transform Images with 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"> AI Magic</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Blend your photos into imaginative artworks with our AI-powered platform. 
          Upload images, customize styles, and watch as AI creates stunning, personalized art.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/create">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            View Gallery
          </Button>
        </div>
      </div>
      <div className="mt-16 max-w-5xl">
        <div className="relative">
          <div className="absolute -top-10 -left-10 bg-purple-300 opacity-30 rounded-full w-40 h-40 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 bg-pink-300 opacity-30 rounded-full w-40 h-40 blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&h=1000&q=80" 
            alt="AI Generated Art Example" 
            className="rounded-xl shadow-2xl relative z-10 border-8 border-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
