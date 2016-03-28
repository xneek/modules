# Modules

Простейшая библиотека для асинхронного подключения .js и .css файлов на HTML страницу
### Пример
В случае возникновения события нужно подключить библиотеку и вызвать метод из этой библиотеки (мы не подключаем библиотеку до тех пор пока она нам не нужна)

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

Теперь модуль можно использовать в любом месте и в любое время
```javascript
modules.use('toastr',function(){
	toastr[ "info" ]('Hello, World!'); // тут мы уже используем библиотку toastr
})
```

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
