
// This file handles image processing and AI integration

export interface ProcessingOptions {
  style: string;
  integrationStrength: number;
  detailLevel: number;
  preserveLighting: boolean;
  addShadows: boolean;
  instructions: string;
}

// Process images using advanced compositing techniques
export const processImages = async (
  backgroundImage: string,
  personImage: string,
  options: ProcessingOptions
): Promise<string> => {
  console.log("Processing images with options:", options);
  
  // Add a small delay to simulate processing time while being responsive
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    return await createAdvancedComposite(backgroundImage, personImage, options);
  } catch (error) {
    console.error("Error in image processing:", error);
    return await createFallbackComposite(backgroundImage, personImage);
  }
};

// Advanced composite function with style effects
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
        
        // Draw background
        ctx.drawImage(bgImg, 0, 0);
        
        // Apply style effects to background based on selected style
        applyStyleEffects(ctx, options.style, canvas.width, canvas.height);
        
        // Calculate person image dimensions and position
        const { xPos, yPos, personWidth, personHeight } = calculatePersonPosition(
          personImg, 
          canvas.width, 
          canvas.height, 
          options
        );
        
        // Reset composite operation for person
        ctx.globalCompositeOperation = 'source-over';
        ctx.filter = 'none';
        
        // Add shadows if enabled
        if (options.addShadows) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 25;
          ctx.shadowOffsetX = 15;
          ctx.shadowOffsetY = 15;
        }
        
        // Apply lighting preservation
        if (options.preserveLighting) {
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.85;
        }
        
        // Draw the person image
        ctx.drawImage(personImg, xPos, yPos, personWidth, personHeight);
        
        // Reset all effects
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.shadowColor = 'transparent';
        
        // Add final adjustments based on style
        applyFinalAdjustments(ctx, options.style, canvas.width, canvas.height);
        
        // Return the final composite
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      personImg.src = personImage;
    };
    bgImg.src = backgroundImage;
  });
};

// Helper function to apply style effects
const applyStyleEffects = (
  ctx: CanvasRenderingContext2D,
  style: string,
  width: number,
  height: number
): void => {
  switch (style) {
    case 'surreal':
      ctx.filter = 'saturate(150%) hue-rotate(30deg) brightness(110%)';
      ctx.globalCompositeOperation = 'hard-light';
      break;
    case 'cartoon':
      ctx.filter = 'contrast(150%) brightness(120%) saturate(130%)';
      ctx.globalCompositeOperation = 'color-dodge';
      break;
    case 'watercolor':
      ctx.filter = 'blur(1px) brightness(105%) saturate(85%)';
      ctx.globalCompositeOperation = 'multiply';
      break;
    case 'cyberpunk':
      ctx.filter = 'saturate(200%) contrast(130%) brightness(120%) hue-rotate(45deg)';
      ctx.globalCompositeOperation = 'screen';
      break;
    case 'fantasy':
      ctx.filter = 'sepia(50%) saturate(150%) brightness(110%)';
      ctx.globalCompositeOperation = 'overlay';
      break;
    default: // realistic
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
  }
};

// Helper function to calculate person position
const calculatePersonPosition = (
  personImg: HTMLImageElement,
  canvasWidth: number, 
  canvasHeight: number,
  options: ProcessingOptions
): { xPos: number, yPos: number, personWidth: number, personHeight: number } => {
  const scaleFactor = (options.integrationStrength / 100) * 0.8 + 0.2;
  const personWidth = personImg.width * scaleFactor;
  const personHeight = personImg.height * scaleFactor;
  
  // Check for position instructions
  const leftMatch = options.instructions.match(/left|left side|to the left/i);
  const rightMatch = options.instructions.match(/right|right side|to the right/i);
  const centerMatch = options.instructions.match(/center|middle|center position/i);
  
  let xPos;
  
  if (leftMatch) {
    // Position on the left side
    xPos = canvasWidth * 0.2 - personWidth / 2;
  } else if (rightMatch) {
    // Position on the right side
    xPos = canvasWidth * 0.8 - personWidth / 2;
  } else if (centerMatch) {
    // Position in the center
    xPos = canvasWidth / 2 - personWidth / 2;
  } else {
    // Default position with randomness based on detail level
    const randomOffset = (options.detailLevel / 100) * 100;
    xPos = canvasWidth / 2 - personWidth / 2 + (Math.random() - 0.5) * randomOffset;
  }
  
  // Calculate y position (vertical position)
  const yPos = (canvasHeight - personHeight) * 0.6;
  
  return { xPos, yPos, personWidth, personHeight };
};

// Helper function to apply final adjustments
const applyFinalAdjustments = (
  ctx: CanvasRenderingContext2D,
  style: string,
  width: number,
  height: number
): void => {
  ctx.filter = 'none';
  switch (style) {
    case 'surreal':
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = 'rgba(255, 100, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);
      break;
    case 'cyberpunk':
      ctx.globalAlpha = 0.9;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 0, 255, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'fantasy':
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = 'rgba(255, 220, 150, 0.15)';
      ctx.fillRect(0, 0, width, height);
      break;
  }
  ctx.globalAlpha = 1;
};

// Simple fallback function
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

// Utility function for download functionality
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
