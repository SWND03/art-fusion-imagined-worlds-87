
import { ArrowRight, Upload, Palette, Sparkles, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-white" />,
      title: "Upload Images",
      description: "Upload your background image and the person you want to add to the scene."
    },
    {
      icon: <Palette className="h-8 w-8 text-white" />,
      title: "Customize Style",
      description: "Choose an artistic style and add textual instructions for placement and effects."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-white" />,
      title: "AI Generation",
      description: "Our AI analyzes your images and creates a seamless artistic composition."
    },
    {
      icon: <Download className="h-8 w-8 text-white" />,
      title: "Download & Share",
      description: "Save your creation in high quality or share it directly to social media."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Creating stunning AI-generated artwork is simple with our intuitive four-step process.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="opacity-90">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute transform translate-x-16">
                  <ArrowRight className="h-8 w-8 mt-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
