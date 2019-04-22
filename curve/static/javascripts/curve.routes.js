(function () {
    'use strict';

    angular
      .module('curve.routes')
      .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$qProvider'];

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($stateProvider,$urlRouterProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);

        $urlRouterProvider.otherwise('/menu');

        $stateProvider
        .state('menu', {
            url:'/menu',
            controller: 'MenuController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/menu/menu.html'
        })

        .state('dining', {
            url:'/dining',
            controller: 'DiningController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/dining/dining.html'
        })

        .state('points', {
            url:'/points',
            controller: 'PointsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/points/points.html'
        })

        .state('/register', {
            url: '/register',
            controller: 'RegisterController', 
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        })

        .state('login', {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: '/static/templates/about/about.html'
        })
    }
})();
