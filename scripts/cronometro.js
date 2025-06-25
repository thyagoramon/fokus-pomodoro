//constantes
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnCancel = document.getElementById('cancel');
const displayTimer = document.getElementById('timer');

//variáveis
let pomodoroMode = 'foco';
let pomodoroStatus = 'inativo';
let tempo = 25;
let contagem;
let segundosRestante;

//sons
const audioPlay = new Audio('/sons/play.wav');
audioPlay.volume = 0.33;

const audioPause = new Audio('/sons/pause.mp3');
audioPause.volume = 0.33;

const audioEnd = new Audio('/sons/beep.mp3');
audioEnd.volume = 0.33;

//execução inicial
atualizarModo();
exibirTempo();

//listener do botão de iniciar contador regressivo
btnStart.addEventListener('click', () => {
	pomodoroStatus = 'ativo';
	atualizarEstado();
});

//listener do botão de pausar contador regressivo
btnPause.addEventListener('click', () => {
	if (pomodoroStatus === 'ativo') {
		pomodoroStatus = 'pausado'
		atualizarEstado();		
	}	
});

//listener do botão cancelar contador regressivo
btnCancel.addEventListener('click', () => {
	pomodoroStatus = 'inativo'
	atualizarEstado();
});

//função do contador regressivo
function contadorRegressivo() {
	if (segundosRestante > 0) {
		segundosRestante--;		
	} else {		
		pomodoroStatus = 'finalizado';
		atualizarEstado();
	}
	exibirTempo();
}

//função para exibir o tempo na página
function exibirTempo() {
	let minutos = (Math.floor(segundosRestante / 60)).toString().padStart(2, '0');		
	let segundos = (segundosRestante % 60).toString().padStart(2, '0');
		//toString(): converte o número em string
		//padStart(2, '0'): adiciona o 0 no início caso o valor não tenha dois dígitos.
	displayTimer.innerText = `${minutos}:${segundos}`;
}

//função para atualizar o tempo de acordo com o tema
function atualizarModo() {
	switch (pomodoroMode) {
		case 'foco':
			tempo = 25;
			break;
		case 'descanso_curto':
			tempo = 5;
			break;
		case 'descanso_longo':
			tempo = 15;
	}
	segundosRestante = tempo * 60;
}

//função de controle geral
function atualizarEstado() {
	switch (pomodoroStatus) {
		case 'inativo':
			//botões
				ativarBtn(btnStart);
				desativarBtn(btnPause);
				desativarBtn(btnCancel);
				btnStart.innerText = 'Começar';
			//sons
				audioPause.play();
			//cronémetro
				clearInterval(contagem); //para a contagem
				exibirTempo();
			//controle
				atualizarModo(); //reseta o tempo
			break;
		case 'ativo':
			//botões
				desativarBtn(btnStart);
				ativarBtn(btnPause);
				ativarBtn(btnCancel);
				btnStart.innerText = 'Continuar';
			//sons
				audioPlay.play();
			//cronómetro
				contagem = setInterval(contadorRegressivo, 1000); //executa a contagem
			break;
		case 'pausado':
			//botões
				ativarBtn(btnStart);
				desativarBtn(btnPause);
				ativarBtn(btnCancel);
			//sons
				audioPause.play();
			//cronómetro
				clearInterval(contagem); //para a contagem
			break;
		case 'finalizado':
			//botões
				ativarBtn(btnStart);
				desativarBtn(btnPause);
				desativarBtn(btnCancel);
				btnStart.innerText = 'Reiniciar';
			//sons
				audioEnd.play();
			//cronómetro
				clearInterval(contagem); //para a contagem
			//controle
				alert('Tempo finalizado');
				atualizarModo();
			//evento de conclusão de tarefa
				if (pomodoroMode === 'foco') {
					const evento = new CustomEvent('FocoFinalizado'); //cria o evento
					document.dispatchEvent(evento); //dispara o evento
				}
			break;			
	}
}

//funções para mudar estilização dos botões
function ativarBtn(btn) {
	btn.classList.add('btn-on');
	btn.classList.remove('btn-off');
}

function desativarBtn(btn) {
	btn.classList.remove('btn-on');
	btn.classList.add('btn-off');
}