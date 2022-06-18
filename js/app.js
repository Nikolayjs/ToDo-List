
//Элементы интерфейса
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const disc = document.getElementById('disc')

//Имена классов
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Переменные
let LIST, id;

// Получаем элементы из локального хранилища
let data = localStorage.getItem('TODO');
// Проверяем, что данные не пустые
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    //Если данные пустые - создаём
    LIST = [];
    id = 0;
}

//Загружаем данные в пользовательский интерфейс
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Очистка локального хранилища
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})


//Текущая дата
const options = {weekday:'long', month:'long', day:'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);

//Функция To-Do
function addToDo(toDo, id, done, trash,){
    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="remove" id="${id}"></i> 
                </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


//Добавление пунктов
document.addEventListener('keyup', function(even){
    if(even.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            });

            //Добавление пунктов ToDo в локальное хранилище (этот код должен быть добавлен туда, где обновляется LIST)
            localStorage.setItem('TODO', JSON.stringify(LIST));
            id++;
        }
        input.value = '';

    }
});

// Завершенная задача ToDo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Удаление задачи ToDo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Динамеческое создание пунктов ToDo

list.addEventListener('click', function(event){
    const element = event.target; //Возвращение элементов
    const elementJob = element.attributes.job.value; // Завершение или удаление

    if(elementJob == 'complete'){
        completeToDo(element); //завершение задачи
    }
    else if(elementJob == 'remove'){
        removeToDo(element); //удаление задачи
    }


    localStorage.setItem('TODO', JSON.stringify(LIST));
})