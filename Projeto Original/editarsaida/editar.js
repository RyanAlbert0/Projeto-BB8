let novaPosicao = null;

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

const cor = "#ffcb59ff";
const corSelec = "rgb(167, 114, 0)";

// Array para armazenar os botões
const buttons = [
    { x: 106, y: 80, width: 60, height: 60, text: "1", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 30, y: 370, width: 60, height: 60, text: "2", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 600, y: 50, width: 60, height: 60, text: "3", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 620, y: 470, width: 60, height: 60, text: "4", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 787, y: 940, width: 60, height: 60, text: "5", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1100, y: 945, width: 60, height: 60, text: "6", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1160, y: 495, width: 60, height: 60, text: "7", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1285, y: 445, width: 60, height: 60, text: "8", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1250, y: 40, width: 60, height: 60, text: "9", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1505, y: 40, width: 60, height: 60, text: "10", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1755, y: 110, width: 60, height: 60, text: "11", normalColor: cor, selectedColor: corSelec, selected: false },
    { x: 1800, y: 425, width: 60, height: 60, text: "12", normalColor: cor, selectedColor: corSelec, selected: false }
];

let canvas, ctx;

// Função para desenhar um botão
function drawButton(button) {
    // Define a cor com base no estado de seleção
    ctx.fillStyle = button.selected ? button.selectedColor : button.normalColor;
    
    // Desenha o retângulo arredondado
    ctx.beginPath();
    ctx.roundRect(button.x, button.y, button.width, button.height, 100);
    ctx.fill();
    
    ctx.fillStyle = 'black';
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

document.addEventListener('DOMContentLoaded', function() {
// Obtendo o canvas e seu contexto
const textoElemento = document.getElementById('resultados');
canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');




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



// Posição Vermelho e Azul (ponto de entrada e saída)


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


    


    // Encontra o botão clicado
    const clickedButton = buttons.find(button => isInsideButton(x, y, button));

    if (clickedButton) {
        buttons.forEach(b => b.selected = false);
        clickedButton.selected = true;
        drawAll();

        const info = valores.find(v => String(v.Pos) === String(clickedButton.text).trim());
        novaPosicao = [info.Valor.x, info.Valor.y];
        console.log('Nova Posição: ', novaPosicao);
    } 
    
    else {
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
    const exitsSelect = document.getElementById('exits')
    const missionSelect = document.getElementById('mission')
    const timeParameter = document.getElementById('time')
    const hurdleParameter = document.getElementById('hurdle')
    var parameters = []
    
    if (exitsSelect) {
        // Preencher o select com todas as chaves do localStorage, exceto i18nextLng
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            // pula a chave de idioma do i18next
            if (key === "i18nextLng" || key.includes('cor') || key.includes('InOut') ) continue;

            const optionExit = document.createElement("option");
            optionExit.value = key;
            optionExit.textContent = key;
            exitsSelect.appendChild(optionExit);
        }
        
        // Event listener para quando mudar a seleção de saída
        exitsSelect.addEventListener('change', function() {
            const chave = this.value;
            
            if (chave) {
                // Limpar o select de missões
                missionSelect.innerHTML = '';
                const optionMission = document.createElement("option");
                optionMission.value = 'Selecione uma Missão';
                optionMission.textContent = 'Selecione uma Missão';
                optionMission.selected = true;   // fica selecionado
                optionMission.disabled = true;   // não pode ser escolhido
                optionMission.hidden = true;     // não aparece na lista        
                missionSelect.appendChild(optionMission);

                // Recuperar os dados do localStorage
                const dados = localStorage.getItem(chave);
                
                if (dados) {
                    try {
                        const lista = JSON.parse(dados);
                        parameters = [] // Limpa o array de parâmetros antes de preenchê-lo novamente

                        parameters = lista
                        
                        console.log(`Dados da saída: ${chave}`, lista);
                        
                        // Verificar e exibir informações
                        lista.forEach((item, index) => {
                            parameters.push(index + 1)
                            console.log(`Item ${index + 1}:`, {
                                x: item[0],
                                y: item[1],
                                missao: item[2],
                                tempo: item[3],
                                complexidade: item[4]
                            });
                        });

                        // Extrair missões únicas e adicionar ao select
                        const missoes = new Set();
                        lista.forEach(item => {
                            if (item[2]) { // item[2] é a missão
                                missoes.add(item[2]);
                            }
                        });
                        
                        // Adicionar opções ao select
                        missoes.forEach(missao => {
                            const optionMission = document.createElement("option");
                            optionMission.value = missao;
                            optionMission.textContent = missao;
                            missionSelect.appendChild(optionMission);
                        });
                        
                    } catch (e) {
                        console.error('Erro ao fazer parse dos dados:', e);
                    }
                }
            }
        });

        missionSelect.addEventListener('change', function() {
            const missaoSelecionada = this.value;
            const parametrosFiltrados = parameters.filter(param => param[2] === missaoSelecionada);
            console.log(parametrosFiltrados[0][3]);
            timeParameter.value = parametrosFiltrados[0][3]
            hurdleParameter.value = parametrosFiltrados[0][4]
            
            // Encontrar e destacar o botão correspondente à posição armazenada
            const x_armazenado = parametrosFiltrados[0][0];
            const y_armazenado = parametrosFiltrados[0][1];
            
            // Encontrar a posição que tem estas coordenadas
            const posicao = valores.find(v => v.Valor.x === x_armazenado && v.Valor.y === y_armazenado);
            
            if (posicao) {
                // Desselecionar todos os botões
                buttons.forEach(b => b.selected = false);
                
                // Selecionar o botão correspondente
                const botaoCorrespondente = buttons.find(b => b.text === String(posicao.Pos));
                if (botaoCorrespondente) {
                    botaoCorrespondente.selected = true;
                    novaPosicao = [x_armazenado, y_armazenado];
                    drawAll();
                }
            }
    })};

function salvarSaida() {
    const saida = document.getElementById('exits').value.trim()
    const missao = document.getElementById('mission').value
    const tempo = document.getElementById('time').value.trim()
    const complexidade = document.getElementById('hurdle').value.trim()

    // Atualizar os dados no localStorage
    const dados = localStorage.getItem(saida);
    if (dados) {
        try {
            if (!novaPosicao) {
                alert("Selecione uma nova posição antes de salvar.");
                return;
            }
            const lista = JSON.parse(dados);
            const index = lista.findIndex(item => item[2] === missao);
            if (index !== -1) {
                lista[index][0] = novaPosicao[0];
                lista[index][1] = novaPosicao[1];
                lista[index][3] = tempo;
                lista[index][4] = complexidade;
                localStorage.setItem(saida, JSON.stringify(lista));
                alert("Dados atualizados com sucesso!");
            }
        } catch (e) {
            console.error('Erro ao atualizar os dados:', e);
        }
    }
}

function apagarPonto() {

    const saida = document.getElementById('exits').value.trim()
    const missao = document.getElementById('mission').value

    const dados = JSON.parse(localStorage.getItem(saida));
    if (dados) {
            const index = dados.findIndex(item => item[2] === missao);
            dados.splice(index, 1);
            localStorage.setItem(saida, JSON.stringify(dados));
            alert("Ponto apagado com sucesso!");
            window.location.reload();    
    }

}
