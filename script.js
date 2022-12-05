'use strict';
//Спрашиваем клиента и заносим данные
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать','Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа');
const rollback = 30;
const adaptive = !!prompt('Нужен ли адаптив на сайте', 'OK - да, Отмена - нет');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой еще дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = +(screenPrice + servicePrice1 + servicePrice2);  
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback/100));

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





console.log(servicePrice1);
console.log(servicePrice2);
console.log(servicePercentPrice);


// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
// console.log('Стоимость верстки экранов ' + fullPrice + ' рублей/долларов/гривен/юани');
// console.log(screens.toLocaleLowerCase().split(", "));
// console.log("Процент отката посреднику за работу: " + fullPrice * (rollback/100));
