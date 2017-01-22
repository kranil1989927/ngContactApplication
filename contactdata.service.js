(function(){
	var app = angular.module('contactApp');
	app.service('ContactDataServ', function ($http){
		var self = this;
		self.getContacts = function(){
			return $http.get('http://localhost:3000/contacts')
			.then(function(response){
				return response.data;
			});
		};

		self.saveUser = function(userData){
			return $http.put('http://localhost:3000/contacts/'+ userData.id, userData)
			.then(function(response){
				console.log(response);
			})
		};

		self.createNewContact = function(userData){
			return $http.post('http://localhost:3000/contacts/', userData)
			.then(function(response){
				console.log(response);
			})
		}
	});
})();