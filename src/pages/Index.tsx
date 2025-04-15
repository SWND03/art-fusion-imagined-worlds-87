
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, ImagePlus, Download, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Imaginary Art Fusion
          </span>
        </div>
        <div className="flex gap-4">
          <Link to="/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
              Create Art
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
