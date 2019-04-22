/**
* DiningController
* @namespace curve.dining.controllers
*/
(function () {
    'use strict';

    angular
      .module('curve.dining.controllers')
      .controller('DiningController', DiningController);

      DiningController.$inject = ['$location', '$scope', '$rootScope', '$state', 'toastr', 'Authentication', 'MenuService', 'DiningService', 'PointsService'];

    /**
    * @namespace DiningController
    */
    function DiningController($location, $scope, $rootScope, $state, toastr, Authentication, MenuService, DiningService, PointsService) {
        var vm = this;

        vm.answer_yes = false;
        vm.answer_no = false;
        vm.selected_meal = "";
        vm.menuList = [];

        vm.Answer = Answer;
        vm.fetchMenu = fetchMenu;
        vm.dining = dining;
        vm.diningStatus = diningStatus;

        vm.todayDate = new Date();

        vm.week_day = false;

        vm.fetchPoints = fetchPoints;
        vm.is_fetch_points = false;
        vm.current_status = false;

        vm.is_dining_record = false;
        vm.today_dining_status = false;

        vm.amt = 0;
        vm.countTo = 0;
        vm.countFrom = 0;
        vm.progressValue = 0;

		activate();

        function activate() {
            checkWeekDay();
            if (Authentication.isAuthenticated()) {
                // $state.go('menu');
                vm.diningStatus();
            }else{
                $state.go('menu');
            }
        }

        function Answer(action){
            if(action == 'yes'){
                vm.answer_yes = true;
                vm.fetchMenu();
            }else if(action == 'no'){
                vm.dining('no');
            }
        }

        function checkWeekDay(){
            let day = new Date().getDay();
            if(day == 0 || day == 6){
                vm.week_day = false;
            }else{
                vm.week_day = true;
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

        function dining(action){
            
            let dining_status = false;
            if(action == 'yes'){
                dining_status = true;
                if(!vm.selected_meal){
                    toastr.error("Please Select Meal!");
                    return;
                }
            }else{
                dining_status = false;
            }
            vm.data = {
                "dining_status": dining_status,
                "menu": vm.selected_meal
            }

            DiningService.todayDiningStatus().then(todayDiningStatusSuccessFn, todayDiningStatusErrorFn);

            function todayDiningStatusSuccessFn(data, status, headers, config) {
                if(data.data.length == 0){

                    DiningService.addDiningMeal(vm.data).then(addDiningMealSuccessFn, addDiningMealErrorFn);
        
                    function addDiningMealSuccessFn(data, status, headers, config) {
                        vm.fetchPoints();
                        vm.is_fetch_points = true;
                        if(action == 'no'){
                            vm.answer_no = true;
                        }
                        vm.points = "";
                        vm.points = data.data.data.earned_points;
                        if(action == 'yes'){
                            vm.current_status = true;
                        }else{
                            vm.current_status = false;
                        }
                        if(data.data.data.earned_points == 25 && data.data.data.dining_status == true){
                            toastr.success("YOU HAVE SUBMITTED BEFORE 8AM AND HAVE EARNED 25 POINTS!!");
                        }else if(data.data.data.earned_points == 15 && data.data.data.dining_status == true){
                            toastr.success("YOU HAVE SUBMITTED BEFORE 10AM AND HAVE EARNED 15 POINTS!!");
                        }else if(data.data.data.earned_points == 10 && data.data.data.dining_status == false){
                            toastr.success("YOU HAVE EARNED 10 POINTS!!");
                        }else{
                            if(action == 'yes'){
                                toastr.success("You are going for Dining Today!!!");
                            }else{
                                toastr.warning("Sorry, You are not going for Dining Today!!!");
                            }
                        }
                    }
                    function addDiningMealErrorFn(data, status, headers, config) {
                        toastr.error(data.data.message);
                    };
                }else{
                    console.log("Already Done!")
                }
            }
            function todayDiningStatusErrorFn(data, status, headers, config) {
                toastr.error(data.data.message);
            };

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

        function diningStatus(){
            DiningService.todayDiningStatus().then(todayDiningStatusSuccessFn, todayDiningStatusErrorFn);
    
                function todayDiningStatusSuccessFn(data, status, headers, config) {
                    if(data.data.length == 0){
                        vm.is_dining_record = false;
                    }else{
                        vm.is_dining_record = true;
                        vm.today_dining_status = data.data[0].dining_status;
                        vm.today_earned_points = data.data[0].earned_points;
                    }
                }
            function todayDiningStatusErrorFn(data, status, headers, config) {
                vm.is_dining_record = true;
                toastr.error(data.data.message);
            };
        }

    }
})();

