const GRID_SIZE = 16;
const PALETTE = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00',
  '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000', '#000080',
  '#800000', '#008080', '#808000', '#C0C0C0'
];

let currentColor = PALETTE[2]; // Default to red
let isDrawing = false;

function createPixelGrid() {
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';
  
  const pixelGrid = document.createElement('div');
  pixelGrid.className = 'pixel-grid';
  
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.dataset.index = i;
    
    pixel.addEventListener('mousedown', startDrawing);
    pixel.addEventListener('mouseenter', drawPixel);
    pixel.addEventListener('mouseup', stopDrawing);
    
    pixelGrid.appendChild(pixel);
  }
  
  gridContainer.appendChild(pixelGrid);
}

function createColorPalette() {
  const paletteContainer = document.getElementById('palette');
  paletteContainer.innerHTML = '';
  
  PALETTE.forEach((color, index) => {
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    colorOption.style.backgroundColor = color;
    colorOption.dataset.color = color;
    
    if (index === 2) colorOption.classList.add('selected'); // Red selected by default
    
    colorOption.addEventListener('click', () => {
      currentColor = color;
      document.querySelectorAll('.color-option').forEach(el => {
        el.classList.remove('selected');
      });
      colorOption.classList.add('selected');
    });
    
    paletteContainer.appendChild(colorOption);
  });
}

function startDrawing(event) {
  isDrawing = true;
  drawPixel(event);
}

function stopDrawing() {
  isDrawing = false;
}

function drawPixel(event) {
  if (!isDrawing) return;
  
  const pixel = event.target;
  pixel.style.backgroundColor = currentColor;
}

function clearGrid() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = '#000000';
  });
}

function generateRandomArt() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    pixel.style.backgroundColor = randomColor;
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  createPixelGrid();
  createColorPalette();
  
  document.getElementById('clearBtn').addEventListener('click', clearGrid);
  document.getElementById('randomBtn').addEventListener('click', generateRandomArt);
});