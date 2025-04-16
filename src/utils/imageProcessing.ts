// This file handles image processing and AI integration

export interface ProcessingOptions {
  style: string;
  integrationStrength: number;
  detailLevel: number;
  preserveLighting: boolean;
  addShadows: boolean;
  instructions: string;
}

// API key for Gemini
const API_KEY = "AIzaSyCNgU8vS4DASCiifNgeoINTKGcaW1jHl0E"; 

// Process images using the Gemini API
export const processImages = async (
  backgroundImage: string,
  personImage: string,
  options: ProcessingOptions
): Promise<string> => {
  console.log("Processing images with options:", options);
  
  try {
    // Create the API request payload
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Generate a new image merging these two images with the following instructions: 
              - Style: ${options.style}
              - Integration strength: ${options.integrationStrength}%
              - Detail level: ${options.detailLevel}%
              - Preserve original lighting: ${options.preserveLighting ? 'Yes' : 'No'}
              - Add realistic shadows: ${options.addShadows ? 'Yes' : 'No'}
              - Additional instructions: ${options.instructions}
              
              Place the person from the second image into the background scene from the first image according to these specifications.`
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: backgroundImage.split(',')[1]
              }
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: personImage.split(',')[1]
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    // Make the API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    // Check if there's an image in the response
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].inline_data) {
      
      // Extract the generated image data
      const generatedImageData = data.candidates[0].content.parts[0].inline_data.data;
      return `data:image/jpeg;base64,${generatedImageData}`;
    } else {
      console.warn("No image generated from API, using advanced fallback");
      return await createAdvancedComposite(backgroundImage, personImage, options);
    }
  } catch (error) {
    console.error("Error in image processing:", error);
    return await createAdvancedComposite(backgroundImage, personImage, options);
  }
};

// Advanced fallback function to create a composite of the two images
const createAdvancedComposite = async (
  backgroundImage: string, 
  personImage: string, 
  options: ProcessingOptions
): Promise<string> => {
  return new Promise((resolve) => {
    const bgImg = new Image();
    const personImg = new Image();
    
    bgImg.onload = () => {
      personImg.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(backgroundImage);
          return;
        }
        
        // Set canvas dimensions to background image size
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        
        // Draw background with adjustments based on style
        ctx.drawImage(bgImg, 0, 0);
        
        // Apply style effects to background
        if (options.style === 'surreal') {
          ctx.filter = 'saturate(150%) hue-rotate(30deg)';
        } else if (options.style === 'cartoon') {
          ctx.filter = 'contrast(150%) brightness(120%)';
        } else if (options.style === 'watercolor') {
          ctx.filter = 'blur(1px) brightness(105%)';
        } else if (options.style === 'cyberpunk') {
          ctx.filter = 'saturate(200%) contrast(130%) brightness(120%)';
        } else if (options.style === 'fantasy') {
          ctx.filter = 'sepia(50%) saturate(150%)';
        }
        
        // Calculate person image dimensions and position
        const scaleFactor = (options.integrationStrength / 100) * 0.8 + 0.2; // Scale between 20% and 100%
        const personWidth = personImg.width * scaleFactor;
        const personHeight = personImg.height * scaleFactor;
        
        // Position the person based on detail level (affects positioning randomness)
        const randomOffset = (options.detailLevel / 100) * 100; // Max 100px random offset
        const xPos = canvas.width / 2 - personWidth / 2 + (Math.random() - 0.5) * randomOffset;
        const yPos = (canvas.height - personHeight) / 2 + (Math.random() - 0.5) * randomOffset;
        
        // Reset filter for person image
        ctx.filter = 'none';
        
        // Draw person with shadow if enabled
        if (options.addShadows) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 10;
        }
        
        // Draw person image with lighting preservation if enabled
        if (options.preserveLighting) {
          ctx.globalCompositeOperation = 'multiply';
        }
        
        ctx.drawImage(personImg, xPos, yPos, personWidth, personHeight);
        
        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
        
        // Add custom effects based on instructions
        if (options.instructions.toLowerCase().includes('dramatic')) {
          ctx.filter = 'contrast(120%) brightness(90%)';
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Return the composite image
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      personImg.src = personImage;
    };
    bgImg.src = backgroundImage;
  });
};

// Simple fallback function to create a composite of the two images
const createFallbackComposite = async (backgroundImage: string, personImage: string): Promise<string> => {
  return new Promise((resolve) => {
    const bgImg = new Image();
    const personImg = new Image();
    
    bgImg.onload = () => {
      personImg.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(backgroundImage);
          return;
        }
        
        // Set canvas dimensions to background image size
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        
        // Draw background
        ctx.drawImage(bgImg, 0, 0);
        
        // Draw person image (scaled to 50% and positioned at center-right)
        const scaleFactor = 0.5;
        const personWidth = personImg.width * scaleFactor;
        const personHeight = personImg.height * scaleFactor;
        
        ctx.drawImage(
          personImg, 
          canvas.width - personWidth - 50, // Right position with 50px margin
          (canvas.height - personHeight) / 2, // Vertically centered
          personWidth,
          personHeight
        );
        
        // Return the composite image
        resolve(canvas.toDataURL('image/jpeg'));
      };
      personImg.src = personImage;
    };
    bgImg.src = backgroundImage;
  });
};

// Utility function to convert base64 to blob for download
export const base64ToBlob = (base64: string): Blob => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};
