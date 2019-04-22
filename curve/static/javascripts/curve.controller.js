/**
* RootController
* @namespace curve.controller
*/
(function () {
    'use strict';

    angular
      .module('curve.controller')
      .controller('RootController', RootController);

    RootController.$inject = ['$location', '$scope', '$state', 'Authentication', 'toastr'];

    /**
    * @namespace LoginController
    */
    function RootController($location, $scope, $state, Authentication, toastr) {
	  	console.log("ROOT");
	  
        var root = this;
        root.isLoggedIn = false;
		root.logout = logout;
		
		activate();

		function activate() {
            if (Authentication.isAuthenticated()) {
                root.isLoggedIn = true;
                root.user = Authentication.getAuthenticatedAccount();
            }
            else {
                $state.go('login');
			}
            root.$state = $state;            
        }

        function logout() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
				Authentication.logout();
				toastr.success("LogOut Successfull!");
				return;
            }
        }

        $scope.$on('logged-in', function(event, args) {
            root.isLoggedIn = true;
            root.user = Authentication.getAuthenticatedAccount();
        });
    }
})();

