// Este código permite adicionar múltiplos nomes e valores ao select
window.onload = function() {
	const nomeInput = document.getElementById('nomeInput');
	const valorInput = document.getElementById('valorInput');
	const addButton = document.getElementById('addButton');
	const select = document.getElementById('selector');

	addButton.addEventListener('click', function() {
		const nome = nomeInput.value.trim();
		const valor = valorInput.value.trim();
		if (nome && valor) {
			const option = document.createElement('option');
			option.value = valor;
			option.text = nome;
			select.appendChild(option);
			nomeInput.value = '';
			valorInput.value = '';
			nomeInput.focus();
		}
	});
}


const valores = [
	{"Pos": 1, "Valor": {"X": 200, "Y": 300}},
	{"Pos": 2, "Valor": {"X": 300, "Y": 100}},
	{"Pos": 3, "Valor": {"X": 150, "Y": 700}}
]

