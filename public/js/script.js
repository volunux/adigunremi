var insertActor = document.getElementById('insertactor');

insertActor.addEventListener('click', (e) => {

	e.preventDefault();

var addActor = document.querySelector('.actor-add-list');

var formGroup = document.querySelector('.form-group');

var cloneActor = formGroup.cloneNode(true);

addActor.appendChild(cloneActor);
	
})

