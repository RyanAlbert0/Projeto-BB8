const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do canvas para o container
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let zoomEnabled = false;
let scale = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let lastX = 0;
let lastY = 0;

// Função de desenho
function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(panX, panY);
  ctx.scale(scale, scale);
  ctx.fillStyle = "blue";
  ctx.fillRect(50, 50, 200, 100);
}

// Inicial
draw();

// Toggle do zoom - aumenta o tamanho do canvas
const container = document.getElementById("canvas-container");
const toggleButton = document.getElementById("toggleZoom");

toggleButton.addEventListener("click", () => {
  zoomEnabled = !zoomEnabled;
  container.classList.toggle("zoomed");
  toggleButton.textContent = zoomEnabled ? "Desativar Zoom" : "Ativar Zoom";
});

// Controle de zoom com scroll
canvas.addEventListener("wheel", (event) => {
  if (!zoomEnabled) return;
  event.preventDefault();

  if (event.deltaY < 0) {
    scale *= 1.1; // zoom in
  } else {
    scale /= 1.1; // zoom out
  }
  draw();
});

// Controle de pan (mover) com mouse
canvas.addEventListener("mousedown", (event) => {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
});

canvas.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - lastX;
  const deltaY = event.clientY - lastY;

  panX += deltaX;
  panY += deltaY;

  lastX = event.clientX;
  lastY = event.clientY;

  draw();
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});