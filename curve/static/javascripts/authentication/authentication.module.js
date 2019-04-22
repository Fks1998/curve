(function () {
    'use strict';

    angular
      .module('curve.authentication', [
        'curve.authentication.controllers',
        'curve.authentication.services'
      ]);

    angular
      .module('curve.authentication.controllers', []);

    angular
      .module('curve.authentication.services', ['ngCookies']);
})();
