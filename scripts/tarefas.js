//constantes
const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const btnCancelAddTask = document.querySelector('#cancelAddTask');
const inputTaskDescription = document.querySelector('.app__form-textarea');
const tasksList = document.querySelector('.app__section-task-list');
const displayCurrentTask = document.querySelector('.app__section-active-task-description');
const btnRemoveTasksComplete = document.querySelector('#btn-remover-concluidas');
const btnRemoveAllTasks = document.querySelector('#btn-remover-todas');

//variáveis
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	//se o localStorage estiver vazio será criado um array vazio → || []
let currentTask = null;
let currentTaskLi = null;

//listener abrir formulário de nova tarefa
btnAddTask.addEventListener('click', () => {
	formAddTask.classList.toggle('hidden');
});

//listener cancelar adição de tarefa
btnCancelAddTask.addEventListener('click', (event) => {
	if (event.target.classList.contains('app__form-footer__button--cancel')) {
		inputTaskDescription.value = '';
		formAddTask.classList.add('hidden');
	}
});

//listener salvar tarefa
formAddTask.addEventListener('submit', (event) => {
	event.preventDefault();

	let savedTask = saveTask(); //salva a tarefa em localStorage, retorna a tarefa salva

	displayTask(savedTask);	//gera o HTML e exibe a tarefa na tela

	inputTaskDescription.value = ''; //limpa o input

	formAddTask.classList.add('hidden'); //oculta o formulário
});

//função para salvar nova tarefa
function saveTask() {
	let task = {
		description: inputTaskDescription.value
	}
	
	tasks.push(task);	
	
	saveLocalStorage();
	
	inputTaskDescription.value = '';

	return task;
}

//função para salvar tarefas no localStorage
function saveLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//função para exibir tarefas
function displayTask(task) {
	let formatedTask = formatTask(task);
	tasksList.append(formatedTask);
}

//função para carregar tarefas salvas em localStorage
function loadTask() {
	tasks.forEach(task => {
		displayTask(task);
	});	
}

//função para montar o HTML da tarefa
function formatTask(task) {
	const li = document.createElement('li');
	li.classList.add('app__section-task-list-item');

	const svg = document.createElement('svg');
	svg.innerHTML = `
		<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
	`;

	const p = document.createElement('p');
	p.textContent = task.description;
	p.classList.add('app__section-task-list-item-description')

	const button = document.createElement('button');
	button.classList.add('app_button-edit');

	//botão de editar tarefa
	button.onclick = (event) => {
		event.stopPropagation(); // Impede que o clique seja apenas no botão e não no <li>

		let newDescription = prompt('Digite o novo nome da tarefa');
		if (newDescription === '') {
			alert('Digite um nome válido');
		} else if (newDescription) {
			p.textContent = newDescription;
			task.description = newDescription;
			saveLocalStorage();
		}
	}

	const img = document.createElement('img');
	img.setAttribute('src', './imagens/edit.png');

	button.append(img);
	li.append(svg);
	li.append(p);
	li.append(button);

	//verificação se a tarefa já foi concluída
	if (task.complete) {
		li.classList.remove('app__section-task-list-item-active');
		li.classList.add('app__section-task-list-item-complete');
		button.setAttribute('disabled', 'true');
	} else {
		li.onclick = () => {
			if (li.classList.contains('app__section-task-list-item-active')) {
				li.classList.remove('app__section-task-list-item-active');
				displayCurrentTask.textContent = '';
				currentTask = null;
			} else {
				displayCurrentTask.textContent = task.description;
				document.querySelectorAll('.app__section-task-list-item-active')
					.forEach(element => {
						element.classList.remove('app__section-task-list-item-active');
					})
				li.classList.add('app__section-task-list-item-active');
	
				currentTask = task;
				currentTaskLi = li;
			}
		}
	}

	return li;
}

//conclusão de tarefa - evento FocoFinalizado
document.addEventListener('FocoFinalizado', () => {
	if (currentTaskLi) {
		currentTaskLi.classList.remove('app__section-task-list-item-active');
		currentTaskLi.classList.add('app__section-task-list-item-complete');
		currentTaskLi.querySelector('button').setAttribute('disabled', 'true');
		currentTaskLi.onclick = null;
		displayCurrentTask.textContent = '';
		currentTask.complete = true;
		saveLocalStorage();
	}
});

//remover tarefas concluídas
btnRemoveTasksComplete.onclick = () => {
	removeTasks();
}

//remover todas as tarefas
btnRemoveAllTasks.onclick = () => {
	removeTasks('all');
}

function removeTasks(mode) {
	tasks = mode === 'all' ? [] : tasks.filter(task => !task.complete);
	tasksList.innerHTML = '';
	saveLocalStorage();
	loadTask();
}

//carregar e exibir tarefas ao iniciar
loadTask();