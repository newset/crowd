angular.module('crowd')
	.directive('iUi', [function () {
		return {
			restrict: 'A',
			link: function (scope, elm, attr) {
				var type = attr.iUi
				$(elm)[type]();
			}
		};
	}])
	.directive('iCheck', [function () {
		return {
			restrict: 'A',
			require : '^ngModel',
			link: function (scope, elm, attr, ngModel) {
				// 更新semantic 组件到 angular
				function changeValue(val){
					scope.$apply(function(){
						ngModel.$setViewValue(val);
					})
				}

				$(elm).on('change', function(){
					var status = $(this).prop('checked');
					changeValue(status);
				})
			}
		};
	}]);