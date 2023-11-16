let canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const hideContainerEl = document.getElementById('first-card-section');
const subheadingEl = document.getElementById('subheadingEl');
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
  setStrokeStyleToDefault();
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;
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
  } else if (selectedOption === "image") {
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
let content = "";
tabElements.forEach(tab => {
  tab.addEventListener('click', () => {
    const selectedOption = tab.getAttribute('data-option');
    if (selectedOption === "upload") {
      document.getElementById("imageInput").click();
    } else {
      startPractice(selectedOption);
      tabElements.forEach(element => element.classList.remove('active'));
      tab.classList.add('active');
    }
  });
});

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





















document.body.addEventListener('click', function (event) {
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

const cardGrid = document.querySelector('.card-grid');
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options');
cardGrid.addEventListener('click', function (event) {
  if (event.target.classList.contains('card')) {
    cardGrid.style.display = 'none';
    subheadingEl.style.display = 'none';
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
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (selectedOption === "uppercase") {
    ctx.font = '30px "Life-Lessons", cursive';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", canvas.width / 2, canvas.height / 2);
  } else if (selectedOption === "lowercase") {
    ctx.font = '30px "Life-Lessons", cursive';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("abcdefghijklmnopqrstuvwxyz", canvas.width / 2, canvas.height / 2);
  } else if (selectedOption === "numbers") {
    ctx.font = '30px "Life-Lessons", cursive';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("0123456789", canvas.width / 2, canvas.height / 2);
  } else if (selectedOption === "special") {
    ctx.font = '30px "Life-Lessons", cursive';
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

document.getElementById('uppercase-card').addEventListener('click', displayUppercaseCards);
function displayUppercaseCards() {
  const secondCardGrid = document.querySelector('.second-card-grid');
  const container = document.querySelector('#first-card-section');
  const cardGrid = document.querySelector('.card-grid');
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');
  secondCardGrid.innerHTML = '';

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = letter;
    card.addEventListener('click', function () {
      container.classList.remove('hidden');
      cardGrid.style.display = 'none';
      secondCardGrid.style.display = 'none';
      const lettersPerRow = 7;
      const letterSize = 28;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const columnSpacing = canvasWidth / lettersPerRow;
      const rowSpacing = canvasHeight / Math.ceil(20 / lettersPerRow);
      for (let j = 0; j < 20; j++) {
        const row = Math.floor(j / lettersPerRow);
        const col = j % lettersPerRow;
        const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
        const y = row * rowSpacing + (rowSpacing - letterSize) / 2;
        ctx.font = `40px "classic notes", cursive`;
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
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');
  secondCardGrid.innerHTML = '';
  for (let i = 0; i <= 9; i++) {
    const letter = i;
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = letter;
    card.addEventListener('click', function () {
      container.classList.remove('hidden');
      cardGrid.style.display = 'none';
      secondCardGrid.style.display = 'none';
      const lettersPerRow = 7;
      const letterSize = 28;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const columnSpacing = canvasWidth / lettersPerRow;
      const rowSpacing = canvasHeight / Math.ceil(11 / lettersPerRow);
      for (let j = 0; j < 20; j++) {
        const row = Math.floor(j / lettersPerRow);
        const col = j % lettersPerRow;
        const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
        const y = row * rowSpacing + (rowSpacing - letterSize) / 2;
        ctx.font = `40px "classic notes", cursive`;
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
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');
  secondCardGrid.innerHTML = '';
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = letter;
    card.addEventListener('click', function () {
      container.classList.remove('hidden');
      cardGrid.style.display = 'none';
      secondCardGrid.style.display = 'none';
      const lettersPerRow = 7;
      const letterSize = 28;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const columnSpacing = canvasWidth / lettersPerRow;
      const rowSpacing = canvasHeight / Math.ceil(20 / lettersPerRow);
      for (let j = 0; j < 20; j++) {
        const row = Math.floor(j / lettersPerRow);
        const col = j % lettersPerRow;
        const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
        const y = row * rowSpacing + (rowSpacing - letterSize) / 2;
        ctx.font = `40px "classic notes", cursive`;
        ctx.fillText(letter, x, y);
      }
    });
    secondCardGrid.appendChild(card);
  }
}

document.getElementById('special-card').addEventListener('click', displaySpecialCharacters);
function displaySpecialCharacters() {
  const secondCardGrid = document.querySelector('.second-card-grid');
  const container = document.querySelector('#first-card-section');
  const cardGrid = document.querySelector('.card-grid');
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');
  secondCardGrid.innerHTML = '';
  const characters = "!@#$%^&*(){}[]:;?/<>";
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = char;
    card.addEventListener('click', function () {
      container.classList.remove('hidden');
      cardGrid.style.display = 'none';
      secondCardGrid.style.display = 'none';
      const lettersPerRow = 7;
      const letterSize = 28;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const columnSpacing = canvasWidth / lettersPerRow;
      const rowSpacing = canvasHeight / Math.ceil(15 / lettersPerRow);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let j = 0; j < 21; j++) {
        const row = Math.floor(j / lettersPerRow);
        const col = j % lettersPerRow;
        const x = col * columnSpacing + (columnSpacing - letterSize) / 2;
        const y = row * rowSpacing + (rowSpacing - letterSize) / 2;
        ctx.font = `40px "classic notes", cursive`;
        ctx.fillText(char, x, y);
      }
    });
    secondCardGrid.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var subheadingEl = document.getElementById("subheadingEl");
  if (subheadingEl) {
    subheadingEl.style.display = 'none';
  }
});

function showSubHeading() {
  var subheadingEl = document.getElementById('subheadingEl');
  subheadingEl.style.display = 'block';
  subheadingEl.style.maxWidth = '400px';
  subheadingEl.style.height = '20px';
  subheadingEl.style.margin = '15px auto 0 auto';
  subheadingEl.style.textAlign = 'center';
  subheadingEl.style.fontSize = '17px';
  subheadingEl.style.fontFamily = 'classic notes';
  subheadingEl.style.display = 'flex';
  subheadingEl.style.justifyContent = 'space-between';
  setTimeout(function () {
    subheadingEl.classList.add('common');
  }, 100);
}

function redirectToUppercaseCards() {
  const container = document.querySelector('#first-card-section');
  container.style.display = 'none';
  const secondCardGrid = document.querySelector('.second-card-grid');
  secondCardGrid.style.display = 'block'
}

function redirectToLowercaseCards() {
  const container = document.querySelector('#first-card-section');
  container.style.display = 'none';
  const secondCardGrid = document.querySelector('.second-card-grid');
  secondCardGrid.style.display = 'block'
}

function redirectToSpecialcaseCards() {
  const container = document.querySelector('#first-card-section');
  container.style.display = 'none';
  const secondCardGrid = document.querySelector('.second-card-grid');
  secondCardGrid.style.display = 'block'
}
document.addEventListener('DOMContentLoaded', function () {
  const imageUrls = [
   'images/cursive-writing/sample-a.png',
   'images/cursive-writing/sample-b.png',
   'images/cursive-writing/sample-c.png',
   'images/cursive-writing/sample-d.png',
   'images/cursive-writing/sample-e.png',
   'images/cursive-writing/sample-f.png',
   'images/cursive-writing/sample-g.png',
   'images/cursive-writing/sample-h.png',
   'images/cursive-writing/sample-i.png',
   'images/cursive-writing/sample-j.png',
   'images/cursive-writing/sample-k.png',
   'images/cursive-writing/sample-L.png',
   'images/cursive-writing/sample-m.png',
   'images/cursive-writing/sample-n.png',
   'images/cursive-writing/sample-o.png',
   'images/cursive-writing/sample-p.png',
   'images/cursive-writing/sample-q.png',
   'images/cursive-writing/sample-r.png',
   'images/cursive-writing/sample-s.png',
   'images/cursive-writing/sample-t.png',
   'images/cursive-writing/sample-u.png',
   'images/cursive-writing/sample-v.png',
   'images/cursive-writing/sample-w.png',
   'images/cursive-writing/sample-x.png',
   'images/cursive-writing/sample-y.png',
   'images/cursive-writing/sample-z.png'
  ];

  const imageGrid = document.getElementById('image-grid-1');
  const sampleCard = document.getElementById('image-card-1');
  let canvasClicked = false;
  let canvas = document.getElementById('drawing-area');
  let ctx = canvas.getContext('2d');
  const overlayCanvas = document.getElementById('overlay-canvas');
  imageGrid.style.visibility = 'hidden';
  document.addEventListener('click', function (event) {
    if (event.target.id === 'drawing-area') {
      canvas = document.getElementById('drawing-area');
      ctx = canvas.getContext('2d');
      canvasClicked = true;
    }
  });
  sampleCard.addEventListener('click', function () {
    imageGrid.style.visibility = 'visible';
    displayImageGrid();
  });

  function displayImageGrid() {
    imageGrid.innerHTML = '';
    for (let i = 0; i < imageUrls.length; i++) {
      const img = document.createElement('img');
      img.src = imageUrls[i];
      img.alt = `Image ${i + 1}`;
      img.width = 95;
      img.height = 120;
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('card');
      cardContainer.appendChild(img);
      imageGrid.appendChild(cardContainer);

      img.addEventListener('click', function () {
        console.log(`Image clicked: ${img.src}`);
        handleImageClick(img.src);
      });
    }
  }

  function handleImageClick(imageSrc) {
    const img = new Image();
    img.onload = function () {
      if (canvasClicked && canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imageGrid.style.visibility = 'hidden';
      } else {
        console.error("Canvas or context not available. Make sure to click on the canvas first.");
      }
    };
    img.src = imageSrc;
  }
  
  imageGrid.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'IMG') {
      handleImageClick(target.src);
    }
  });
});









document.addEventListener('DOMContentLoaded', function () {
  const colorButton = document.getElementById('color-button');
  const colorPicker = document.getElementById('colorPicker');

  colorButton.addEventListener('click', function () {
      // Toggle the display of the color picker
      if (colorPicker.style.display === 'none' || colorPicker.style.display === '') {
          colorPicker.style.display = 'block';
      } else {
          colorPicker.style.display = 'none';
      }
  });
});
