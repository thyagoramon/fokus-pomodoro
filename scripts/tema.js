const html = document.querySelector('html');
const temaBtns = document.querySelectorAll('.app__card-button');
const temaImg = document.getElementById('app__image');
const temaTxt = document.getElementById('app__title');


//listener da mudança de tema
document.addEventListener('click', (event)=> {
	if (event.target.classList.contains('app__card-button')) {
		let tema = event.target.dataset.contexto;
		let botao = event.target;
		
		//controle do cronómetro
		pomodoroMode = tema;
		atualizarModo();
		pomodoroStatus = 'inativo';
		atualizarEstado();
		exibirTempo();

		//mudança do tema
		alterarTema(botao, tema);		
	}
});

//função para alterar tema
function alterarTema(botao, tema) {
	//alterar dataset no HTML
	html.setAttribute('data-contexto', tema);

	//estilização do botão
	temaBtns.forEach((btn) => {
		btn.classList.remove('active');
	});
		
	botao.classList.add('active');
	
	//alterar imagem
	temaImg.src = `/imagens/${tema}.png`;
	
	//alterar texto
	switch (tema) {
		case 'foco':
			temaTxt.innerHTML = `
				Otimize sua produtividade,<br>
				<strong class="app__title-strong">mergulhe no que importa.</strong>
			`;
			break;
		case 'descanso_curto':
			temaTxt.innerHTML = `
				Que tal dar uma respirada?<br>
				<strong class="app__title-strong">Faça uma pausa curta.</strong>
			`;
			break;
		case 'descanso_longo':
			temaTxt.innerHTML = `
				Hora de voltar à superfície,<br>
				<strong class="app__title-strong">Faça uma pausa longa.</strong>
			`;
			break;
	}	
}