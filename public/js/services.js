angular.module('crowd')
	.factory('CrowdFlower', ['$http', '$q', function($http, $q){
		return {
			login : function(data){
				return $http.post('/login', data);
			},
			create : function(data){
				return $http.post('/admin/create', data);
			},
			getUser : function(id){
				return $http.get('/user/'+id);
			},
			getUsers : function(){
				return $http.get('/users');
			}
		};
	}])
	.factory('Session', ['$http', '$q', function($http, $q){
		var list= {
			isAdmin : false
		};
		return {
			set : function(key, val){
				list[key] = val;
			},
			get : function(key){
				return list[key];
			},
			login : function(id, admin){
				list.login = true;
				list.userId = id;
				list.isAdmin = admin;
			}
		};
	}]);