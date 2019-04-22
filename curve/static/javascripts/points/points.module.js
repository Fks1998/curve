(function () {
    'use strict';

    angular
      .module('curve.points', [
        'curve.points.controllers',
        'curve.points.services'
      ]);

    angular
      .module('curve.points.controllers', []);

    angular
      .module('curve.points.services', ['ngCookies']);
})();
