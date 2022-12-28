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
const totalServicePrice = document.getElementsByClassName('total-input')[2]
const totalPrice = document.getElementsByClassName('total-input')[3]
const totalPricePercent = document.getElementsByClassName('total-input')[4]
let screens = document.querySelectorAll('.screen')
let selectInput = document.querySelectorAll('.main-controls__item.screen select');
let numScreen = document.querySelectorAll('.main-controls__item.screen input');
let checkBox = document.querySelectorAll('input[type=checkbox]')

const appData = {
    //Объявляем переменные
    title: '',
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0,
    fullPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function(){
        this.addTitle()
        rollbackInput.addEventListener('input', appData.getRollback)
        calc.addEventListener('click', appData.start)
        addBtn.addEventListener('click', appData.addScreenBlock)
        cancel.addEventListener('click', appData.fullReset)
    },
    checkResult: function(){
        if (totalPrice.value != '0'){
            cancel.style.display = 'block'
            calc.style.display = 'none'
        } else {
            cancel.style.display = 'none'
        }
    },
    fullReset: function() {
        screens = document.querySelectorAll('.screen')
        selectInput = document.querySelectorAll('.main-controls__item.screen select')
        numScreen = document.querySelectorAll('.main-controls__item.screen input')
        checkBox = document.querySelectorAll('input[type=checkbox]')

        screens.forEach( function() {if (screens.length > 1) {screens[0].remove()}} )

        selectInput.forEach(select => {select.selectedIndex = 0})
        numScreen.forEach(input => {input.value = ''})
        checkBox.forEach((checkbox) => {checkbox.checked = false})

        priceTotal.value = 0,
        totalServicePrice.value = 0,
        totalPricePercent.value = 0,
        totalPrice.value = 0,
        screensNumber.value = 0,
        appData.screens = [],
        appData.screenPrice = 0,
        appData.screenCount = 0,
        appData.adaptive = true,
        appData.rollback = 0,
        appData.servicePricesPercent = 0,
        appData.servicePricesNumber = 0,
        appData.servicePercentPrice = 0,
        appData.fullPrice = 0,
        appData.servicesPercent = {},
        appData.servicesNumber = {},
        cancel.style.display = 'none'
        calc.style.display = 'block'
        appData.screens.splice(0)
        console.log(screens);

    },

    getRollback: function() {
            rollbackValue.textContent = rollbackInput.value + ' %'
            totalPricePercent.value = Math.ceil(appData.fullPrice - (appData.fullPrice * rollbackInput.value/100)) 
            appData.rollback = rollbackInput.value    
    },

    addTitle: function() {
        document.title = title.textContent
    },
    start:  function() {
        appData.checkResult()
        appData.addScreens()
        appData.addServices()
        appData.addPrice()
        appData.showResult()
        appData.checkResult()

    },
    showResult:  function() {
        priceTotal.value = appData.screenPrice
        totalServicePrice.value = appData.servicePricesPercent + appData.servicePricesNumber
        totalPricePercent.value = appData.servicePercentPrice
        totalPrice.value = appData.fullPrice

    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen')
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            if (input.value !== '' && select.value !== '') {
                appData.screens.push({
                    id: index, 
                    name: selectName, 
                    price: +select.value * +input.value,
                    count: +input.value})
            } else {appData.screens.splice(0)}
            
        })
    },
    addServices: function() {
        percentItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }            
        })
        numberItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }            
        })
    },
    addScreenBlock: function() {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        cloneScreen.querySelector('input[type=text]').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },
    // Суммируем стоимость экранов и доп услуг
    addPrice: function() {
        for (let screen of appData.screens) {
            appData.screenCount += +screen.count
        }
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for(let key in appData.servicesNumber) {
                appData.servicePricesNumber += appData.servicesNumber[key]
            }
        for(let key in appData.servicesPercent) {
                appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100)
            }

        appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber
        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - appData.fullPrice * appData.rollback/100)
        screensNumber.value = appData.screenCount
    },
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
    }
    
    
    
}

appData.init()
