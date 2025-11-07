// Obtendo o canvas e seu contexto
const textoElemento = document.getElementById('texto');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configurando as dimensões do canvas
canvas.width = 800;
canvas.height = 400;

// Variável para rastrear o botão selecionado
let selectedButton = null;

// Array para armazenar os botões
const buttons = [
    { x: 50, y: 50, width: 40, height: 40, text: "1", normalColor: "#abababff", selectedColor: "#787878", selected: false },
    { x: 50, y: 120, width: 40, height: 40, text: "2", normalColor: "#abababff", selectedColor: "#787878", selected: false },
    { x: 50, y: 190, width: 40, height: 40, text: "3", normalColor: "#abababff", selectedColor: "#787878", selected: false }
];

const valores = [
    {"Pos":1, "Valor":12},
    {"Pos":2, "Valor":54},
    {"Pos":3, "Valor":76}
  
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
    ctx.font = '16px Arial';
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

// Event listener para cliques no canvas
canvas.addEventListener('click', function(event) {
    // Obtendo as coordenadas do clique relativas ao canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Verificando qual botão foi clicado
    buttons.forEach(button => {
        if (isInsideButton(x, y, button)) {
            // Desmarca todos os botões
            buttons.forEach(b => b.selected = false);
            // Marca o botão clicado
            button.selected = true;
            // Redesenha todos os botões
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawButtons();
            let resultado = null;
            for (const info of valores) {
                if (info.Pos.toString() === button.text) {
                    resultado = info.Valor;
                }
            }
            console.log(`Botão "${button.text}" foi selecionado!`);
            if (resultado !== null) {
                textoElemento.textContent = `Valor: ${resultado}`;
            }
        }
    });
});

// Desenhar os botões inicialmente
drawButtons();
