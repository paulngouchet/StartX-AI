angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, $sce) {
	$scope.tagline  =  " placeholder "
	$scope.companies = []
	$scope.companies = []
	$scope.search = function() {
		$scope.tagline = 'Fake Duck Duck Go';
	};
	$http.get("http://localhost:8080/api/nerds")
		.then(function(response) {
			$scope.companies = []
		
			for(var i = 0 ; i < response.data[1].length ; i++){
				console.log(i)
				console.log(response.data[1].length)
				var tag1 = 0
				var url1 = 0
				var url2 = 0
				var url3 = 0
				var prediction1 = ""
				var startup = {}
				var elements = []
				
				for(var j = 0 ; j < response.data[0].length ; j++) {
					console.log(response.data[1][i].company)
					
					if (response.data[1][i].company == response.data[0][j].company) {
						tag1 = response.data[1][i].company;
						var display = "https://techcrunch.com/tag/" + tag1 + "/"
						url1 = $sce.trustAsResourceUrl(display)
						console.log(JSON.parse(response.data[0][j].details)["website"])
						prediction1 = ""

						if (response.data[1][i].prediction == 1) {
							prediction1 = "IPO"
						} 
						else {
							prediction1 = "ACQUIRED"
						}
						startup = {link: url1, name: tag1, prediction: prediction1}
						$scope.tagline = " size of companies is" + elements.length
						$scope.companies.push(startup)
					}
				}
			}
			console.log("length of companies is " + $scope.companies.length)
		});	
});


