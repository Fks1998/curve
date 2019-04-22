/**
* MenuService
* @namespace curve.MenuService.services
*/
(function () {
    'use strict';

    angular
      .module('curve.menu.services')
      .factory('MenuService', MenuService);

      MenuService.$inject = ['$cookies', '$http'];

    /**
    * @namespace MenuService
    * @returns {Factory}
    */
    function MenuService($cookies, $http) {
        /**
        * @name MenuService
        * @desc The Factory to be returned
        */
       	var Menu = {
			fetchMenu: fetchMenu
		};

		return Menu;

		function fetchMenu() {
            return $http.get('/api/v1/dining/fetch-menu/');
        }
		

    }
})();
