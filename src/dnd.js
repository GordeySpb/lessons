/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    };

    const getRandomInt = (min = 50, max = 200) => {
        return Math.floor(Math.random() * (max - min)) + min + 'px';
    }



    const element = document.createElement('div');

    element.className = 'draggable-div';
    element.style.backgroundColor = getRandomColor();
    element.style.width = getRandomInt();
    element.style.height = getRandomInt();
    element.style.position = 'absolute';
    element.style.top = getRandomInt()
    element.style.left = getRandomInt()

    return element
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    




    target.addEventListener('mousedown', e => {
        const coords = getCoords(target);
        const shiftX = e.pageX - getCoords(target).left;
        const shiftY = e.pageY - getCoords(target).top;


        
        

        const moveAt = e => {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';

        };

        moveAt(e)

        document.onmousemove = e => {
            moveAt(e);
        };
    
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };

        target.ondragstart = () => {
            return false;
        };
        
    });

    const getCoords = elem => {
        const box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    };


}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

/*
 получить координаты дива
 как я понял этот метод нам в этом поможет getBoundingClientRect

повесить обработчик на див mousedown
написать функцию которая будет перетаскивать наш див по координатной оси

при перетаскивании див должен по клику прилипать к элементу
по другому отлипать

див должен остаться в координатах там где оставили курсор


 */