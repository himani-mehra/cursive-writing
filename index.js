const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const state = {
  mousedown: false
};

const lineWidth = 1;
const halfLineWidth = lineWidth / 2;
const strokeStyle = '#333';
const shadowColor = '#333';
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

  canvasContext.fill();
  
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
    // Display the "sample" image directly on the canvas
    const img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = "./images/sample.png"; // Update the path to the actual image file
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
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the image on the canvas
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        // Load the selected image
        image.src = URL.createObjectURL(selectedImage);
    }
});



// const cursiveSelect = document.getElementById('cursive-input');
// cursiveSelect.addEventListener('change', startPractice);


// function startPractice() {
//   const cursiveInput = document.getElementById("cursive-input").value;

//   const canvas = document.getElementById("drawing-area");
//   const ctx = canvas.getContext("2d");

//   let content = "";
//   if (cursiveInput === "uppercase") {
//     content = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   } else if (cursiveInput === "lowercase") {
//     content = "abcdefghijklmnopqrstuvwxyz";
//   } else if (cursiveInput === "numbers") {
//     content = "0123456789";
//   } else if (cursiveInput === "special") {
//     content = "!@#$%^&*(){}[]:;?/<>";
//   }

//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.font = '30px "classic notes", cursive';
//   ctx.textBaseline = "middle";
//   ctx.textAlign = "center";

//   const numPerRow = 6;
//   const charWidth = canvas.width / numPerRow;
//   const charHeight = canvas.height / Math.ceil(content.length / numPerRow);

//   for (let i = 0; i < content.length; i++) {
//     const char = content[i];
//     const col = i % numPerRow;
//     const row = Math.floor(i / numPerRow);
//     const x = col * charWidth + charWidth / 2;
//     const y = row * charHeight + charHeight / 2;
//     ctx.fillText(char, x, y);
//   }
// }


// startPractice();


const showWritingButton = document.getElementById('hide-canvas');
const drawingArea = document.getElementById('drawing-area');
var imgElement = document.createElement("img");
var imgElements = document.createElement("img");


let alphabetsVisible = true;

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















const animationContainer = document.getElementById("animation-container");
const message = "Practice Digital Handwriting!";
let index = 0;

function displayMessage() {
    if (index <= message.length) {
        animationContainer.textContent = message.substring(0, index);
        index++;
        setTimeout(displayMessage, 100);
    }
}

window.onload = displayMessage;


document.body.addEventListener('click', function(event) {
  const target = event.target;

  // Handle clear button click
  if (target.id === 'clear-button') {
    handleClearButtonClick(event);
  }

  // Handle new "eye icon" button click with a unique ID
  if (target.id === 'new-eye-icon-button') {
    handleNewEyeIconButtonClick(event);
  }
});

// function handleNewEyeIconButtonClick(event) {
//   if (alphabetsVisible) {
//     drawingArea.style.visibility = 'hidden';
//     newEyeIconButton.textContent = 'Show Alphabets';
//   } else {
//     drawingArea.style.visibility = 'visible';
//     newEyeIconButton.textContent = 'Hide Alphabets';
//     startPractice("uppercase");
//   }
//   alphabetsVisible = !alphabetsVisible;
// }


// drag widget start

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
    e.preventDefault(); // Prevent default touchmove behavior
    draggableContainer.style.left = e.touches[0].clientX - offset.x + "px";
    draggableContainer.style.top = e.touches[0].clientY - offset.y + "px";
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});












