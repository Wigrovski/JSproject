'use strict'
//Объявляем переменные
let title 
let screens
let screenPrice = 0
let adaptive
let rollback = 30; //Откат 30%
let allServicePrices
let servicePercentPrice
let fullPrice
let service1
let service2 

//Проверка на число
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

// Спрашиваем пользователя
const asking = function() {
    title = prompt('Как называется ваш проект?', 'Проект')
    screens = prompt('Какие типы экранов нужно разработать','Простые, Сложные, Интерактивные')
    while (screenPrice < 1) {
        screenPrice = prompt('Сколько будет стоить данная работа')
    }
    while (!isNumber(screenPrice)){
        screenPrice = prompt('Сколько будет стоить данная работа')
    }
    screenPrice = +screenPrice.trim() // Усложненное задание №1 (получаем число без пробелов)   
    adaptive = !!confirm('Нужен ли адаптив на сайте')
}



//Сумма всех доп услуг
const getAllServicePrices = function() {
    let sum = 0
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            service2 = prompt('Какой еще дополнительный тип услуги нужен?')        
        }
        
        sum += +prompt('Сколько это будет стоить?')
        while (!isNumber(sum)) {
            sum = +prompt('Сколько это будет стоить?')
        }
    }

    return sum
}

//Сумма стоимости верстки и стоимости дополнительных услуг
function getFullPrice() {
    return screenPrice + allServicePrices
}

//Переводим title в нормальный вид и обрезаем пробелы вначале
const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.slice(1).toLowerCase()
}

// Итоговая стоимость за вычетом процента отката
const getServicePercentPrices = () => {return Math.ceil(fullPrice - (fullPrice * (rollback/100)))};

//Типы данных
const showTypeOf = (v) => {console.log(v, typeof v);};

// Скидки
const getRollbackMessage = function(price) {
    switch(true){
        case price > 30000 || price === 30000:
            return 'Даем скидку 10%';
        case 15000 < price && price < 30000 || price === 15000:
            return 'Даем скидку 5%';
        case 0 < price && price < 15000 || price === 0:
            return 'Скидка не предусмотрена';
        case price < 0:
            return 'Что то пошло не так';
        }
};


asking()
title = getTitle()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();


//Выводим данные
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
showTypeOf(allServicePrices);
console.log(allServicePrices);
console.log(servicePercentPrice);
console.log('Итоговая стоимость: ' + fullPrice + ' руб');
console.log('Итоговая стоимость с учетом отката: ' + servicePercentPrice + ' руб');
alert(getRollbackMessage(fullPrice));

