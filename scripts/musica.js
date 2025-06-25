//checkbox da musica
const checkboxMusica = document.getElementById('alternar-musica');

//musica
const musica = new Audio('./sons/luna-rise-part-one.mp3');

//ativa o loop da musica
musica.loop = true;

//listener do checkbox
checkboxMusica.addEventListener('change', ()=> {
	if (checkboxMusica.checked) {
		musica.play();
	} else {
		musica.pause();
	}
});