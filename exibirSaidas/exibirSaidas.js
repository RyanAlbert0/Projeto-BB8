document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const timeEl = document.getElementById('time');
    const hurdleEl = document.getElementById('hurdle');
    const selectorEl = document.getElementById('exit');

    if (!addButton) return;

    addButton.addEventListener('click', () => {
        const time = Number(timeEl?.value) || 0;
        const hurdle = Number(hurdleEl?.value) || 0;
        const selector = Number(selectorEl?.value) || 0;
        const media = (time + hurdle + selector) / 3;
        window.alert(`Média das notas: ${media.toFixed(2)}`);
        

    });
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // elemento da imagem (id "table") que será desenhada no canvas
    const tableImg = document.getElementById('table');

    // Pontos fixos (coordenadas relativas à imagem/canvas)
    const points = [
        // { x: 126, y: 107 },
        // { x: 60, y: 400 },
        // { x: 630, y: 80 },
        // { x: 650, y: 500 },
        // { x: 820, y: 975 },
        // { x: 1150, y: 970 },
        // { x: 1185, y: 520 },
        // { x: 1320, y: 475 },
        // { x: 1280, y: 50 },
        // { x: 1530, y: 60 },
        // { x: 1780, y: 140 },
        // { x: 1830, y: 450 },

    ];

    // Gera checkboxes para cada ponto
    const controlsDiv = document.getElementById('controls');

    // guarda a ordem em que os pontos foram selecionados
    const selectionOrder = [];

    points.forEach((_, i) => {
        const label = document.createElement('label');
        label.style.marginRight = "10px";
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'point';
        checkbox.value = i;

        // atualiza a ordem ao marcar/desmarcar
        checkbox.addEventListener('change', () => {
            const idx = Number(checkbox.value);
            if (checkbox.checked) {
                const exist = selectionOrder.indexOf(idx);
                if (exist !== -1) selectionOrder.splice(exist, 1);
                selectionOrder.push(idx);
            } else {
                const pos = selectionOrder.indexOf(idx);
                if (pos !== -1) selectionOrder.splice(pos, 1);
            }
            draw();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` Ponto ${i+1} `));
        controlsDiv.appendChild(label);
    });

    // Ajusta canvas para o tamanho da imagem e desenha
    function prepareCanvasAndDraw() {
        // usa dimensões naturais da imagem para o canvas
        canvas.width = tableImg.naturalWidth || tableImg.width || canvas.width;
        canvas.height = tableImg.naturalHeight || tableImg.height || canvas.height;
        draw();
    }

    function draw() {
        // desenha a imagem de fundo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (tableImg.complete && tableImg.naturalWidth) {
            ctx.drawImage(tableImg, 0, 0, canvas.width, canvas.height);
        } else {
            // se imagem não estiver pronta, fundo branco
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Desenha pontos
        points.forEach((point, i) => {
            const color = point.color || '#FF3366';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.font = "bold 14px Arial";
            ctx.fillStyle = "#222";
            ctx.fillText(`P${i+1}`, point.x + 10, point.y - 10);
        });

        // Desenha linha na ordem de seleção
        if (selectionOrder.length >= 2) {
            ctx.beginPath();
            ctx.moveTo(points[selectionOrder[0]].x, points[selectionOrder[0]].y);
            for (let i = 1; i < selectionOrder.length; i++) {
                const p = points[selectionOrder[i]];
                ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Se a imagem já estiver carregada, prepara canvas; senão espera o load
    if (tableImg.complete && tableImg.naturalWidth) {
        prepareCanvasAndDraw();
    } else {
        tableImg.addEventListener('load', prepareCanvasAndDraw);
    }
});