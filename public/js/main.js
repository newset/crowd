// angular 
angular.module('crowd', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				'url' : '/',
				templateUrl : '/templates/index.html'
			})
			.state('login', {
				'url' : '/login',
				templateUrl : '/templates/login.html'
			})
			.state('api', {
				'url' : '/api',
				'controller' : 'Api'
			})
			.state('create', {
				'url' : '/create',
				templateUrl : '/templates/create.html'
			})
			.state('profile', {
				'url' : '/profile/:uid',
				templateUrl : '/templates/profile.html'
			});

		$urlRouterProvider.otherwise('/login')
	}])
	.run(['$rootScope', '$state', function ($rootScope, $state) {
		$rootScope.userLogin = {
			login : crowd.login,
			role : crowd.role,
			uid : crowd.uid,
			username : crowd.username,
			balance : crowd.balance
		};

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if (toState.name == 'api') {
				return;
			};	
			// 未登录跳转到 登录界面
            if (!crowd.login) {
            	if (toState.name != 'login') {
            		event.preventDefault();
              		$state.go('login');
            	};
	        }else if(crowd.role == 'admin' && toState.name == 'login'){
	        	event.preventDefault();
              	$state.go('create');
	        }else if(toState.name == 'login'){
				event.preventDefault();
              	$state.go('profile', {uid : $rootScope.userLogin.uid});
	        };
        });
	}])
	.controller('Login', ['$scope', 'CrowdFlower', 'Session', '$state', function($scope, CrowdFlower, Session, $state){
		$scope.user = {isAdmin : false};

		$scope.login = function(){
			CrowdFlower.login($scope.user).success(function(res){
				Session.login(res.id, $scope.user.isAdmin);
				// 跳转到个人页面
				location.reload();
			})
			.error(function(status, error){
				console.log('server error');
			});
		}
	}])
	.controller('Create', ['$state', 'CrowdFlower', 'Session', '$scope', function ($state, CrowdFlower, Session, $scope) {
		if(crowd.role != 'admin'){
			$state.go('home');
		}
		
		$scope.create = function(){
			CrowdFlower.create($scope.user).success(function(res){
				$state.go('profile', {uid : res.user._id});
			});
		}
	}])
	.controller('Profile', ['$state', 'CrowdFlower', 'Session', '$scope', '$sce', '$rootScope', function ($state, CrowdFlower, Session, $scope, $sce, $rootScope) {
		var id = $state.params.uid;
		$scope.user = {};
		if (!id){
			$state.go('home');
		};

		$scope.url = $sce.trustAsResourceUrl('http://crowdflower.com/judgments/crowdsdom?uid='+id);
		CrowdFlower.getUser(id).success(function(res){
			if (res.data) {
				$scope.user = res.data;
			}else{
				$state.go('home');
			};
		});
	}])
	.controller('Api', ['$scope', '$http', function($scope, $http){
		$scope.load = {};

		$scope.$watch('load.amount', function(n, o){
			$scope.load.adjusted_amount = $scope.load.amount*6;
		});

		$scope.send = function(){
			$http.post('/api', $scope.load).success(function(res){
				// 显示当前 balance
				
			});
		}
	}]);