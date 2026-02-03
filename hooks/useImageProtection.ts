import { useEffect } from 'react';

export const useImageProtection = () => {
  useEffect(() => {
    // Find all images and add protection attributes
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
      img.style.WebkitUserSelect = 'none';
      img.style.WebkitUserDrag = 'none';
      img.style.WebkitTouchCallout = 'none';
      
      // Prevent context menu
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      
      // Prevent drag
      img.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
      
      // Prevent selection
      img.addEventListener('selectstart', (e) => {
        e.preventDefault();
      });
    });

    // Observer untuk images yang ditambahkan secara dinamis
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node as HTMLElement;
              
              // Cek jika node adalah img
              if (element.tagName === 'IMG') {
                protectImage(element as HTMLImageElement);
              }
              
              // Cek jika ada img di dalam node
              const childImages = element.querySelectorAll('img');
              childImages.forEach((img) => {
                protectImage(img as HTMLImageElement);
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};

const protectImage = (img: HTMLImageElement) => {
  img.setAttribute('draggable', 'false');
  img.style.userSelect = 'none';
  img.style.WebkitUserSelect = 'none';
  img.style.WebkitUserDrag = 'none';
  img.style.WebkitTouchCallout = 'none';
  
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  img.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
  
  img.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });
};
