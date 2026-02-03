
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add CSS to protect images
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  img {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    pointer-events: auto !important;
    -webkit-user-drag: none !important;
    -webkit-touch-callout: none !important;
    -webkit-user-modify: read-only !important;
  }

  /* Prevent text selection on image containers */
  img, picture, figure {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
  }

  /* Disable drag and drop for images */
  img::selection {
    background: transparent !important;
  }
`;
document.head.appendChild(styleSheet);

// Prevent image download and copying with JavaScript
document.addEventListener('contextmenu', (event) => {
  if ((event.target as HTMLElement).tagName === 'IMG' || 
      (event.target as HTMLElement).closest('img')) {
    event.preventDefault();
  }
}, true);

document.addEventListener('dragstart', (event) => {
  if ((event.target as HTMLElement).tagName === 'IMG') {
    event.preventDefault();
  }
}, true);

document.addEventListener('drag', (event) => {
  if ((event.target as HTMLElement).tagName === 'IMG') {
    event.preventDefault();
  }
}, true);

document.addEventListener('copy', (event) => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const container = document.createElement('div');
    container.appendChild(range.cloneContents());
    
    // Check if images are selected
    if (container.querySelector('img')) {
      event.preventDefault();
    }
  }
}, true);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
