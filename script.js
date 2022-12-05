'use strict';
//Спрашиваем клиента и заносим данные
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать','Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа');
const rollback = 30; //Откат 30%
const adaptive = !!prompt('Нужен ли адаптив на сайте', 'OK - да, Отмена - нет');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой еще дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = +(screenPrice + servicePrice1 + servicePrice2);  
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));

//Выводим данные

console.log('Проект: ' + title);
console.log('Типы экранов: ' + screens);
console.log('Адаптив: ' + adaptive);
console.log('Доп услуга 1: ' + service1 + ' Цена: ' + servicePrice1);
console.log('Доп услуга 2: ' + service2 + ' Цена: ' + servicePrice2);
console.log('Итоговая стоимость: ' + fullPrice);
console.log('Итоговая стоимость с учетом отката: ' + servicePercentPrice);


// Скидки
switch(true){
    case fullPrice > 30000 || fullPrice === 30000:
        console.log('Даем скидку 10%');
        break
    case 15000 < fullPrice && fullPrice < 30000 || fullPrice === 15000:
        console.log('Даем скидку 5%');
        break
    case 0 < fullPrice && fullPrice < 15000 || fullPrice === 0:
        console.log('Скидка не предусмотрена');
        break
    case fullPrice < 0:
        console.log('Что то пошло не так');
    }

