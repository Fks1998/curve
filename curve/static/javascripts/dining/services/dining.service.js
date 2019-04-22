/**
* DiningService
* @namespace curve.DiningService.services
*/
(function () {
    'use strict';

    angular
      .module('curve.dining.services')
      .factory('DiningService', DiningService);

      DiningService.$inject = ['$cookies', '$http'];

    /**
    * @namespace DiningService
    * @returns {Factory}
    */
    function DiningService($cookies, $http) {
        /**
        * @name DiningService
        * @desc The Factory to be returned
        */
       	var Dining = {
			addDiningMeal: addDiningMeal,
			todayDiningStatus: todayDiningStatus
		};
		return Dining;
    
    	function addDiningMeal(data) {
            return $http.post('/api/v1/dining/add-dining/', data)
		}

		function todayDiningStatus(data) {
            return $http.get('/api/v1/dining/dining-status/')
		}

    }
})();
