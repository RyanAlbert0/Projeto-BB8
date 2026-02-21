document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const verm = {x:150, y:950, nome: " "};
    const azul = {x:1760, y:950, nome: " "};


    // elemento da imagem (id "table") que será desenhada no canvas
    const tableImg = document.getElementById('table');

    // Pontos (serão alimentados via localStorage)
    const points = [];

    // guarda a ordem em que os pontos foram selecionados
    const selectionOrder = [];

    // Ajusta canvas para o tamanho da imagem e desenha
    function prepareCanvasAndDraw() {
        canvas.width = tableImg.naturalWidth || tableImg.width || canvas.width;
        canvas.height = tableImg.naturalHeight || tableImg.height || canvas.height;
        draw();
    }

function distancia(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx*dx + dy*dy);
}

function corPorDistancia(dist, maxDist) {
    // verde (120) até vermelho (0) no espectro HSL
    const hue = 120 - Math.round((dist / maxDist) * 120);
    return `hsl(${hue}, 100%, 50%)`;
}

function draw(chave) {
    let cores = localStorage.getItem(chave + 'cor');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tableImg.complete && tableImg.naturalWidth) {
        ctx.drawImage(tableImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (points.length === 0) return;

    const primeiro = points[0];
    const maxDist = Math.max(...points.map(p => distancia(p, primeiro)));

    // Desenha linha conectando pontos PRIMEIRO (fica atrás)
    if (selectionOrder.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[selectionOrder[0]].x, points[selectionOrder[0]].y);
        for (let i = 1; i < selectionOrder.length; i++) {
            const p = points[selectionOrder[i]];
            ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = cores; // usa cor armazenada
        ctx.lineWidth = 6;
        ctx.stroke();
    } else if (points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = cores; // usa cor armazenada
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Desenha pontos com gradiente verde → vermelho DEPOIS (fica na frente)
    points.forEach((point, i) => {
        // Se é ponto de entrada ou saída, usar cor estática
        let color;
        if (point.tipo) {
            color = point.color; // cor estática para In/Out
        } else {
            // Pontos do localStorage com cor dinâmica
            const dist = distancia(point, primeiro);
            color = corPorDistancia(dist, maxDist);
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, 12, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
    });
}

    // Se a imagem já estiver carregada, prepara canvas; senão espera o load
    if (tableImg.complete && tableImg.naturalWidth) {
        prepareCanvasAndDraw();
    } else {
        tableImg.addEventListener('load', prepareCanvasAndDraw);
    }

    // Referências aos elementos extras
    const tempoTotal = document.getElementById('tempoTotal');
    const complexidadeMedia = document.getElementById('complexidadeMedia');
    const exitsSelect = document.getElementById('exits');
    const outputsRange = document.getElementById('outputsRange');
    const outputsCount = document.getElementById('outputsCount');
    const outputsContainer = document.getElementById('outputsContainer');
    const outputsFilter = document.getElementById('outputsFilter');
    const resultadosContainer = document.getElementById('resultadosContainer');

    // Desenha apenas o background (usado por múltiplas saídas)
    function drawBackgroundOnly() {
        if (tableImg.complete && tableImg.naturalWidth) {
            ctx.drawImage(tableImg, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Constrói um array de pontos a partir de uma chave (sem tocar no array global `points`)
    function buildPointsFromData(chave) {
        const data = JSON.parse(localStorage.getItem(chave)) || [];
        const arr = [];
        let coresLocal = localStorage.getItem(chave + 'cor');
        data.forEach(([x,y,nome,tempo,outro]) => {
            arr.push({ x:Number(x), y:Number(y), nome:nome||`P${arr.length+1}`, tempo:Number(tempo)||0, outro:Number(outro)||0 });
        });

        const InOut = JSON.parse(localStorage.getItem(chave + 'InOut')) || [];
        if (InOut[0] === "verm") arr.unshift({ ...verm, color:"green", tipo:"entrada" });
        else if (InOut[0] === "azul") arr.unshift({ ...azul, color:"green", tipo:"entrada" });

        if (InOut[1] === "verm") arr.push({ ...verm, color:"red", tipo:"saida" });
        else if (InOut[1] === "azul") arr.push({ ...azul, color:"red", tipo:"saida" });

        return { arr, coresLocal };
    }

    // Desenha uma rota (polilinha + pontos) para uma chave sem limpar o canvas
    function drawRouteForKey(chave) {
        const { arr, coresLocal } = buildPointsFromData(chave);
        if (arr.length === 0) return;

        const primeiroLocal = arr[0];
        const maxDistLocal = Math.max(...arr.map(p => distancia(p, primeiroLocal)));

        // linha
        if (arr.length >= 2) {
            ctx.beginPath();
            ctx.moveTo(arr[0].x, arr[0].y);
            for (let i = 1; i < arr.length; i++) ctx.lineTo(arr[i].x, arr[i].y);
            ctx.strokeStyle = coresLocal || '#000';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // pontos (entrada/saída fixos, demais dinâmicos)
        arr.forEach((point, i) => {
            let color;
            if (point.tipo) color = point.color;
            else color = corPorDistancia(distancia(point, primeiroLocal), maxDistLocal);

            ctx.beginPath();
            ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });
    }

    // Desenha múltiplas saídas: aceita número N ou array de chaves
    function drawMultipleOutputs(nOrKeys) {
        // construir lista de chaves válidas (mesma lógica do preenchimento)
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "i18nextLng" || key.includes('cor') || key.includes('InOut')) continue;
            keys.push(key);
        }

        let toDraw = [];
        if (Array.isArray(nOrKeys)) {
            // usar as chaves passadas (filtrar para garantir que existem)
            toDraw = nOrKeys.filter(k => keys.includes(k));
        } else {
            const n = Number(nOrKeys) || 1;
            toDraw = keys.slice(0, n);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackgroundOnly();

        toDraw.forEach(k => drawRouteForKey(k));
    }

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

    // monta pontos
    points.length = 0;
    let cores = localStorage.getItem(chave + 'cor');
    data.forEach(([x,y,nome,tempo,outro]) => {
        points.push({ x:Number(x), y:Number(y), nome:nome||`P${points.length+1}`, tempo:Number(tempo)||0, outro:Number(outro)||0, color:cores });
    });

    // adiciona entrada/saída ANTES de recalcular selectionOrder
    const InOut = JSON.parse(localStorage.getItem(chave + 'InOut')) || [];
    if (InOut[0] === "verm") points.unshift({ ...verm, color:"green", tipo:"entrada" });
    else if (InOut[0] === "azul") points.unshift({ ...azul, color:"green", tipo:"entrada" });

    if (InOut[1] === "verm") points.push({ ...verm, color:"red", tipo:"saida" });
    else if (InOut[1] === "azul") points.push({ ...azul, color:"red", tipo:"saida" });

    // agora sim recalcula ordem
    selectionOrder.length = 0;
    for (let i=0; i<points.length; i++) selectionOrder.push(i);
    
    draw(chave);
    tempoTotal.textContent ='Tempo total das missões: ' + calcularSomaTempo(data)
    complexidadeMedia.textContent ='Média de complexidade: ' + Math.round(calcularMediaComplexidade(data))

    }


    // Preencher o select com todas as chaves do localStorage
    if (exitsSelect) {
        // Preencher o select com todas as chaves do localStorage, exceto i18nextLng
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            // pula a chave de idioma do i18next
            if (key === "i18nextLng" || key.includes('cor') || key.includes('InOut') ) continue;

            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            exitsSelect.appendChild(option);
        }

        // Atualizar métricas ao trocar de cenário
        exitsSelect.addEventListener("change", e => {
            const chave = e.target.value;
            atualizarMetricas(chave);
            // redesenha múltiplas saídas conforme range atual (ou seleção manual se houver)
            if (outputsContainer && getSelectedOutputs().length > 0) {
                const sel = getSelectedOutputs();
                drawMultipleOutputs(sel);
            } else {
                const n = outputsRange ? Number(outputsRange.value) : 1;
                drawMultipleOutputs(n);
            }
        });

        // Carregar automaticamente o primeiro cenário (se houver)
        if (!exitsSelect.value && exitsSelect.options.length > 0) {
            exitsSelect.value = exitsSelect.options[0].value;
        }
        if (exitsSelect.value) {
            atualizarMetricas(exitsSelect.value);
            const n0 = outputsRange ? Number(outputsRange.value) : 1;
            drawMultipleOutputs(n0);
        }
    }

    // Helper: retorna chaves selecionadas na lista de checkboxes
    function getSelectedOutputs() {
        if (!outputsContainer) return [];
        const checked = outputsContainer.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checked).map(cb => cb.dataset.key);
    }

    // Função para exibir resultados em campos separados
    function exibirResultadosSeparados(chaves) {
        if (!resultadosContainer) return;
        resultadosContainer.innerHTML = '';

        chaves.forEach((chave, index) => {
            const data = JSON.parse(localStorage.getItem(chave));
            if (!data) return;

            const tempoSaida = calcularSomaTempo(data);
            const complexidadeSaida = Math.round(calcularMediaComplexidade(data));
            const corSaida = localStorage.getItem(chave + 'cor') || '#000';

            const card = document.createElement('div');
            card.class = 'infoOutput';

            card.innerHTML = `
                <h3 style="color: ${corSaida}; margin-top: 0;">${chave}</h3>
                <p><strong>Tempo Total:</strong> ${tempoSaida}</p>
                <p><strong>Complexidade Média:</strong> ${complexidadeSaida}</p>
            `;

            resultadosContainer.appendChild(card);
        });
    }

    // Handler do range (mostra quantas saídas exibir)
    if (outputsRange) {
        outputsRange.addEventListener('input', e => {
            const n = Number(e.target.value);
            if (outputsCount) outputsCount.textContent = String(n);
            // se houver seleção manual (checkboxes), ignorar o range
            if (outputsContainer && getSelectedOutputs().length > 0) return;
            drawMultipleOutputs(n);
        });
    }

    // Popula a lista de saídas como checkboxes pesquisáveis e adiciona listener
    if (outputsContainer) {
        outputsContainer.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "i18nextLng" || key.includes('cor') || key.includes('InOut')) continue;
            const wrap = document.createElement('div');
            wrap.className = 'output-item';

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.dataset.key = key;
            cb.id = 'out_cb_' + i;
            cb.class = 'saidacheckbox'

            const label = document.createElement('label');
            label.htmlFor = cb.id;
            label.textContent = key;

            wrap.appendChild(cb);
            wrap.appendChild(label);
            outputsContainer.appendChild(wrap);
        }

        // delegação de eventos para checkboxes
        outputsContainer.addEventListener('change', (e) => {
            if (!e.target || e.target.type !== 'checkbox') return;
            const sel = getSelectedOutputs();
            if (sel.length > 0) {
                drawMultipleOutputs(sel);
                exibirResultadosSeparados(sel);
                atualizarMetricasMultiplas(sel);
                if (outputsCount) outputsCount.textContent = String(sel.length);
            } else {
                drawBackgroundOnly();
                if (resultadosContainer) resultadosContainer.innerHTML = '';
                if (outputsCount) outputsCount.textContent = String(0);
            }
        });

        // filtro de busca
        if (outputsFilter) {
            outputsFilter.addEventListener('input', e => {
                const q = e.target.value.trim().toLowerCase();
                outputsContainer.querySelectorAll('.output-item').forEach(el => {
                    const key = el.dataset.key.toLowerCase();
                    el.style.display = key.includes(q) ? '' : 'none';
                });
            });
        }
    }
});