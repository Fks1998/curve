/**
* Contact
* @namespace curve.services
*/
(function () {
    'use strict';

    angular
      .module('curve.services')
      .factory('ReleaseInfo', ReleaseInfo);

    ReleaseInfo.$inject = ['$http', '$timeout'];

    /**
    * @namespace Contact
    * @returns {Factory}
    */
    function ReleaseInfo($http, $timeout) {
        /**
        * @name Contact
        * @desc The Factory to be returned
        */
        var ReleaseInfo = {
            getReleaseInfoDetails: getReleaseInfoDetails,
        };

        return ReleaseInfo;

        /**
        * @name getReleaseInfoDetails
        * @desc Get Release Information
        * @returns {Promise}
        * @memberOf curve.services
        */
        function getReleaseInfoDetails() {
            return $http({
                method: 'GET',
                url: "/releaseinfo/",
                params: {},
                headers: {'Content-Type': 'application/json'}
            });
        }
    }
})();
