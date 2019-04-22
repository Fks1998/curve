/**
* Authentication
* @namespace curve.authentication.services
*/
(function () {
    'use strict';

    angular
      .module('curve.authentication.services')
      .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    /**
    * @namespace Authentication
    * @returns {Factory}
    */
    function Authentication($cookies, $http) {
        /**
        * @name Authentication
        * @desc The Factory to be returned
        */
       	var Authentication = {            
			getAuthenticatedAccount: getAuthenticatedAccount,
			isAuthenticated: isAuthenticated,
			login: login,
			logout: logout,
			register: register,
			setAuthenticatedAccount: setAuthenticatedAccount,
			unauthenticate: unauthenticate
		};
		return Authentication;
		
		function register(registerData) {
            return $http.post('/api/v1/auth/register/', registerData)
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, password: password
            })
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
			  .then(logoutSuccessFn, logoutErrorFn);
			  
            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();

                window.location = '/';
            }
            function logoutErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        function getAuthenticatedAccount() {
            if (!$cookies.get('authenticatedAccount')) {
                return;
            }

            return JSON.parse($cookies.get('authenticatedAccount'));
        }

        function isAuthenticated() {
            return !!$cookies.get('authenticatedAccount');
        }

        function setAuthenticatedAccount(account) {
            $cookies.put('authenticatedAccount', JSON.stringify(account));
        }

        function unauthenticate() {
            $cookies.remove('authenticatedAccount');
        }

    }
})();
