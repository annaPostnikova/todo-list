let list = document.querySelector('.todo-list'); //находим элемент-родитель (список задач ul)
let items = list.children; //получаем все дочерние элементы (пункты li) родительского списка
let emptyListMessage = document.querySelector('.empty-tasks'); //красная надпись, которая появляется, когда нету задач
let newItemForm = document.querySelector('.add-form'); //форма, содержащая поле ввода и кнопку добавления новой задачи
let newItemTitle = newItemForm.querySelector('.add-form-input'); //из предыдущей формы находим ПОЛЕ ВВОДА новой задачи
let taskTemplate = document.querySelector('#task-template').content; //шаблон, куда будет записываться новая задача
let newItemTemplate = taskTemplate.querySelector('.todo-list-item'); //в этом шаблоне находим элемент li, в него будет записываться задача

//функция на появление красной надписи 
let toggleEmptyListMessage = function () {
  //если дочерних элементов ноль (т.е. длина HTML коллекции равна нулю), то класс, скрывающий надпись, удаляется
  if (items.length === 0) {
    emptyListMessage.classList.remove('hidden');
  } else {
    emptyListMessage.classList.add('hidden');
  }
};

//эта функция на удаление элемента из списка
let addCheckHandler = function (item) {
  //находим кнопку с крестиком
  let delite = item.querySelector('.todo-list-delite');
    //при клике на эту кнопу, элемент списка удаляется
    delite.addEventListener('click', function () {
        item.remove();        
        toggleEmptyListMessage(); //элемент удалился, надо проверить, сколько их осталось, чтобы если что вывести красную надпись
    });
};

//функция, которая перечеркивает выполненные задачи
let taskComplete = function (item) {
  let complete = item.querySelector('.todo-list-input'); //находим существующие задачи
  //событие срабатывает при изменении состояния чекбокса
  complete.addEventListener('change', function () {
      //проверяю, есть ли уже у задачи класс, который перечеркивает ее
      if (item.classList.contains('complete')) {
        item.classList.remove('complete'); //если класс есть, то при снятии галочки мы его удаляем
      } else {        
        item.classList.add('complete'); //если класса не было, то добавляем и выполненная задача перечеркивается
      }
  });
};

//этот цикл нужен, чтобы вызывать функции с КАЖДЫМ элементом коллекции
for (var i = 0; i < items.length; i++) {
  addCheckHandler(items[i]);
  taskComplete(items[i]);
}

//обработчик при отправке формы (при нажатии на кнопку)
newItemForm.addEventListener('submit', function (evt) {  
  evt.preventDefault(); //отменяем базовую фнкцию кнопки (отправку данных) и создаем на кнопку свои действия
  
  let taskText = newItemTitle.value; //сохраняем в переменную данные, полученные из поля ввода
  let task = newItemTemplate.cloneNode(true); //сохраняем в переменную клонированный элемент со всеми вложениями
  let taskDescription = task.querySelector('span'); //находим в клонированном элементе, куда запишем полученные данные из поля ввода
  taskDescription.textContent = taskText; //записываем данные из поля ввода в клонированный элемент, т.е. создаем новый элемент списка
  addCheckHandler(task); //передаем новый элемент в функцию, чтобы он появлялся на странице со всем функционалом
  taskComplete(task); // то же самое

  list.appendChild(task); //теперь записываем новый элемент в родительский ul и тут он повляется на странице
  newItemTitle.value = ''; //очищаем поле ввода, после того, как элемент появился на странице
  toggleEmptyListMessage(); //проверка, что элементов не ноль, и красную надпись надо убрать 
});

let upButton = document.querySelector('.up-button'); //находим кнопку для прокрутки

window.onscroll = function () { //обработчик срабатывает, когда страницу прокручивают
  if (window.pageYOffset > 32) { //выводила значения в консоль и убедилась, что на моем экране полоса прокрутки появляется поле 32px
    upButton.classList.add('shown'); //появляется кнопка
  } else {
    upButton.classList.remove('shown'); 
  }
};

upButton.onclick = function () {
  window.scrollTo(0, 0); //при возвращении к началу, она исчезает
};