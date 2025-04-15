
import { ImagePlus, Palette, History, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <ImagePlus className="h-10 w-10 text-purple-600" />,
      title: "Image Fusion",
      description: "Upload a background and a person to be seamlessly integrated for creative compositions."
    },
    {
      icon: <Palette className="h-10 w-10 text-purple-600" />,
      title: "Style Customization",
      description: "Choose from surreal, realistic, cartoon and many other artistic styles for your creation."
    },
    {
      icon: <History className="h-10 w-10 text-purple-600" />,
      title: "Version Control",
      description: "Save and compare different versions of your artwork to find the perfect result."
    },
    {
      icon: <Download className="h-10 w-10 text-purple-600" />,
      title: "Easy Export",
      description: "Download your creations in high-quality formats or share directly to social media."
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform combines cutting-edge AI with intuitive design to make creative image fusion accessible to everyone.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
