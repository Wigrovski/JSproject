'use strict'

const appData = {
    //Объявляем переменные
    title: '', 
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 30, //Откат 30%
    allServicePrices: 0,
    servicePercentPrice: 0,
    fullPrice: 0,
    service1: '',
    service2: '',
    // Спрашиваем пользователя
    asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Проект')
        appData.screens = prompt('Какие типы экранов нужно разработать','Простые, Сложные, Интерактивные')
        while (appData.screenPrice < 1) {
            appData.screenPrice = prompt('Сколько будет стоить данная работа')
        }
        while (!appData.isNumber(appData.screenPrice)){
            appData.screenPrice = prompt('Сколько будет стоить данная работа')
        }
        appData.screenPrice = +appData.screenPrice.trim()
        appData.adaptive = !!confirm('Нужен ли адаптив на сайте')
    },
    //Проверка на число
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    //Сумма всех доп услуг
    getAllServicePrices: function() {
    let sum = 0
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            appData.service2 = prompt('Какой еще дополнительный тип услуги нужен?')        
        }
        
        sum += +prompt('Сколько это будет стоить?')
        while (!appData.isNumber(sum)) {
            sum = +prompt('Сколько это будет стоить?')
        }
    }
    return sum
    },
    //Сумма стоимости верстки и стоимости дополнительных услуг
    getFullPrice: function() {
    return appData.screenPrice + appData.allServicePrices
    },
    //Переводим title в нормальный вид и обрезаем пробелы вначале
    getTitle: function() {
    return appData.title.trim()[0].toUpperCase() + appData.title.slice(1).toLowerCase()
    },
    // Итоговая стоимость за вычетом процента отката
    getServicePercentPrices: function() {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))},
    // Скидки
    getRollbackMessage: function(price) {
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
    },
    logger: function() {
        for (let key in appData){
            console.log(key);
        }
    },
    start:  function() {
        appData.asking()
        appData.title = appData.getTitle()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice()
        appData.servicePercentPrice = appData.getServicePercentPrices()
        appData.logger()
    }
}

appData.start()
