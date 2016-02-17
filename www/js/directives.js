angular.module('starter.directives', [])

.directive('taskDirective', function(){
	// Runs during compile
	return {
		scope: {
			task: '=',
			memberName: '='
		},
		restrict: 'E',
		templateUrl: 'templates/task.html',
		replace: false
	};
});