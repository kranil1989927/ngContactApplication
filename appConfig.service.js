(function(){
	var app = angular.module('contactApp');
	app.service('AppDataServiceServ', function (AppNameServ){
		this.name = AppNameServ;
		this.author = "Anil Kumar";
		this.buildDate = new Date().toDateString();
	});
})();