/**
* PointsService
* @namespace curve.PointsService.services
*/
(function () {
    'use strict';

    angular
      .module('curve.points.services')
      .factory('PointsService', PointsService);

      PointsService.$inject = ['$cookies', '$http'];

    /**
    * @namespace PointsService
    * @returns {Factory}
    */
    function PointsService($cookies, $http) {
        /**
        * @name PointsService
        * @desc The Factory to be returned
        */
       	var Points = {
            fetchPoints: fetchPoints,
            addFreeMeal: addFreeMeal
		};

		return Points;
		
		function fetchPoints() {
            return $http.get('/api/v1/dining/fetch-points/');
        }

        function addFreeMeal(data) {
            return $http.post('/api/v1/dining/add-free-meal/', data);
        }

    }
})();
