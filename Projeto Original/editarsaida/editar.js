let novaPosicao = null;

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

const cor = "#ffcb59ff";
const corSelec = "rgb(167, 114, 0)";

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
    
    // Helpers para compatibilidade de formatos de localStorage
    function getMissionFromItem(item) {
        if (!item) return undefined;
        // formato do projeto: [x, y, [in,out], missao, tempo, complexidade]
        if (Array.isArray(item[2])) return item[3];
        // formato alternativo (mais antigo ou simplificado): [x, y, missao, tempo, complexidade]
        return item[2];
    }

    function getTimeFromItem(item) {
        if (!item) return undefined;
        if (Array.isArray(item[2])) return item[4];
        return item[3];
    }

    function getComplexFromItem(item) {
        if (!item) return undefined;
        if (Array.isArray(item[2])) return item[5];
        return item[4];
    }

    function setTimeAndComplex(item, time, complex) {
        if (!item) return;
        if (Array.isArray(item[2])) {
            item[4] = time;
            item[5] = complex;
        } else {
            item[3] = time;
            item[4] = complex;
        }
    }
    
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
                        let lista = JSON.parse(dados);
                        parameters = [] // Limpa o array de parâmetros antes de preenchê-lo novamente

                        // Normalizar formato antigo: alguns registros antigos tinham uma
                        // posição vazia em index 2 e deslocavam a missão para index 3.
                        // Detectar e corrigir esses casos automaticamente.
                        let migrated = false;
                        lista = lista.map(item => {
                            // item may be an array like [x,y,,missao,tempo,complexidade]
                            if (Array.isArray(item)) {
                                // older format has length >=6 and empty item[2]
                                if ((item.length >= 6) && (item[2] === undefined || item[2] === null || item[2] === "")) {
                                    const corrected = [item[0], item[1], item[3], item[4], item[5]];
                                    migrated = true;
                                    return corrected;
                                }
                                // also handle case where mission is at index 3 but length ===5 (rare)
                                if ((item.length === 5) && (item[2] === undefined) && item[3]) {
                                    const corrected = [item[0], item[1], item[3], item[4] || 0, item[5] || 0];
                                    migrated = true;
                                    return corrected;
                                }
                            }
                            return item;
                        });

                        // If we migrated data, write it back to localStorage so future loads are correct
                        if (migrated) {
                            try {
                                localStorage.setItem(chave, JSON.stringify(lista));
                                console.log(`LocalStorage da saída "${chave}" migrado para formato atualizado.`);
                            } catch (e) {
                                console.warn('Falha ao migrar localStorage:', e);
                            }
                        }

                        parameters = lista
                        
                        console.log(`Dados da saída: ${chave}`, lista);
                        
                        // Verificar e exibir informações
                        lista.forEach((item, index) => {
                            // Não adicionar índices ao array de parâmetros (mantém apenas os itens)
                            console.log(`Item ${index + 1}:`, {
                                x: item[0],
                                y: item[1],
                                missao: getMissionFromItem(item),
                                tempo: getTimeFromItem(item),
                                complexidade: getComplexFromItem(item)
                            });
                        });

                        // Extrair missões únicas e adicionar ao select
                        const missoes = new Set();
                        lista.forEach(item => {
                            const m = getMissionFromItem(item);
                            if (m) missoes.add(m);
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
            const parametrosFiltrados = parameters.filter(param => getMissionFromItem(param) === missaoSelecionada);
            if (!parametrosFiltrados || parametrosFiltrados.length === 0) return;
            console.log(getTimeFromItem(parametrosFiltrados[0]));
            timeParameter.value = getTimeFromItem(parametrosFiltrados[0]) || '';
            hurdleParameter.value = getComplexFromItem(parametrosFiltrados[0]) || '';

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
            const index = lista.findIndex(item => getMissionFromItem(item) === missao);
            if (index !== -1) {
                lista[index][0] = novaPosicao[0];
                lista[index][1] = novaPosicao[1];
                setTimeAndComplex(lista[index], tempo, complexidade);
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
            const index = dados.findIndex(item => getMissionFromItem(item) === missao);
            if (index !== -1) {
            dados.splice(index, 1);
            localStorage.setItem(saida, JSON.stringify(dados));
            alert("Ponto apagado com sucesso!");
            window.location.reload();
            }
        }

}
