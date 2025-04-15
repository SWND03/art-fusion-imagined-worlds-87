
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Imaginary Art Fusion
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Imaginary Art Fusion. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
