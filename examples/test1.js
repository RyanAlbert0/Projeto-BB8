

window.onload = function() {
    const tempo = document.getElementById("tempo").value
    const dific = document.getElementById("dific").value
    const local = document.getElementById("local").value
    const idloc = document.getElementById("idloc")
    const button = document.getElementById("addButton")

    button.addEventListener('click', () => {
    if (local == 1){
        if (idloc == 1){
            point = coordinates[1]
            console.log(point)
        }
    }
    // else if (local == 2){

    // }
    // else{

    // }
        

    });



}




 const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            const inputValue = document.getElementById('local');
            const selectValue = document.getElementById('id');

            const coordinates = [
                { x: 126, y: 107 },
                { x: 60, y: 400 },
                { x: 630, y: 80 },
                { x: 650, y: 500 },
                { x: 820, y: 975 },
                { x: 1150, y: 970 },
                { x: 1185, y: 520 },
                { x: 1320, y: 475 },
                { x: 1280, y: 50 },
                { x: 1530, y: 60 },
                { x: 1780, y: 140 },
                { x: 1830, y: 450 },
            ]

            if(inputValue == 1 && selectValue == 1){
                console.log("Valor 1 selecionado");
            }

            // Pontos fixos
            const points = [

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
                        // se já existir, remove para mover para o fim (garante ordem atual)
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

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Desenha pontos
                points.forEach((point, i) => {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
                    ctx.fillStyle = ['blue', 'green', 'orange', 'red', 'purple', 'brown'][i % 6];
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

            // desenha inicial (nenhum selecionado)
            draw();