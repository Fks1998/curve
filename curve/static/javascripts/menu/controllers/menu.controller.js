/**
* MenuController
* @namespace curve.authentication.controllers
*/
(function () {
    'use strict';

    angular
      .module('curve.menu.controllers')
      .controller('MenuController', MenuController);

      MenuController.$inject = ['$location', '$scope', '$rootScope', '$state', 'toastr', 'Authentication', 'MenuService', '$sce'];

    /**
    * @namespace MenuController
    */
    function MenuController($location, $scope, $rootScope, $state, toastr, Authentication, MenuService, $sce) {
        var vm = this;

        vm.fetchMenu = fetchMenu;
        vm.menuList = [];
        vm.is_authenticated = false;
		activate();

        function activate() {
            vm.fetchMenu();
            if (Authentication.isAuthenticated()) {
                vm.is_authenticated = true;
            }
        }

        function fetchMenu(){
            MenuService.fetchMenu().then(fetchMenuSuccessFn, fetchMenuErrorFn);

            function fetchMenuSuccessFn(data, status, headers, config) {
                vm.menuList = data.data;
            }
            function fetchMenuErrorFn(data, status, headers, config) {
                vm.menuList = [];
            };
        }
    }
})();

