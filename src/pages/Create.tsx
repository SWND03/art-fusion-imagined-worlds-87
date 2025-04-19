import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Upload, 
  ImagePlus, 
  Download, 
  ArrowLeft, 
  Sparkles,
  Wand2,
  Redo,
  Save,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { processImages, ProcessingOptions, base64ToBlob } from "@/utils/imageProcessing";
import { useSavedImages } from "@/hooks/useSavedImages";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const Create = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [instructions, setInstructions] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [integrationStrength, setIntegrationStrength] = useState(70);
  const [detailLevel, setDetailLevel] = useState(80);
  const [generationProgress, setGenerationProgress] = useState(0);
  const { saveImage } = useSavedImages();

  const styles = [
    { id: "realistic", name: "Realistic" },
    { id: "surreal", name: "Surreal" },
    { id: "cartoon", name: "Cartoon" },
    { id: "watercolor", name: "Watercolor" },
    { id: "cyberpunk", name: "Cyberpunk" },
    { id: "fantasy", name: "Fantasy" },
  ];

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setBackgroundImage(e.target.result as string);
          toast.success("Background image uploaded successfully!");
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePersonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setPersonImage(e.target.result as string);
          toast.success("Person image uploaded successfully!");
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!backgroundImage || !personImage) {
      toast.error("Please upload both a background image and a person image");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    toast.info("Generating your fusion artwork...", { duration: 2000 });
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // Set up processing options
      const options: ProcessingOptions = {
        style: selectedStyle,
        integrationStrength,
        detailLevel,
        instructions
      };
      
      // Call the function to process images
      const result = await processImages(backgroundImage, personImage, options);
      setResultImage(result);
      setGenerationProgress(100);
      
      toast.success("Your fusion artwork has been created!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (backgroundImage && personImage) {
      handleGenerate();
    }
  };

  const handleSave = async () => {
    if (resultImage) {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .insert([
            {
              title: `Fusion Art ${new Date().toLocaleDateString()}`,
              description: instructions || 'Custom fusion artwork',
              style: selectedStyle,
              image_url: resultImage,
              downloads: 0
            }
          ])
          .select()
          .single();

        if (error) throw error;
        
        toast.success('Image saved to your gallery!');
        saveImage(resultImage); // Save to local storage as well
      } catch (error) {
        console.error('Error saving image:', error);
        toast.error('Failed to save image to gallery');
      }
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    const blob = base64ToBlob(resultImage);
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `imaginary-art-fusion-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Imaginary Art Fusion
            </span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Fusion Artwork</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Upload & Style</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Existing Image</p>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  backgroundImage ? 'border-green-300' : 'border-gray-300 hover:border-purple-300'
                } transition-colors cursor-pointer`}
                onClick={() => document.getElementById('background-upload')?.click()}
              >
                {backgroundImage ? (
                  <div className="relative">
                    <img 
                      src={backgroundImage} 
                      alt="Existing" 
                      className="mx-auto max-h-40 rounded"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                      <p className="text-white text-sm">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Click to upload an existing image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  id="background-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Person Image</p>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  personImage ? 'border-green-300' : 'border-gray-300 hover:border-purple-300'
                } transition-colors cursor-pointer`}
                onClick={() => document.getElementById('person-upload')?.click()}
              >
                {personImage ? (
                  <div className="relative">
                    <img 
                      src={personImage} 
                      alt="Person" 
                      className="mx-auto max-h-40 rounded"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                      <p className="text-white text-sm">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <ImagePlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Click to upload a person image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  id="person-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePersonUpload}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Position Instructions</p>
                <div className="tooltip" data-tip="Try 'place on the left', 'right side', or 'center'">
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                rows={2}
                placeholder="E.g., Place the person on the left side..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              {styles.map((style) => (
                <div 
                  key={style.id}
                  className={`border p-2 rounded-lg cursor-pointer transition-all ${
                    selectedStyle === style.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <p className={`font-medium text-sm text-center ${selectedStyle === style.id ? 'text-purple-600' : 'text-gray-700'}`}>
                    {style.name}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-600">Blend Strength</p>
                  <p className="text-sm text-gray-600">{integrationStrength}%</p>
                </div>
                <Slider 
                  value={[integrationStrength]} 
                  onValueChange={(values) => setIntegrationStrength(values[0])} 
                  max={100} 
                  step={1} 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-gray-600">Detail Level</p>
                  <p className="text-sm text-gray-600">{detailLevel}%</p>
                </div>
                <Slider 
                  value={[detailLevel]} 
                  onValueChange={(values) => setDetailLevel(values[0])} 
                  max={100} 
                  step={1} 
                />
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              onClick={handleGenerate}
              disabled={isGenerating || !backgroundImage || !personImage}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Fusion
                </>
              )}
            </Button>
            
            {isGenerating && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Processing...</span>
                  <span>{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Result</h2>
            
            <div className="mb-6 border rounded-lg overflow-hidden h-96 flex items-center justify-center bg-gray-100">
              {resultImage ? (
                <img 
                  src={resultImage} 
                  alt="Generated Fusion" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center p-6">
                  <Sparkles className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Your generated image will appear here</p>
                </div>
              )}
            </div>
            
            {resultImage && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleRegenerate}>
                  <Redo className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button className="flex-1" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
