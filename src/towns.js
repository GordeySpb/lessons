import {
    resolve
} from "dns";
import {
    rejects
} from "assert";

/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
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
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

    //сортировка городов

    const compareTowns = (a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;

    };

    // отправка запроса

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status <= 400) {
                const response = JSON.parse(xhr.response);

                response.sort(compareTowns);
                resolve(response);
            } else {
                reject();
            }
        });
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    

    if (full.indexOf(chunk) + 1) {
        return true
    } else {
        return false
    }

    //еще один способ проверки подстроки в строке
    //full.includes(chunk)
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
let cityArr = [];

// Если загрузка успешная
const success = (response) => {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
    cityArr = response;
};

//Если загрузка не успешная
const eror = () => {
    // loadingBlock.style.display = 'block';
    // filterBlock.style.display = 'none';
    // alert('Не удалось загрузить города');

    let button = document.createElement('button');
    button.innerHTML = 'Повторить';
    loadingBlock.innerHTML = 'Не удалось загрузить города...';
    loadingBlock.appendChild(button);

    button.addEventListener('click', () => {
        loadingBlock.innerHTML = 'Загрузка...'
        
    });
}

loadTowns()
    .then(success, eror)
    .catch(eror)


filterInput.addEventListener('keyup', function (e) {
    let substring = e.target.value;
    filterResult.innerHTML = '';

    for (const elem of cityArr) {
        if(isMatching(elem.name, substring)) {
            let div = document.createElement('div');

            div.innerText = elem.name;
            filterResult.appendChild(div);
        }
        
    }

});

export {
    loadTowns,
    isMatching
};

