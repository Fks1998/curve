(function () {
    'use strict';

    angular
      .module('curve.menu', [
        'curve.menu.controllers',
        'curve.menu.services'
      ]);

    angular
      .module('curve.menu.controllers', []);

    angular
      .module('curve.menu.services', ['ngCookies']);
})();
