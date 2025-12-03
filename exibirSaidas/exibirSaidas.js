document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const timeEl = document.getElementById('time');
    const hurdleEl = document.getElementById('hurdle');
    const selectorEl = document.getElementById('exit');

    const azul = {x: 1760, y: 140}
    const verm = {x: 150, y: 140}

    if (addButton) {
        addButton.addEventListener('click', () => {
            const time = Number(timeEl?.value) || 0;
            const hurdle = Number(hurdleEl?.value) || 0;
            const selector = Number(selectorEl?.value) || 0;
            const media = (time + hurdle + selector) / 3;
            window.alert(`Média das notas: ${media.toFixed(2)}`);
        });
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // elemento da imagem (id "table") que será desenhada no canvas
    const tableImg = document.getElementById('table');

    // Pontos (serão alimentados via localStorage)
    const points = [];

    // Mantida a referência e lógica existente
    const controlsDiv = document.getElementById('controls');

    // guarda a ordem em que os pontos foram selecionados
    const selectionOrder = [];

    // Ajusta canvas para o tamanho da imagem e desenha
    function prepareCanvasAndDraw() {
        canvas.width = tableImg.naturalWidth || tableImg.width || canvas.width;
        canvas.height = tableImg.naturalHeight || tableImg.height || canvas.height;
        draw();
    }

function draw(chave) {
    let cores = localStorage.getItem(chave + 'cor');
    // desenha a imagem de fundo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tableImg.complete && tableImg.naturalWidth) {
        ctx.drawImage(tableImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Desenha pontos
points.forEach((point, i) => {
    const color = point.color || cores;

    // desenha o círculo
    ctx.beginPath();
    ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // configura fonte
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const texto = point.nome ? String(point.nome) : `P${i+1}`;
    const tx = point.x + 10;
    const ty = point.y - 20;

    // texto preenchido
    ctx.fillStyle = cores;
    ctx.fillText(texto, tx, ty);

    // borda do texto
    ctx.lineWidth = 2;              // espessura da borda
    ctx.strokeStyle = "black";      // cor da borda
    ctx.strokeText(texto, tx, ty);
});

    // Desenha linha na ordem de seleção
    if (selectionOrder.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[selectionOrder[0]].x, points[selectionOrder[0]].y);
        for (let i = 1; i < selectionOrder.length; i++) {
            const p = points[selectionOrder[i]];
            ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = points[0].color || cores; // usa cor do primeiro ponto
        ctx.lineWidth = 6;
        ctx.stroke();
    } else if (points.length >= 2) {
        // Fallback: liga os pontos na ordem do array
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = points[0].color || cores;
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

    // Referências aos elementos extras
    const tempoTotalDiv = document.getElementById('tempoTotal');
    const complexidadeMediaDiv = document.getElementById('complexidadeMedia');
    const exitsSelect = document.getElementById('exits');

    // Funções de cálculo
    function calcularSomaTempo(data) {
        return data.reduce((total, item) => total + Number(item[3] || 0), 0);
    }

    function calcularMediaComplexidade(data) {
        if (data.length === 0) return 0;
        const soma = data.reduce((total, item) => total + Number(item[4] || 0), 0);
        return soma / data.length;
    }

    function atualizarMetricas(chave) {
        const data = JSON.parse(localStorage.getItem(chave));
        if (!data) return;

        // Calcula métricas
        const somaTempo = calcularSomaTempo(data);
        const mediaComplex = calcularMediaComplexidade(data);

        if (tempoTotalDiv) tempoTotalDiv.textContent = "Tempo total: " + somaTempo;
        if (complexidadeMediaDiv) complexidadeMediaDiv.textContent = "Média de complexidade: " + mediaComplex;

        // Atualiza pontos a partir do localStorage
        points.length = 0;
        let cores = localStorage.getItem(chave + 'cor');
        data.forEach(([x, y, nome, tempo, outro]) => {
            points.push({
                x: Number(x),                 // garante número
                y: Number(y),                 // garante número
                nome: nome !== undefined ? nome : `P${points.length + 1}`, // usa o terceiro valor
                tempo: Number(tempo) || 0,
                outro: Number(outro) || 0,
                color: cores
            });
        });

        // Preenche automaticamente a ordem de seleção para permitir traçado,
        // sem depender de checkboxes
        selectionOrder.length = 0;
        for (let i = 0; i < points.length; i++) {
            selectionOrder.push(i);
        }

        draw();
    }

    // Preencher o select com todas as chaves do localStorage
    if (exitsSelect) {
    // Preencher o select com todas as chaves do localStorage, exceto i18nextLng
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // pula a chave de idioma do i18next
        if (key === "i18nextLng" || key.includes('cor') ) continue;

        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        exitsSelect.appendChild(option);
}

        // Atualizar métricas ao trocar de cenário
        exitsSelect.addEventListener("change", e => {
            const chave = e.target.value;
            atualizarMetricas(chave);
        });

        // Carregar automaticamente o primeiro cenário (se houver)
        if (!exitsSelect.value && exitsSelect.options.length > 0) {
            exitsSelect.value = exitsSelect.options[0].value;
        }
        if (exitsSelect.value) {
            atualizarMetricas(exitsSelect.value);
        }
    }
});