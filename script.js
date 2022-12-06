'use strict';
//Спрашиваем клиента и заносим данные
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать','Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа');
const rollback = 30; //Откат 30%
const adaptive = !!confirm('Нужен ли адаптив на сайте');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой еще дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

//Сумма всех доп услуг через function expression
const getAllServicePrices = function() {return servicePrice1 + servicePrice2};
const allServicePrices = getAllServicePrices();

//Сумма стоимости верстки и стоимости дополнительных услуг через function declaration
function getFullPrice(screenPrice, allServicePrices) {
        return screenPrice + allServicePrices;
}
const fullPrice = getFullPrice(screenPrice, allServicePrices);
 
//Переводим title в нормальный вид и обрезаем пробелы вначале
const getTitle = (e) => {
    e  = title.trimStart(); 
    return e[0].toUpperCase() + e.slice(1).toLowerCase();
};

// Итоговая стоимость за вычетом процента отката
const getServicePercentPrices = () => {return Math.ceil(fullPrice - (fullPrice * (rollback/100)))};
const servicePercentPrice = getServicePercentPrices(); 

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

//Выводим данные
showTypeOf(getTitle(title));
showTypeOf(screens);
console.log('Итоговая стоимость: ' + fullPrice);
console.log('Итоговая стоимость с учетом отката: ' + servicePercentPrice);
alert(getRollbackMessage(fullPrice));

