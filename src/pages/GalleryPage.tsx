
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { base64ToBlob } from "@/utils/imageProcessing";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  style: string;
  image_url: string;
  downloads: number;
}

const GalleryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    fetchGalleryImages();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load gallery images");
      return;
    }

    setImages(data);
  };

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${image.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Update download count
      await supabase
        .from("gallery_images")
        .update({ downloads: image.downloads + 1 })
        .eq("id", image.id);

      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Inspiration Gallery</h1>
          <Button onClick={() => navigate("/create")}>Create New</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src={image.image_url} 
                alt={image.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{image.title}</h3>
                <p className="text-sm text-white/90 mb-2">{image.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Style: {image.style}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(image)}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
