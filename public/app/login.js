meanApp.controller('LoginController', ['$http', function($http) {

	var self = this;

	// models for login form
	self.emailAddress = '';
	self.password = '';
	
	// models for sign up form
	self.formFirstName = '';
	self.formLastName = '';
	self.formEmailAddress = '';
	self.formPassword = '';
	self.formConfirmPassword = '';

	self.postSignUp = function () {
		// TODO make sure confirmation matches
		$http({
			method : 'post',
        	url : '/users',
        	data : {
        		firstName : self.formFirstName,
        		lastName : self.formLastName,
        		emailAddress : self.formEmailAddress,
        		password : self.formPassword
        	}
		});
	};

	self.postSignIn = function () {
		$http({
			method : 'post',
        	url : '/login',
        	data : {
        		emailAddress : self.emailAddress,
        		password : password
        	}
		});
	};
	
}]);