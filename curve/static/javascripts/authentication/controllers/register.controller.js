/**
* RegisterController
* @namespace curve.authentication.controllers
*/
(function () {
    'use strict';

    angular
      .module('curve.authentication.controllers')
      .controller('RegisterController', RegisterController);

      RegisterController.$inject = ['$location', '$scope', '$state', '$rootScope', 'Authentication', 'toastr'];

    /**
    * @namespace RegisterController
    */
    function RegisterController($location, $scope, $state, $rootScope, Authentication, toastr) {
		var vm = this;
		
		vm.registerData= {};
		vm.registerData.selected_dietary = [];
		vm.register = register;
		vm.goToLogin = goToLogin;
		vm.is_registered = false;
		
		vm.dietaryList = [
			{name: "Nuts", value: "nuts"},
			{name: "Eggs", value: "eggs"},
			{name: "Fish", value: "fish"},
			{name: "Milk", value: "milk"},
			{name: "Vegetarian", value: "vegetarian"}
		];

		activate();

        function activate() {
            // If the user is authenticated, they should not be here.
			vm.submitted = false;
            if (Authentication.isAuthenticated()) {
                $state.go('menu');
            }
        }
		
        function register(){

			vm.submitted = true;
            vm.form_loading = true;
            if (vm.registerForm.$invalid)
            {
                vm.form_loading = false;
                toastr.error('Please fill the mandatory field.');
                return;
			}

			console.log(vm.registerData.user_type);

			if(!vm.registerData.selected_dietary.length){
				toastr.error('Please fill the mandatory field.');
				return;
			}

			if(vm.registerData.password != vm.registerData.confirm_password){
				toastr.error('Password and Confirm Password did not matched!');
				return;
			}
			Authentication.register(vm.registerData).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
				toastr.success('Register Successfull!');
				vm.is_registered = true;
                // Authentication.login(vm.registerData.email,vm.registerData.password).then(loginSuccessFn, loginErrorFn);

				// function loginSuccessFn(data, status, headers, config) {
				// 	vm.form_loading = false;
				// 	Authentication.setAuthenticatedAccount(data.data);
				// 	$rootScope.$broadcast('logged-in');
				// 	toastr.success('Login Successfull!');
				// 	$state.go('home');
				// }
				// function loginErrorFn(data, status, headers, config) {
				// 	toastr.error(data.data.message);
				// 	vm.form_loading = false;
				// 	vm.isError = true;
				// };
            }
            function registerErrorFn(data, status, headers, config) {
				vm.is_registered = false;
				toastr.error(data.data.message);
            }
		}

		function goToLogin(){
			$state.go('login');
		}
    }
})();

