const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const hideContainerEl = document.getElementById('first-card-section');
const state = {
  mousedown: false
};
canvasContext.globalAlpha = 0.5;
const lineWidth = 1;
const halfLineWidth = lineWidth / 2;
const strokeStyle = 'black';
const shadowColor = '#02040F';
const shadowBlur = lineWidth / 4;


canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

clearButton.addEventListener('click', handleClearButtonClick);

function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);

  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;

  // Set the opacity (50% opacity in this example)
  canvasContext.globalAlpha = 0.5;

  state.mousedown = true;
}


function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMosuePositionOnCanvas(event);

    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    canvasContext.shadowColor = shadowColor;
    canvasContext.shadowBlur = shadowBlur;

    canvasContext.stroke();
  }
  
  state.mousedown = false;
}

function clearDrawing() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}
function getMosuePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const canvasX = clientX - offsetLeft;
  const canvasY = clientY - offsetTop;

  return { x: canvasX, y: canvasY };
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

const tabElements = document.querySelectorAll('.option_paper');
tabElements.forEach(tab => {
  tab.addEventListener('click', () => {
    const selectedOption = tab.getAttribute('data-option');
    startPractice(selectedOption);
    tabElements.forEach(element => element.classList.remove('active'));
    tab.classList.add('active');
  });
});

function startPractice(selectedOption) {
  const canvas = document.getElementById("drawing-area");
  const ctx = canvas.getContext("2d");

  let content = "";
  if (selectedOption === "uppercase") {
    
    content = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else if (selectedOption === "lowercase") {
    content = "abcdefghijklmnopqrstuvwxyz";
  } else if (selectedOption === "numbers") {
    content = "0123456789";
  } else if (selectedOption === "special") {
    content = "!@#$%^&*(){}[]:;?/<>";
  }else if (selectedOption === "image") {
    const img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = "./images/sample.png";
}

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px "classic notes", cursive';
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const numPerRow = 6;
  const charWidth = canvas.width / numPerRow;
  const charHeight = canvas.height / Math.ceil(content.length / numPerRow);

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const col = i % numPerRow;
    const row = Math.floor(i / numPerRow);
    const x = col * charWidth + charWidth / 2;
    const y = row * charHeight + charHeight / 2;
    ctx.fillText(char, x, y);
  }
}
startPractice("uppercase");

const ctx = canvas.getContext("2d");

let content = ""; // Variable to hold the content

tabElements.forEach(tab => {
    tab.addEventListener('click', () => {
        const selectedOption = tab.getAttribute('data-option');
        if (selectedOption === "upload") {
            // If "upload" is selected, trigger the file input
            document.getElementById("imageInput").click();
        } else {
            startPractice(selectedOption);
            tabElements.forEach(element => element.classList.remove('active'));
            tab.classList.add('active');
        }
    });
});

// Add an event listener to the file input element
const imageInput = document.getElementById("imageInput");
imageInput.addEventListener('change', () => {
    const selectedImage = imageInput.files[0];

    if (selectedImage) {
        const image = new Image();
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        image.src = URL.createObjectURL(selectedImage);
    }
});

const showWritingButton = document.getElementById('hide-canvas');
const drawingArea = document.getElementById('drawing-area');
var imgElement = document.createElement("img");
var imgElements = document.createElement("img");


let alphabetsVisible = true;

const overlayCanvas = document.getElementById('overlay-canvas');
const overlayCanvasContext = overlayCanvas.getContext('2d');

function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);

  overlayCanvasContext.beginPath();
  overlayCanvasContext.moveTo(mousePos.x, mousePos.y);
  overlayCanvasContext.lineWidth = lineWidth;
  overlayCanvasContext.strokeStyle = strokeStyle;
  overlayCanvasContext.shadowColor = null;
  overlayCanvasContext.shadowBlur = null;
  overlayCanvasContext.fill();
  
  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMosuePositionOnCanvas(event);

    overlayCanvasContext.lineTo(mousePos.x, mousePos.y);
    overlayCanvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    overlayCanvasContext.shadowColor = shadowColor;
    overlayCanvasContext.shadowBlur = shadowBlur;

    overlayCanvasContext.stroke();
  }
  
  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();
  clearDrawing();
  clearOverlayDrawing();
  startPractice("uppercase");
}

