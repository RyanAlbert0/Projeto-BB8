document.addEventListener('DOMContentLoaded', function() {
// Obtendo o canvas e seu contexto
const textoElemento = document.getElementById('resultados');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let zoomEnabled = false;
let scale = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let lastX = 0;
let lastY = 0;

// Configurações de zoom para botões extras
const zoomThreshold = 1.5; // 150% de zoom para mostrar botões extras
const minZoom = 0.5; // Zoom mínimo (50%)
const maxZoom = 5; // Zoom máximo (300%)




// Desmarcar radios
document.querySelectorAll('input[name="In"]').forEach(radio => {
    radio.addEventListener("click", function() {
        // Se já estava marcado, desmarca
        if (this.checked && this.dataset.wasChecked === "true") {
            this.checked = false;
            this.dataset.wasChecked = "false";
        } else {
            // Marca e registra que foi clicado
            document.querySelectorAll('input[name="In"]').forEach(r => r.dataset.wasChecked = "false");
            this.dataset.wasChecked = "true";
        }
    });
});
document.querySelectorAll('input[name="Out"]').forEach(radio => {
    radio.addEventListener("click", function() {
        // Se já estava marcado, desmarca
        if (this.checked && this.dataset.wasChecked === "true") {
            this.checked = false;
            this.dataset.wasChecked = "false";
        } else {
            // Marca e registra que foi clicado
            document.querySelectorAll('input[name="Out"]').forEach(r => r.dataset.wasChecked = "false");
            this.dataset.wasChecked = "true";
        }
    });
});




    


// Configurando as dimensões do canvas
canvas.width = 1920;
canvas.height = 1080;

const cor = "#ffcb59ff";
const corSelec = "#ffae00ff";

// Array para armazenar os botões
const buttons = [
    { x: 106, y: 80, width: 60, height: 60, text: "1", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 30, y: 370, width: 60, height: 60, text: "2", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 600, y: 90, width: 60, height: 60, text: "3", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 620, y: 470, width: 60, height: 60, text: "4", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 787, y: 900, width: 60, height: 60, text: "5", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1100, y: 945, width: 60, height: 60, text: "6", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1160, y: 495, width: 60, height: 60, text: "7", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1285, y: 445, width: 60, height: 60, text: "8", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1250, y: 40, width: 60, height: 60, text: "9", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1505, y: 40, width: 60, height: 60, text: "10", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1755, y: 110, width: 60, height: 60, text: "11", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1800, y: 425, width: 60, height: 60, text: "12", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 462, y: 427, width: 60, height: 60, text: "13", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 620, y: 550, width: 60, height: 60, text: "14", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 760, y: 400, width: 60, height: 60, text: "15", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1135, y: 38, width: 60, height: 60, text: "16", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 1825, y: 35, width: 60, height: 60, text: "17", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 350, y: 285, width: 60, height: 60, text: "18", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 787, y: 980, width: 60, height: 60, text: "19", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 },
    { x: 600, y: 30, width: 60, height: 60, text: "20", normalColor: cor, selectedColor: corSelec, selected: false, baseWidth: 60, baseHeight: 60, baseRadius: 30 }
];

// Botões extras que aparecem apenas com zoom >= zoomThreshold
const botõesExtras = [
  // Exemplo: adicione quantos botões extras quiser aqui
];

const valores = [
    {"Pos":1, "Valor":{x: 126, y: 107}},
    {"Pos":2, "Valor":{x: 60, y: 400}},
    {"Pos":3, "Valor":{x: 630, y: 80}},
    {"Pos":4, "Valor":{x: 650, y: 500}},
    {"Pos":5, "Valor":{x: 820, y: 955}},
    {"Pos":6, "Valor":{x: 1150, y: 970}},
    {"Pos":7, "Valor":{x: 1185, y: 520}},
    {"Pos":8, "Valor":{x: 1320, y: 475}},
    {"Pos":9, "Valor":{x: 1280, y: 50}},
    {"Pos":10, "Valor":{x: 1530, y: 60}},
    {"Pos":11, "Valor":{x: 1780, y: 140}},
    {"Pos":12, "Valor":{x: 1830, y: 450}},  
    {"Pos":13, "Valor":{x: 502, y: 457}},  
    {"Pos":14, "Valor":{x: 640, y: 570}},  
    {"Pos":15, "Valor":{x: 790, y: 430}},  
    {"Pos":16, "Valor":{x: 1170, y: 65}},  
    {"Pos":17, "Valor":{x: 1855, y: 60}},  
    {"Pos":18, "Valor":{x: 385, y: 305}},  
    {"Pos":19, "Valor":{x: 813, y: 1000}},  
    {"Pos":20, "Valor":{x: 630, y: 40}},  
  ];


// Função auxiliar para processar clique em qualquer botão
function processarCliqueBotao(clickedButton, todasBotoes) {
    buttons.forEach(b => b.selected = false);
    botõesExtras.forEach(b => b.selected = false);
    clickedButton.selected = true;
    drawAll();

    // Identificação do In/Out
    const InSelected = document.querySelector('input[name="In"]:checked')
    const InEl = InSelected ? InSelected.value : ''

    const OutSelected = document.querySelector('input[name="Out"]:checked')
    const OutEl = OutSelected ? OutSelected.value : ''

    // mantém o mapeamento natural das cores
    if(InEl === 'blue'){
        In = 'azul'
        console.log('In Azul')
    }
    else if(InEl === 'red'){
        In = 'verm'
        console.log('In Vermelho')
    }
    else{
        In = null
        console.log('Nulo')
    }

    // mantém a correspondência de cor original para saídas
    if(OutEl === 'blue'){
        Out = 'azul'
        console.log('Out Azul')
    }
    else if(OutEl === 'red'){
        Out = 'verm'
        console.log('Out Vermelho')
    }
    else{
        Out = null
        console.log('Null')
    }

    console.log('Botão clicado:', clickedButton.text);

    const info = valores.find(v => String(v.Pos) === String(clickedButton.text).trim());
    if (info) {
        const saida = document.getElementById('exit').value.trim()
        const missao = document.getElementById('mission').value
        const tempo = document.getElementById('time').value.trim()
        const complexidade = document.getElementById('hurdle').value.trim()
        
        if (saida) {
            let lista = localStorage.getItem(saida);
            if (lista) {
                lista = JSON.parse(lista);
            } else {
                lista = [];
            }
            lista.push([info.Valor.x, info.Valor.y, missao, tempo, complexidade]);
            localStorage.setItem(saida, JSON.stringify(lista));
            if(!localStorage.getItem(saida + 'cor')){
                let color = document.getElementById('colorPicker').value
                localStorage.setItem(saida + 'cor', color)
            }
            else
            {
                console.log('Cor já definida');
            }
            if(!localStorage.getItem(saida + 'InOut')){
                InOut = [In, Out]
                localStorage.setItem(saida + 'InOut', JSON.stringify(InOut))
            }
        }
    }
}

// Função auxiliar para desenhar tudo inicialmente



// Função para desenhar um botão
function drawButton(button) {
    // Calcular tamanho dinâmico com base no zoom (reduze conforme zoom aumenta)
    const sizeMultiplier = 1 / scale; // Quanto maior o scale (zoom), menor o multiplicador
    const width = button.baseWidth * sizeMultiplier;
    const height = button.baseHeight * sizeMultiplier;
    const radius = button.baseRadius * sizeMultiplier;
    
    // Define a cor com base no estado de seleção
    ctx.fillStyle = button.selected ? button.selectedColor : button.normalColor;
    
    // Desenha o retângulo arredondado
    ctx.beginPath();
    ctx.roundRect(button.x, button.y, width, height, radius);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = `${20 * sizeMultiplier}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(button.text, button.x + width/2, button.y + height/2);
}

// Função para desenhar todos os botões
function drawButtons() {
    buttons.forEach(button => drawButton(button));
    
    // Desenhar botões extras apenas se zoom >= zoomThreshold
    if (scale >= zoomThreshold) {
        botõesExtras.forEach(button => drawButton(button));
    }
}

// Função para verificar se um ponto está dentro de um botão
function isInsideButton(x, y, button) {
    const sizeMultiplier = 1 / scale;
    const width = button.baseWidth * sizeMultiplier;
    const height = button.baseHeight * sizeMultiplier;
    
    return x > button.x && 
           x < button.x + width && 
           y > button.y && 
           y < button.y + height;
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
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Aplicar transformações (pan e zoom)
    ctx.translate(panX, panY);
    ctx.scale(scale, scale);
    
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
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    
    // Inverter transformações de pan e zoom para encontrar o ponto correto
    x = (x - panX) / scale;
    y = (y - panY) / scale;

    console.log(`Clique ajustado: x=${x}, y=${y}`);

    // Cria o mecanismo de salvar as saídas e o nome das missões

    const saida = document.getElementById('exit').value.trim()
    const missao = document.getElementById('mission').value
    const tempo = document.getElementById('time').value.trim()
    const complexidade = document.getElementById('hurdle').value.trim()


    // Encontra o botão clicado
    const clickedButton = buttons.find(button => isInsideButton(x, y, button));
    
    // Procurar em botões extras também
    let clickedExtraButton = null;
    if (!clickedButton && scale >= zoomThreshold) {
        clickedExtraButton = botõesExtras.find(button => isInsideButton(x, y, button));
    }

    if (clickedButton) {
        processarCliqueBotao(clickedButton, buttons);
    } else if (clickedExtraButton) {
        processarCliqueBotao(clickedExtraButton, botõesExtras);
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

// Controle de zoom com scroll (zoom na posição do mouse)
canvas.addEventListener('wheel', (event) => {
    if (!zoomEnabled) return;
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    
    // Ajuste de escala para compensar o CSS (width: 50%, height: auto)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Posição do mouse no espaço da tela (ajustada para a escala do canvas)
    const screenX = (event.clientX - rect.left) * scaleX;
    const screenY = (event.clientY - rect.top) * scaleY;
    
    // Converter para coordenadas do canvas (levando em conta pan e zoom atual)
    const zoomX = (screenX - panX) / scale;
    const zoomY = (screenY - panY) / scale;
    
    // Calcular novo scale
    let newScale = scale;
    if (event.deltaY < 0) {
        newScale *= 1.1; // zoom in
    } else {
        newScale /= 1.1; // zoom out
    }
    
    // Limitar zoom entre minZoom e maxZoom
    if (newScale >= minZoom && newScale <= maxZoom) {
        scale = newScale;
        
        // Ajustar pan para que o ponto sob o mouse permaneça no mesmo lugar
        panX = screenX - zoomX * scale;
        panY = screenY - zoomY * scale;
    }
    
    drawAll();
});

// Controle de pan (mover) com mouse
canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    panX += deltaX;
    panY += deltaY;

    lastX = event.clientX;
    lastY = event.clientY;

    drawAll();
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Toggle do zoom - ativa/desativa e reseta quando desativar
const toggleZoomBtn = document.getElementById('togglezoom');
if (toggleZoomBtn) {
    toggleZoomBtn.addEventListener('click', () => {
        zoomEnabled = !zoomEnabled;
        
        // Se desativou o zoom, reseta posição e escala
        if (!zoomEnabled) {
            panX = 0;
            panY = 0;
            scale = 1;
        }
        
        toggleZoomBtn.textContent = zoomEnabled ? 'Desativar Zoom' : 'Ativar Zoom';
        drawAll();
    });
}

});
