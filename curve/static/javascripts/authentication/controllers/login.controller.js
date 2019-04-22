/**
* LoginController
* @namespace curve.authentication.controllers
*/
(function () {
    'use strict';

    angular
      .module('curve.authentication.controllers')
      .controller('LoginController', LoginController);

      LoginController.$inject = ['$location', '$scope', '$rootScope', '$state', 'toastr', 'Authentication'];

    /**
    * @namespace LoginController
    */
    function LoginController($location, $scope, $rootScope, $state, toastr, Authentication) {
        var vm = this;
        vm.login = login;

		activate();

        function activate() {
            // If the user is authenticated, they should not be here.
			vm.submitted = false;
            if (Authentication.isAuthenticated()) {
                $state.go('menu');
            }
        }

        function login() {
            vm.submitted = true;
            vm.form_loading = true;
            if (vm.loginForm.$invalid)
            {
                vm.form_loading = false;
                toastr.warning('Please fill the mandatory field.');
                return;
            }
            
            Authentication.login(vm.email, vm.password).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {
                vm.form_loading = false;
                Authentication.setAuthenticatedAccount(data.data);
				$rootScope.$broadcast('logged-in');
				toastr.success('Login Successfull!');
                $state.go('menu');
            }

            function loginErrorFn(data, status, headers, config) {
				toastr.error(data.data.message);
                vm.form_loading = false;
                vm.isError = true;
            };
        }
    }
})();