function clearOverlayDrawing() {
  overlayCanvasContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
}














document.body.addEventListener('click', function(event) {
  const target = event.target;

  if (target.id === 'clear-button') {
    handleClearButtonClick(event);
  }

  if (target.id === 'new-eye-icon-button') {
    handleNewEyeIconButtonClick(event);
  }
});


var isDragging = false;
var offset = { x: 0, y: 0 };

var draggableContainer = document.getElementById("draggable-container");

draggableContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  offset.x = e.clientX - draggableContainer.getBoundingClientRect().left;
  offset.y = e.clientY - draggableContainer.getBoundingClientRect().top;
});

draggableContainer.addEventListener("mousemove", (e) => {
  if (isDragging) {
    draggableContainer.style.left = e.clientX - offset.x + "px";
    draggableContainer.style.top = e.clientY - offset.y + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

draggableContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  offset.x = e.touches[0].clientX - draggableContainer.getBoundingClientRect().left;
  offset.y = e.touches[0].clientY - draggableContainer.getBoundingClientRect().top;
});

draggableContainer.addEventListener("touchmove", (e) => {
  if (isDragging) {
    e.preventDefault();
    draggableContainer.style.left = e.touches[0].clientX - offset.x + "px";
    draggableContainer.style.top = e.touches[0].clientY - offset.y + "px";
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

showWritingButton.addEventListener('click', function () {
  if (alphabetsVisible) {
    drawingArea.style.visibility = 'hidden';
    imgElement.src = "./images/view.png";

var existingImg = showWritingButton.querySelector("img");
if (existingImg) {
    showWritingButton.removeChild(existingImg);
}

showWritingButton.appendChild(imgElement);
imgElement.style.width = "25px";
  } else {
    drawingArea.style.visibility = 'visible';
    imgElement.src = "./images/hide.png";

    var existingImg = showWritingButton.querySelector("img");
    if (existingImg) {
        showWritingButton.removeChild(existingImg);
    }
    
    showWritingButton.appendChild(imgElement);
  }
  alphabetsVisible = !alphabetsVisible;

});

// grid starts

const cardGrid = document.querySelector('.card-grid');
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options');

cardGrid.addEventListener('click', function (event) {
    if (event.target.classList.contains('card')) {
        // container.classList.remove('hidden');
        cardGrid.style.display = 'none';

    }
});

const cardElements = document.querySelectorAll('.card');
cardElements.forEach(card => {
    card.addEventListener('click', () => {
        const selectedOption = card.getAttribute('data-option');
        displaySelectedCard(selectedOption);
    });
});

function displaySelectedCard(selectedOption) {
    const canvas = document.getElementById('drawing-area');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedOption === "uppercase") {
        ctx.font = '30px "classic notes", cursive';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", canvas.width / 2, canvas.height / 2);
    } else if (selectedOption === "lowercase") {
        ctx.font = '30px "classic notes", cursive';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("abcdefghijklmnopqrstuvwxyz", canvas.width / 2, canvas.height / 2);
    } else if (selectedOption === "numbers") {
        ctx.font = '30px "classic notes", cursive';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("0123456789", canvas.width / 2, canvas.height / 2);
    } else if (selectedOption === "special") {
        ctx.font = '30px "classic notes", cursive';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("!@#$%^&*(){}[]:;?/<>", canvas.width / 2, canvas.height / 2);
    } else if (selectedOption === "image") {
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = "./images/sample.png";
    }
}

// grid ends

document.getElementById('uppercase-card').addEventListener('click', displayUppercaseCards);

function displayUppercaseCards() {
  const secondCardGrid = document.querySelector('.second-card-grid');
  const container = document.querySelector('#first-card-section');
  const cardGrid = document.querySelector('.card-grid');
  const canvas = document.getElementById('drawing-area');
  const ctx = canvas.getContext('2d');

  // Clear the second card grid content in case it's not empty
  secondCardGrid.innerHTML = '';

  for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = letter;
      card.addEventListener('click', function() {
          // Remove the "hidden" class from the container
          container.classList.remove('hidden');
          // Hide the cardGrid and second card grid
          cardGrid.style.display = 'none';
          secondCardGrid.style.display = 'none';

          const lettersPerRow = 7;
          const letterSize = 28; // Font size
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          const columnSpacing = canvasWidth / lettersPerRow;
          const rowSpacing = canvasHeight / Math.ceil(20 / lettersPerRow);

          for (let j = 0; j < 20; j++) {
              const row = Math.floor(j / lettersPerRow);
              const col = j % lettersPerRow;

              const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
              const y = row * rowSpacing + (rowSpacing - letterSize) / 2;

              ctx.font = `${letterSize}px Arial`;
              ctx.fillText(letter, x, y);
          }
      });
      secondCardGrid.appendChild(card);
  }
  
}


document.getElementById('numbers-card').addEventListener('click', displayNumbersCard);
function displayNumbersCard() {
  const secondCardGrid = document.querySelector('.second-card-grid');
  const container = document.querySelector('#first-card-section');
  const cardGrid = document.querySelector('.card-grid');
  const canvas = document.getElementById('drawing-area');
  const ctx = canvas.getContext('2d');

  // Clear the second card grid content in case it's not empty
  secondCardGrid.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
      const letter = i;
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = letter;
      card.addEventListener('click', function() {
          // Remove the "hidden" class from the container
          container.classList.remove('hidden');
          // Hide the cardGrid and second card grid
          cardGrid.style.display = 'none';
          secondCardGrid.style.display = 'none';

          const lettersPerRow = 7;
          const letterSize = 28; // Font size
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          const columnSpacing = canvasWidth / lettersPerRow;
          const rowSpacing = canvasHeight / Math.ceil(11 / lettersPerRow);

          for (let j = 0; j < 20; j++) {
              const row = Math.floor(j / lettersPerRow);
              const col = j % lettersPerRow;

              const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
              const y = row * rowSpacing + (rowSpacing - letterSize) / 2;

              ctx.font = `${letterSize}px Arial`;
              ctx.fillText(letter, x, y);
          }
      });
      secondCardGrid.appendChild(card);
  }
  
}



document.getElementById('lowercase-card').addEventListener('click', displayLowercaseCards);

function displayLowercaseCards() {
  const secondCardGrid = document.querySelector('.second-card-grid');
  const container = document.querySelector('#first-card-section');
  const cardGrid = document.querySelector('.card-grid');
  const canvas = document.getElementById('drawing-area');
  const ctx = canvas.getContext('2d');

  // Clear the second card grid content in case it's not empty
  secondCardGrid.innerHTML = '';

  for (let i = 97; i <= 122; i++) {
      const letter = String.fromCharCode(i);
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = letter;
      card.addEventListener('click', function() {
          // Remove the "hidden" class from the container
          container.classList.remove('hidden');
          // Hide the cardGrid and second card grid
          cardGrid.style.display = 'none';
          secondCardGrid.style.display = 'none';

          const lettersPerRow = 7;
          const letterSize = 28; // Font size
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          const columnSpacing = canvasWidth / lettersPerRow;
          const rowSpacing = canvasHeight / Math.ceil(20 / lettersPerRow);

          for (let j = 0; j < 20; j++) {
              const row = Math.floor(j / lettersPerRow);
              const col = j % lettersPerRow;

              const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
              const y = row * rowSpacing + (rowSpacing - letterSize) / 2;

              ctx.font = `${letterSize}px Arial`;
              ctx.fillText(letter, x, y);
          }
      });
      secondCardGrid.appendChild(card);
  }
  
}
