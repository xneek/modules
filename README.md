# Modules

Простейшая библиотека для асинхронного подключения .js и .css файлов на HTML страницу
### Пример
Модули в рамках данной библиотеки рассматриваются как совокупность файлов скриптов (.js) и стилей (.css).
Подключение модулей происходит асинхронно и возможно в любом месте кода и в люой момент времени,
обратная связь модуля инициализируется после загрузки всех файлов модуля и зависимостей, если таковые имеются

Пример подключени/использования модуля в коде:
```javascript
modules.use('toastr',function(){
	toastr[ "info" ]('Hello, World!'); // тут мы уже используем библиотку toastr
})
```
или так, если используете промисы:
```javascript
modules.use('toastr')
.then(function(){
	toastr[ "info" ]('Hello, World!'); // тут мы уже используем библиотку toastr
})
```
Если нужно последовательно подключить несколько модулей, просто перечисляем их в массиве:
```javascript
modules.use(['toastr','Module2','Module3'])
.then(function(){
	toastr[ "info" ]('Hello, World!'); // тут мы уже используем библиотку toastr
})
```
Но прежде чем модуль использовать его необходимо объявить в удобном месте
```javascript
modules.define('toastr',{
	depend:['jquery'],
	folder:'assets/lib/toastr/',
	files:['toastr.js', 'toastr.css'],
	func: 'toastr',
})
```
Модуль объявлен, пробежимся по строчкам
* При объявлении модуля даем ему уникальное имя
* Если есть зависимости указываем их в массиве depend (имена модулей)
* Чтобы не писать каждый раз полные пути указываем папку в которй лежат нжные нам файлы
* Указываем js и css файлы нужные для работы библиотеки
* Указываем точку входа (функцию наличие которой будет говорить о том что модуль уже подключен
)

При обьявлении модуля можно указать еще ряд параметров которые могут оказаться полезными. Например:
```javascript
modules.define('daterangepicker', {
	depend:['moment'], // Зависмость 
	afterLoad: function(){ // Функция которая выполнется перез вызовом callback
		
		$.extend({},$.fn.daterangepicker.defaults, {locale:{
		
	            format: 'DD.MM.YYYY',
	            separator: ' - ',
	            applyLabel: 'Применить',
	            cancelLabel: 'Отмена',
	            weekLabel: 'W',
	            customRangeLabel: 'Диапазон дат'
	        
		}})
		$.extend({},$.fn.daterangepicker.defaults, { singleDatePicker: true, showDropdowns: true})

		
	},
	desc:'Выбор диапазона дат или даты',
	folder:'assets/lib/bootstrap-daterangepicker/',
	files:[
			'daterangepicker.js',
			'daterangepicker.css'
		],
	func: '$.fn.daterangepicker',
	docs: 'http://www.daterangepicker.com/', 
})
```
* параметр afterLoad полезен в случае когда вам нужно задать параметры по умолчанию сразу после первой инициализации модуля
* параметр docs удобен для быстрого перехода к документации модуля 
```javascript
modules.showDocs('daterangepicker') // откроет в новом окне документацию по модулю daterangepicker
```

### Варианты использования
* С завсисмостью от [crEl](https://github.com/xneek/crEl) 
	* __modules.api.callback.js__ - после подключения вызывается callback функция
	* __modules.api.promise.js__ -  при успешном подключении отрабаывает промис .then(...) _для поддержки работы в старых браузерах нудно использовать полифил (например [этот](https://github.com/taylorhakes/promise-polyfill))_
* Без зависимостей
	* modules.api.callback.depfree.js
	* modules.api.promise.depfree.js _для поддержки работы в старых браузерах нудно использовать полифил (например [этот](https://github.com/taylorhakes/promise-polyfill))_
	

### Установка
npm
```bash
mpm install modules-xneek --save
```
bower
```bash
bower install modules-xneek --save
```
### Другие велосипеды от автора :)
* [https://github.com/xneek](https://github.com/xneek)
