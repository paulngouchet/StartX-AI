angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, $sce) {

	//$scope.tagline = 'Nothing beats a pocket protector!';


	$scope.tagline  =  " placeholder "

	$scope.companies = []







	$scope.companies = []

	$scope.search = function() {
		$scope.tagline = 'Fake Duck Duck Go';
	};




	$http.get("http://localhost:8080/api/nerds")
		.then(function(response) {



			$scope.companies = []

			//$scope.tagline = response.data[0].length  +   "    the distance  "  +  response.data[1].length

			//$scope.tagline  = "LOOPING2";

			//console.log("looping1")

			/*for(var geek = 0 ; geek < response.data[1].length ; geek++)
			{

				(function(i){
				var tag1 = 0

				var url1 = 0

				var url2 = 0

				var url3 = 0

				var prediction1 = ""

				var startup = {}

				var elements = []

					console.log(geek)

				console.log("looping10")



				for(var nerd = 0 ; nerd < response.data[0].length ; nerd++) {

					//$scope.tagline  = response.data[1][j].company;

					(function(j){


						//setTimeout(function() {

							console.log(response.data[1][i].company)

							if (response.data[1][i].company == response.data[0][j].company) {

								//$scope.tagline  = "LOOPING3";

								tag1 = response.data[1][i].company;


								url1 = $sce.trustAsResourceUrl(JSON.parse(response.data[0][j].details)["website"])


								prediction1 = ""

								if (response.data[1][i].prediction == 1) {
									prediction1 = "IPO"
								} else {
									prediction1 = "ACQUIRED"
								}


								startup = {link: [url1], name: tag1, prediction: prediction1}

								//elements.push(startup)


								//$scope.tagline  = tag1;

//$scope.tagline  = "LOOPING3";

								//$scope.currentProjectUrl = url1

								//$scope.tagline = " size of companies is" + elements.length

								//$scope.companies = elements


								//$scope.currentProjectUrl = url1

								$scope.tagline = " size of companies is" + elements.length

								$scope.companies.push(startup)


							}

						//}, 500)


				})(nerd)

				}

					//elements.push(startup)


					//$scope.currentProjectUrl = url1

					//$scope.tagline = " size of companies is" + elements.length

					//$scope.companies = elements


				//$scope.tagline = response.data[0].length  +   "    the distance  "  +  response.data[1].length


			})(geek)

			}*/





			for(var i = 0 ; i < response.data[1].length ; i++)
			{

				console.log(i)

				console.log(response.data[1].length)
				var tag1 = 0

				var url1 = 0

				var url2 = 0

				var url3 = 0

				var prediction1 = ""

				var startup = {}

				var elements = []


				console.log("looping10")



				for(var j = 0 ; j < response.data[0].length ; j++) {

					//$scope.tagline  = response.data[1][j].company;




						//setTimeout(function() {

							console.log(response.data[1][i].company)

							if (response.data[1][i].company == response.data[0][j].company) {

								//$scope.tagline  = "LOOPING3";

								tag1 = response.data[1][i].company;


								//url1 = $sce.trustAsResourceUrl(JSON.parse(response.data[0][j].details)["website"])

								var display = "https://techcrunch.com/tag/" + tag1 + "/"

								url1 = $sce.trustAsResourceUrl(display)



								console.log(JSON.parse(response.data[0][j].details)["website"])
								prediction1 = ""

								if (response.data[1][i].prediction == 1) {
									prediction1 = "IPO"
								} else {
									prediction1 = "ACQUIRED"
								}


								startup = {link: url1, name: tag1, prediction: prediction1}

								//elements.push(startup)


								//$scope.tagline  = tag1;

//$scope.tagline  = "LOOPING3";

								//$scope.currentProjectUrl = url1

								//$scope.tagline = " size of companies is" + elements.length

								//$scope.companies = elements


								//$scope.currentProjectUrl = url1

								$scope.tagline = " size of companies is" + elements.length

								$scope.companies.push(startup)


							}

						//}, 500)




				}

					//elements.push(startup)


					//$scope.currentProjectUrl = url1

					//$scope.tagline = " size of companies is" + elements.length

					//$scope.companies = elements


				//$scope.tagline = response.data[0].length  +   "    the distance  "  +  response.data[1].length




			}




				console.log("length of companies is " + $scope.companies.length)

			//$scope.tagline = response.data[0].length  +   "    the distance  "  +  response.data[1].length




		});





});


