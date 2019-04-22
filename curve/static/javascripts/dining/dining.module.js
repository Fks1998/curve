(function () {
    'use strict';

    angular
      .module('curve.dining', [
        'curve.dining.controllers',
        'curve.dining.services'
      ]);

    angular
      .module('curve.dining.controllers', []);

    angular
      .module('curve.dining.services', ['ngCookies']);
})();
