(function(){
	var app = angular.module('contactApp');
	app.controller("ContactCtrl", ContactCtrl);

	function ContactCtrl(ContactDataServ, AppDataServiceServ) {
		var self = this;

		self.editMode = false;
		self.addMode = false;

		ContactDataServ.getContacts()
		.then(function(data){
			self.contacts = data;
			self.selectedContact = data[0];
		});

		this.appDetails = AppDataServiceServ;

		this.showContactDetail = function(index){			
			this.selectedContact = this.contacts[index];
			this.successMsg = undefined;
			this.errorMsg = undefined;
		};
		

		this.toogleEditMode = function(){
			this.editMode = !this.editMode;
		};

		this.saveUser = function(){
			this.toogleEditMode();
			var userData = this.selectedContact;
			if(self.addMode){
				
				ContactDataServ.createNewContact(userData)
				.then(function(){
						self.successMsg = userData.name.first + " " + userData.name.last + " is successfully added";
					},
					function(){
						self.errorMsg = "There is an error. Please try again";
					}
				);
				self.addMode = false;
			} else {
				ContactDataServ.saveUser(userData)
				.then(function(){
						self.successMsg = userData.name.first + " " + userData.name.last + " is successfully updated";
					},
					function(){
						self.errorMsg = "There is an error. Please try again";
					}
				);
			}			
		};

		this.addContact = function(){
			this.toogleEditMode();
			this.addMode = true;

			var contactCount = self.contacts.length + 1;
			this.selectedContact = {
				"id" : contactCount,
				"picture": {
        			"large": "https://randomuser.me/api/portraits/women/"+contactCount+".jpg",
        			"medium": "https://randomuser.me/api/portraits/med/women/"+contactCount+".jpg",
        			"thumbnail": "https://randomuser.me/api/portraits/thumb/women/"+contactCount+".jpg"
      			}
			};
			
		};
	}
})();