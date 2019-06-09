angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';

	$scope.search = function() {
		$scope.tagline = 'Fake Duck Duck Go';
		console.log("clicked")
	};

});