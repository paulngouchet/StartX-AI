angular.module('GeekCtrl', []).controller('GeekController', function($scope,  $sce) {

	$scope.tagline = 'The square root of life is pi!';

	$scope.to_search = "Facebook"

	$scope.name = ""
	$scope.prediction = ""

	$scope.url = $sce.trustAsResourceUrl("https://techcrunch.com/")

	$scope.search = function() {

		$scope.name = $scope.to_search
		$scope.prediction = "IPO"

		var display = "https://techcrunch.com/tag/" + $scope.to_search + "/"

		$scope.url = $sce.trustAsResourceUrl(display)

	};

});