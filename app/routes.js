module.exports = function(app) 
	{
		var Nerd = require('./models/nerd');
		var Geek = require('./models/geek');
		// server routes ===========================================================
		// handle things like api calls
		// authentication routes
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('/api/nerds/file', function(req, res) 
			{
				// load data  ==================================================================================================================
				var json2csv = require('json2csv').parse;
				var jsonexport = require('jsonexport');
				var json_csv = []
				var fs = require("fs");
				var data_company = []

				function data_exit(file)
					{
						fs.readFile(file, function (err, data) 
							    {
								if (err) throw err;
								//json_data = data.toString()
								json_data = data.toString()
								//console.log(json_data)
								//  console.log(typeof json_data);
								json_data = JSON.parse(json_data)
								//console.log("reading file")
								//console.log(typeof json_data);
								var arrayLength = json_data.length;
								//  console.log(typeof arrayLength);

								for (var i = 0; i < arrayLength; i++) 
									{
										to_save = json_data[i]
										json_data_1 = JSON.parse(to_save)
										//  console.log(json_data_1)

										//  console.log(json_data)

										if(json_data_1["mattermark_score"]!= null && json_data_1["employees"] != null && json_data_1["website_uniques"] != null && json_data_1["total_funding"] != null && json_data_1["business_models"] != null )
											{
												console.log("was called 1")
												// use mongoose to get all nerds in the database
												var user = new Nerd(
													{
														company:  json_data_1["name"],
														details: to_save
													});

												user.save(function (err, results) 
													  {
														console.log(results._id);
													   });

												console.log("getting here 1 ?")
												json0 = {name:json_data_1["name"], stage: json_data_1["stage"], mattermark_score: parseInt(json_data_1["mattermark_score"]), employees: parseInt(json_data_1["employees"]), website_uniques: parseInt(json_data_1["website_uniques"]),total_funding: parseInt(json_data_1["total_funding"]), business_models: json_data_1["business_models"][0]}
												json_csv.push(json0)

											}
									//}

									}

								//console.log(json_csv)

					});

				}

			data_exit('/Users/pngouche/Documents/startup_success/app/filterData.txt')
			data_exit('/Users/pngouche/Documents/startup_success/app/exited_ipo.txt')
			data_exit('/Users/pngouche/Documents/startup_success/app/exited_acquired.txt')
			//data_exit('./new_ipo.txt')
			data_exit('/Users/pngouche/Documents/startup_success/app/big_startups_info.txt')
			//console.log("async ?")
			setTimeout(function writing() 
				{
					var to_write = json_csv
					//console.log("235")
					//fields = ['stage', 'mattermark_score', 'employees', 'website_uniques', 'total_funding', 'business_models']
					//const csv = json2csv(to_write, fields);
					jsonexport(to_write,function(err, csv)
						   {
							if(err) return console.log(err);
							//console.log(csv);
							//console.log("236")
							fs.writeFile('./file4.csv', csv, function(err) 
								{
									if (err) throw err;
									console.log('file saved');
								});
							});
					console.log("loading prediction 10?")
				}, 3000)

			////////////////////////////////////////////////////////////////////////////////////
			console.log("loading prediction 6?")
			// Building an svm because of lack of enough data to use a neural network, i will get back to it if i have at least 1000 samples per category (3)
			var svm = require('node-svm');
			//var nj = require('numjs')
			var input = []
			var target = []
			var one_train_plus = []
			var features = []
			console.log("loading prediction 7?")
			var csv = require('csv-array');
			console.log("loading prediction 4?")
			
		async function generate_data(file)
			{
				var training_data = []
				var testing_data = []
				var data_svm = []
				csv.parseCSV(file, function(data)
					{
						json_data = JSON.stringify(data)
						//console.log(json_data)
						json_data  =  JSON.parse(json_data)
						//console.log(typeof json_data)
						arrayLength = json_data.length
						for(var i = 0 ; i < arrayLength ; i++)
							{
								json_data_1 = json_data[i]
								single_input = []
								one_train = []
								one_train_plus = []
								if((json_data_1["stage"] == "exited (acquired)" || json_data_1["stage"] == "exited (ipo)" ) && json_data_1["name"] != "Uber" && json_data_1["name"] != "Coinbase" )
									{
										single_input.push(parseFloat(json_data_1["mattermark_score"])/608)
										single_input.push(parseFloat(json_data_1["employees"])/61162)
										single_input.push(parseFloat(json_data_1["website_uniques"])/24617874)
										single_input.push(parseFloat(json_data_1["total_funding"])/96627980)
										if(json_data_1["business_models"] == "B2B" )
											{
												single_input.push(1)
											}
										else
											{
												single_input.push(0)
											}
										
										one_train.push(single_input)
										if(json_data_1["stage"] == "exited (acquired)")
											{
												one_train.push(0)
											}
										else 
											{
												one_train.push(1)
											}

										one_train_plus.push(one_train, json_data_1["name"] )
										training_data.push(one_train_plus)
										//console.log('features')


									}
							else 
								{

									single_input.push(parseFloat(json_data_1["mattermark_score"])/608)
									single_input.push(parseFloat(json_data_1["employees"])/61162)
									single_input.push(parseFloat(json_data_1["website_uniques"])/24617874)
									single_input.push(parseFloat(json_data_1["total_funding"])/96627980)
									if(json_data_1["business_models"] == "B2B" )
										{
											single_input.push(1)
										}
									else
										{
											single_input.push(0)
										}
									one_train.push(single_input)
									one_train.push(0)
									one_train_plus.push(one_train, json_data_1["name"] )
									testing_data.push(one_train_plus)


								}

						}

			});

			data_svm.push(training_data)
			data_svm.push(testing_data)
			return data_svm

		}

		console.log("loading prediction 1?")
		var clf = new svm.CSVC();
		async function ai(to_predict)
			{
				var train_final =  []
				var test_final = []
				for(var a = 0 ; a < to_predict[0].length ; a++)
					{
						train_final.push(to_predict[0][a][0])
					}
				for(var b = 0 ; b < to_predict[1].length ; b++)
					{
						test_final.push(to_predict[1][b][0])
					}
				var i = 0
				clf.train(train_final).done(function ()
					{
						// predict things
						train_final.forEach(function(ex){
						var prediction = clf.predictSync(ex[0]);
						console.log("loading prediction ?")
						var user = new Geek({
						company:  to_predict[0][i][1],
						prediction: prediction
					});
					user.save(function (err, results)
						  {
						console.log(results._id);
						});
					//console.log("prediction")
					console.log(i)
					console.log(to_predict[0][i][1])
					console.log(ex[1]);
					console.log(prediction);
					i++
				});

				var c = 0
				console.log( "test final" + test_final.length)
				test_final.forEach(function(ex)
					{
						console.log("Startup Success ...")
						var prediction = clf.predictSync(ex[0]);
						console.log("was called")
					// use mongoose to get all nerds in the database
						var user = new Geek(
							{
								company:  to_predict[1][c][1],
								prediction: prediction
							});
					
					user.save(function (err, results) {
						console.log(results._id);
					});
					//console.log("prediction")
					console.log(to_predict[1][c][1])
					//console.log(ex[1]);
					if(prediction == 1)
						console.log("IPO");
					else if(prediction == 0) 
						{
							console.log("ACQUIRED");
						}
					c++

				});
				res.send("done");
			});

		}

		//}, 1000
//)

		async function data_to_be_used()
			{
				console.log("loading prediction 3?")
				var data_1 = await generate_data("file4.csv")
				console.log("getting here")
				setTimeout(function print()
					{
					ai(data_1)

					}, 1000)

			}
			
		setTimeout(function output()
			{
				console.log("loading prediction 2?")
				data_to_be_used()

			}, 5000)


		// load data  ==================================================================================================================

	});

	app.get('/api/nerds', function(req, res)
			{
				console.log("was called")
				// use mongoose to get all nerds in the database
				console.log("getting here ?")
				var nerd_geek = []
				Nerd.find(function(err, nerds)
					{
						Geek.find(function(err, geeks)
							{
								nerd_geek.push(nerds)
								nerd_geek.push(geeks)
				// if there is an error retrieving, send the error.
				// nothing after res.send(err) will execute
								if (err)
								res.send(err);
								res.json(nerd_geek); // return all nerds in JSON format
							})
					});
			});

	app.get('*', function(req, res) 
		{
			res.sendfile('./public/index.html');
		});

};
