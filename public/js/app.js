/**
 * Мозги сайта
 */
(function(){

	/**
	 * Инициализация приложения
	 * @param opt
	 * @constructor
     */
	function App(opt){

		var app = this;

		this.debug = false;

		/** Инициализация */
		this.init = function(){
			if(opt == 'debug'){
				this.debug = true;
				console.log('App.init');
			}

			/** После загрузки документа */
			$(document).ready(function(){
				// ...
			});
			/** Данные на странице загрузились */
			$(window).load(function(){
				// ...
			});
			return this;
		};

		return this.init();
	}

	new App();
})();