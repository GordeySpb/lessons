/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    };
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array))
    };

    return newArr;




}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prevVal,
        i;

    if (initial === undefined) {
        prevVal = array[0];
        i = 1;

    } else {
        prevVal = initial;
        i = 0;
    }

    for (i; i < array.length; i++) {
        prevVal = fn(prevVal, array[i], i, array);
    }

    return prevVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = [];

    for (let key in obj) {
        arr.push(key.toUpperCase());
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

    let res = [];

    if (from === undefined) {
        from = 0;
    };

    if (from < 0) {
        from = array.length + from;
    };

    if (to === undefined) {
        to = array.length;
    };

    if (to > array.length) {
        to = array.length;
    };


    if (to < 0) {
        to = array.length + to;
    };

    for (let i = from; i < to; i++) {

        if (array[i]) {
            res.push(array[i])
        };

    };

    return res;

}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {

        set(target, prop, val) {
            target[prop] = val * val

            return true
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};