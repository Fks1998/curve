/**
* PointsController
* @namespace curve.authentication.controllers
*/
(function () {
    'use strict';

    angular
      .module('curve.points.controllers')
      .controller('PointsController', PointsController);

      PointsController.$inject = ['$location', '$scope', '$rootScope', '$state', 'toastr', 'Authentication', '$timeout', 'PointsService', 'MenuService', '$filter'];

    /**
    * @namespace PointsController
    */
    function PointsController($location, $scope, $rootScope, $state, toastr, Authentication, $timeout, PointsService, MenuService, $filter) {
        var vm = this;

        vm.fetchPoints = fetchPoints;
        vm.fetchMenu = fetchMenu;
        vm.getFreeMeal = getFreeMeal;
        vm.claimMeal = claimMeal;

        vm.amt = 0;
        vm.countTo = 0;
        vm.countFrom = 0;
        vm.progressValue = 0;
        vm.menuList = [];
        vm.freeMealFormShown = false;

        vm.free_meal_data = {};
        vm.free_meal_data.date = "";
        vm.free_meal_data.selected_meal = "";


		activate();

        function activate() {
            console.log("Points");
            if (Authentication.isAuthenticated()) {
                // $state.go('menu');
                vm.fetchPoints();
                vm.fetchMenu();
            }else{
                $state.go('menu');
            }
        }

        function fetchPoints(){
            PointsService.fetchPoints().then(fetchPointsSuccessFn, fetchPointsErrorFn);

            function fetchPointsSuccessFn(data, status, headers, config) {
                vm.progressValue = data.data.points;
                vm.countTo = data.data.points;
            }
            function fetchPointsErrorFn(data, status, headers, config) {
                vm.progressValue = 0;
                vm.countTo = 0;
            };
        }

        vm.opened = false;
        
        vm.open = open;
        
        function open(e) {
          e.stopPropagation ();
          vm.opened = true;
        }

        function claimMeal(){
            vm.freeMealFormShown = true;
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

        function getFreeMeal(){
            if(vm.free_meal_data.date == null || vm.free_meal_data.date == ""){
                toastr.error("Date is required!!");
                return;
            }
            if(vm.free_meal_data.selected_meal == null || vm.free_meal_data.selected_meal == ""){
                toastr.error("Meal is required!!");
                return;
            }
            if(new Date().getDate() > new Date(vm.free_meal_data.date).getDate()){
                toastr.error("Date must be Today's Date or Future Date!!");
                return;
            }

            let date = $filter('date')(new Date(vm.free_meal_data.date),'yyyy-MM-dd');
            vm.free_meal_data.date = date;

            PointsService.addFreeMeal(vm.free_meal_data).then(faddFreeMealSuccessFn, addFreeMealErrorFn);

            function faddFreeMealSuccessFn(data, status, headers, config) {
                toastr.success("You have successfully claimed your free meal!");
                vm.freeMealFormShown = false;
                vm.fetchPoints();
            }
            function addFreeMealErrorFn(data, status, headers, config) {
                toastr.error(data.data.message);
            };
        }

        
    }
})();

