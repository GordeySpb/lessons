/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


filterNameInput.addEventListener('keyup', function (e) {
    const filterInputValue = e.target.value;
    const filtersCookies = getFilteredCookies(filterInputValue);

    renderCookies(filtersCookies)


});



//создаем обьект с нашими созданными куками

const getCookie = () => {

    if (!(document.cookie)) return null;

    return document.cookie.split('; ').reduce((prevVal, curentVal) => {
        let [name, value] = curentVal.split('=');
        prevVal[name] = value;
        return prevVal;
    }, {})
};





const renderCookies = (cookies) => {
    //создаем таблицу и кнопку удаления
    listTable.innerHTML = '';



    for (let name in cookies) {

        let tr = document.createElement('tr');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Удалить';
        deleteButton.setAttribute('data-name', name);

        //записываем в таблицу имя и значение куки

        tr.innerHTML = `<td>${name}</td><td>${cookies[name]}</td>`;
        tr.appendChild(deleteButton)
        listTable.appendChild(tr)
    }



};

//добавление куки

const addCooki = (name, value) => {

    document.cookie = `${name}=${value}`;

};

//удаление куки из браузера

const deleteCookie = (name) => {

    document.cookie = `${name}=;expires=${new Date(0)}`;
};

//удаление куки из таблицы

listTable.addEventListener('click', (e) => {

    if (e.target.tagName !== 'BUTTON') return

    const tr = e.target.closest('tr');
    const name = e.target.getAttribute('data-name');

    listTable.removeChild(tr)

    deleteCookie(name)

});

//фильтрация куки

const getFilteredCookies = (filterValue) => {
    const allCookies = document.cookie.split('; ').reduce((prevVal, curentVal) => {
        let [name, value] = curentVal.split('=');
        prevVal[name] = value;
        return prevVal;
    }, {})


    const filteredCookies = {};
    for (let name in allCookies) {
        if (name.includes(filterValue) || allCookies[name].includes(filterValue)) {
            filteredCookies[name] = allCookies[name];

        }
    }

    return filteredCookies;
};




addButton.addEventListener('click', () => {

    const name = addNameInput.value;
    const value = addValueInput.value;

    addCooki(name, value)
    console.log(filterNameInput.value)

    if (filterNameInput.value === '') {
        const cookies = getCookie();
        renderCookies(cookies);
    } else {
       const filteredCookies = getFilteredCookies(filterNameInput.value);
       renderCookies(filteredCookies)

    }



    addNameInput.value = '';
    addValueInput.value = '';
});

const cookies = getCookie();
renderCookies(cookies)