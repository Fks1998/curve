(function () {
    'use strict';
  
    angular
      .module('curve', [
        'curve.routes',
        'curve.config', 
        'curve.controller',
        'curve.services',
        'curve.authentication',
        'curve.menu',
        'curve.dining',
        'curve.points',
        'toastr',
        'checklist-model',
        'ui.bootstrap',
        'countTo',
        'ngSanitize',
        'ui.bootstrap'
      ]);
  
    angular
      .module('curve.routes', ['ui.router']);
  
    angular
      .module('curve.config', []); 

    angular
        .module('curve.controller', []);

    angular
        .module('curve.services', []);
  
    angular
      .module('curve')
      .run(run)
    .config(config);
    run.$inject = ['$http']
    config.$inject = ['toastrConfig'];
    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    function run($http) {
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
    }

    function config(toastrConfig) {
        angular.extend(toastrConfig, {
			autoDismiss: false,
			containerId: 'toast-container',
			timeOut:3000,
			maxOpened: 4,
			newestOnTop: true,
			positionClass: 'toast-top-right',
			preventDuplicates: false,
			preventOpenDuplicates: false,
			target: 'body',
			closeButton: true,
      });
    }
  
  })();
  
  