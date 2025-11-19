document.addEventListener('DOMContentLoaded', function() {
// Obtendo o canvas e seu contexto
const textoElemento = document.getElementById('resultados');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configurando as dimensões do canvas
canvas.width = 1920;
canvas.height = 1080;

// Variável para rastrear o botão selecionado
let selectedButton = null;

const cor = "#ffcb59ff";
const corSelec = "#ffae00ff";

// Array para armazenar os botões
const buttons = [
    { x: 106, y: 80, width: 60, height: 60, text: "1", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 35, y: 370, width: 60, height: 60, text: "2", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 600, y: 55, width: 60, height: 60, text: "3", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 625, y: 475, width: 60, height: 60, text: "4", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 795, y: 950, width: 60, height: 60, text: "5", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1100, y: 945, width: 60, height: 60, text: "6", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1165, y: 500, width: 60, height: 60, text: "7", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1290, y: 450, width: 60, height: 60, text: "8", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1255, y: 40, width: 60, height: 60, text: "9", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1510, y: 40, width: 60, height: 60, text: "10", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1755, y: 110, width: 60, height: 60, text: "11", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1800, y: 425, width: 60, height: 60, text: "12", normalColor: cor, selectedColor: corSelec, selected: false }
];

const valores = [
    {"Pos":1, "Valor":{x: 126, y: 107}},
    {"Pos":2, "Valor":{x: 60, y: 400}},
    {"Pos":3, "Valor":{x: 630, y: 80}},
    {"Pos":4, "Valor":{x: 650, y: 500}},
    {"Pos":5, "Valor":{x: 820, y: 975}},
    {"Pos":6, "Valor":{x: 1150, y: 970}},
    {"Pos":7, "Valor":{x: 1185, y: 520}},
    {"Pos":8, "Valor":{x: 1320, y: 475}},
    {"Pos":9, "Valor":{x: 1280, y: 50}},
    {"Pos":10, "Valor":{x: 1530, y: 60}},
    {"Pos":11, "Valor":{x: 1780, y: 140}},
    {"Pos":12, "Valor":{x: 1830, y: 450}},
  
  ];

// Função para desenhar um botão
function drawButton(button) {
    // Define a cor com base no estado de seleção
    ctx.fillStyle = button.selected ? button.selectedColor : button.normalColor;
    
    // Desenha o retângulo arredondado
    ctx.beginPath();
    ctx.roundRect(button.x, button.y, button.width, button.height, 100);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(button.text, button.x + button.width/2, button.y + button.height/2);
}

// Função para desenhar todos os botões
function drawButtons() {
    buttons.forEach(button => drawButton(button));
}

// Função para verificar se um ponto está dentro de um botão
function isInsideButton(x, y, button) {
    return x > button.x && 
           x < button.x + button.width && 
           y > button.y && 
           y < button.y + button.height;
}

// Função para desenhar a imagem de fundo
function drawBackground() {
    const img = document.getElementById('table');
    if (img && img.complete && img.naturalWidth) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Função para desenhar tudo
function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawButtons();
}

// Event listener para cliques no canvas
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();

    // Ajuste de escala para compensar o CSS (width: 50%, height: auto)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Coordenadas ajustadas
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    console.log(`Clique ajustado: x=${x}, y=${y}`);

    // Cria o mecanismo de salvar as saídas e o nome das missões

    const saida = document.getElementById('exit').value.trim()
    const missao = document.getElementById('mission').value
    const tempo = document.getElementById('time').value.trim()
    const complexidade = document.getElementById('hurdle').value.trim()


    // Encontra o botão clicado
    const clickedButton = buttons.find(button => isInsideButton(x, y, button));

    if (clickedButton) {
        buttons.forEach(b => b.selected = false);
        clickedButton.selected = true;
        drawAll();

        console.log('Botão clicado:', clickedButton.text);

        const info = valores.find(v => String(v.Pos) === String(clickedButton.text).trim());
        if (saida) {
            let lista = localStorage.getItem(saida);
            if (lista) {
                lista = JSON.parse(lista);
            } else {
                lista = [];
            }
            lista.push([info.Valor.x, info.Valor.y, missao, tempo, complexidade]);
            localStorage.setItem(saida, JSON.stringify(lista));
}
    } else {
        console.log('Nenhum botão foi clicado');
    }
});

// Desenhar tudo inicialmente
const img = document.getElementById('table');
if (img && img.complete && img.naturalWidth) {
    drawAll();
} else if (img) {
    img.addEventListener('load', drawAll);
}
});
