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
const cmsBox = document.getElementById('cms-open')
const cmsOpen = document.querySelector('.hidden-cms-variants')
const cmsOther = cmsOpen.querySelector('.main-controls__input')

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
    priceWP: 0,
    fullPrice: 0,
    cmsPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function(){
        this.addTitle()
        this.cmsBlock()
        cancel.addEventListener('click', this.fullReset.bind(this))
        rollbackInput.addEventListener('input', this.getRollback.bind(this))
        calc.addEventListener('click', this.start.bind(this))
        addBtn.addEventListener('click', this.addScreenBlock)
        
    },
    checkResult: function(){
        if (totalPrice.value != '0'){
            cancel.style.display = 'block'
            calc.style.display = 'none'
            this.stopInput()
        } else {
            cancel.style.display = 'none'
        }
    },
    stopInput: function() {
        selectInput = document.querySelectorAll('.main-controls__item.screen select')
        numScreen = document.querySelectorAll('.main-controls__item.screen input')
        selectInput.forEach(select => select.disabled = true)
        numScreen.forEach(input => input.disabled = true)
    },

    fullReset: function() {
        screens = document.querySelectorAll('.screen')
        selectInput = document.querySelectorAll('.main-controls__item.screen select')
        numScreen = document.querySelectorAll('.main-controls__item.screen input')
        checkBox = document.querySelectorAll('input[type=checkbox]')

        selectInput.forEach(select => select.disabled = false)
        numScreen.forEach(input => input.disabled = false)

        for (let i = 1; i < screens.length; i++) {
            screens[i].remove()
        }

        selectInput.forEach(select => {select.selectedIndex = 0})
        numScreen.forEach(input => {input.value = ''})
        checkBox.forEach(checkbox => {checkbox.checked = false})
        cmsOpen.style.display = 'none'

        priceTotal.value = 0,
        totalServicePrice.value = 0,
        totalPricePercent.value = 0,
        totalPrice.value = 0,
        screensNumber.value = 0,
        this.screens = [],
        this.screenPrice = 0,
        this.screenCount = 0,
        this.adaptive = true,
        this.rollback = 0,
        this.priceWP = 0,
        this.cmsPrice = 0,
        this.servicePricesPercent = 0,
        this.servicePricesNumber = 0,
        this.servicePercentPrice = 0,
        this.fullPrice = 0,
        this.servicesPercent = {},
        this.servicesNumber = {},
        cancel.style.display = 'none',
        calc.style.display = 'block',
        rollbackInput.value = 0
        rollbackValue.textContent = 0
    },

    getRollback: function() {
            rollbackValue.textContent = rollbackInput.value + ' %'
            totalPricePercent.value = Math.ceil(this.fullPrice - (this.fullPrice * rollbackInput.value/100)) 
            this.rollback = rollbackInput.value    
    },

    addTitle: function() {
        document.title = title.textContent
    },
    start:  function() {
        this.checkResult()
        this.addScreens()
        this.addServices()
        this.addPrice()
        this.showResult()
        this.checkResult()

    },
    showResult:  function() {
        priceTotal.value = this.screenPrice
        totalServicePrice.value = this.servicePricesPercent + this.servicePricesNumber
        totalPricePercent.value = this.servicePercentPrice
        totalPrice.value = this.fullPrice

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
        percentItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }            
        })
        numberItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }            
        })
    },
    addScreenBlock: function() {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        cloneScreen.querySelector('input[type=text]').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },
    //Блок  по CMS
    cmsBlock: function() {
        cmsBox.addEventListener('change', (e) => {
            e.target.checked ? cmsOpen.style.display = 'flex' : cmsOpen.style.display = 'none'                   
        } )
        const cmsSelect = document.getElementById('cms-select')
        cmsSelect.addEventListener('change', (e) => {
            e.target.value == 'other' ? cmsOther.style.display = 'flex' : cmsOther.style.display = 'none'
            e.target.value == 50 ? this.priceWP = 2 : this.priceWP = 0
        })           
    },
    // Суммируем стоимость экранов и доп услуг
    addPrice: function() {
        screens = document.querySelectorAll('.screen')
        for (let screen of this.screens) {
            this.screenCount += +screen.count
        }
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }
        for(let key in this.servicesNumber) {
                this.servicePricesNumber += this.servicesNumber[key]
            }
        for(let key in this.servicesPercent) {
                this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100)
            }
            if (this.priceWP != 0) {
                this.cmsPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber
                this.fullPrice = this.cmsPrice/this.priceWP + this.cmsPrice
            } else {this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber}        
        this.servicePercentPrice =  Math.ceil(this.fullPrice - this.fullPrice * this.rollback/100)
        screensNumber.value = this.screenCount
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
