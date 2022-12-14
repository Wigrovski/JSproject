'use strict'

const titleHead = document.getElementsByTagName('h1')[0]
const calc = document.getElementsByClassName('handler_btn')[0]
const cancel = document.getElementsByClassName('handler_btn')[1]
const addBtn = document.querySelector('.screen-btn')
const percentItems = document.querySelectorAll('.percent')
const numberItems = document.querySelectorAll('.number')
const rollbackInput = document.querySelector('input[type="range"]')
const rollbackValue = document.querySelector('.range-value')
const priceTotal = document.getElementsByClassName('total-input')[0]
const screensNumber = document.getElementsByClassName('total-input')[1]
const servicePrice = document.getElementsByClassName('total-input')[2]
const totalPrice = document.getElementsByClassName('total-input')[3]
const totalPricePercent = document.getElementsByClassName('total-input')[4]
let screenItems = document.querySelectorAll('.screen')

const appData = {
    //Объявляем переменные
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 30, //Откат 30%
    allServicePrices: 0,
    servicePercentPrice: 0,
    fullPrice: 0,
    services: {},
    start:  function() {
        appData.asking()
        appData.addPrice()
        appData.getTitle()
        appData.getFullPrice()
        appData.getServicePercentPrices()
        appData.logger()
    },
    // Спрашиваем пользователя
    asking: function() {
        //Запрос название и его проверка на строку и цифры
        do {
        } while (!/\w|[а-я]/iu.test(appData.title = prompt('Как называется ваш проект?')) || appData.isNumber(appData.title))
        //Типы экранов и их цена
        for (let i = 0; i < 2; i++) {
            let name = ''
            let price = 0
            do {
                name = prompt('Какие типы экранов нужно разработать')
            } while (!/\w|[а-я]/iu.test(name) || appData.isNumber(name))
            do {
                price = +prompt('Сколько будет стоить данная работа')
            }  while (!appData.isNumber(price))
            appData.screens.push({id: i, name, price})
        }
        //Дополнительные услуги и их цена
        for (let i = 0; i < 2; i++) {
            let name = ''
            let price = 0
            do {
                name = [i] + ' ' + prompt('Какой дополнительный тип услуги нужен?') // Добавляем индификатор для одиннаковых услуг
            } while (!/\w|[а-я]/iu.test(name) || appData.isNumber(name))
            do {
                price = +prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price)) 
            appData.services[name] = +price
        }
        appData.adaptive = !!confirm('Нужен ли адаптив на сайте')
    },
    // Суммируем стоимость экранов и доп услуг
    addPrice: function() {
        appData.screenPrice = appData.screens.reduce(function(sum, item){
            return sum + item.price}, 0) //Суммируем через Reduce
        for(let key in appData.services) {
                appData.allServicePrices += appData.services[key]
            }
    },
    //Проверка на число
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    //Сумма стоимости верстки и стоимости дополнительных услуг
    getFullPrice: function() {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
    },
    //Переводим title в нормальный вид и обрезаем пробелы вначале
    getTitle: function() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.slice(1).toLowerCase()
    },
    // Итоговая стоимость за вычетом процента отката
    getServicePercentPrices: function() {
        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))},
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
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrice)
        console.log(appData.screens)
        console.log(appData.services)
    }
    
}

appData.start()
