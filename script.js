const title = 'JSproject';
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1000;
const rollback = 30;
const fullPrice = 1000000;
const adaptive = true;


console.log(typeof(title));
console.log(typeof(fullPrice));
console.log(typeof(adaptive));
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
console.log('Стоимость верстки экранов ' + fullPrice + ' рублей/долларов/гривен/юани');
console.log(screens.toLocaleLowerCase().split(", "));
console.log("Процент отката посреднику за работу: " + fullPrice * (rollback/100));
