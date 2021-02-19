// server.js
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 4007;
var mysql = require('mysql');
var moment = require('moment');
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var pdf = require('pdfkit');
var fs = require('fs');
var http = require('http');
var urlencode = require('urlencode');
var request = require('request');
var mqtt = require('mqtt');
var options = {
	username:'freeza',
	password:'freeza'
};
var client  = mqtt.connect('mqtt://broker.hivemq.com',options);
client.on("connect", function () {
});
function bill_payment_status(paidStatus){
		client.publish("freeza/bill_payment",paidStatus);
		console.log("Publish Command Sent123");
}
app.get('/allow',function(req,res){
	let x='#';
	 bill_payment_status(x);
	res.redirect('back');
});
app.get('/disallow',function(req,res){
	let x='*'
	bill_payment_status(x);
	res.redirect('back');
});
var passport = require('passport');
var flash    = require('connect-flash');
// configuration ===============================================================
// connect to our database
require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
app.use(session({
	secret: 'Mashaallah',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();   
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();                          
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('/heart_rate1',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient1' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}

	});
})

app.get('/patient_Health_Status1',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient1' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})

app.get('/patient_Health_Status2',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient2' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})

app.get('/patient_Health_Status3',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient3' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})

app.get('/patient_Health_Status4',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient4' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})

app.get('/patient_Health_Status5',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient5' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})

app.get('/patient_Health_Status6',function(req,res){
	connection.query("SELECT * FROM Patient_status where username ='Patient6' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value1',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient1' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value1',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient1' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value1',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient1' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient1' order by dt desc", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient1' order by dt desc", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient1' order by dt desc", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/respirationgraph',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient1' order by dt desc", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/heart_rate2',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient2' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value2',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient2' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value2',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient2' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value2',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient2' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph2',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient2'  order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph2',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient2' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph2',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient2' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/respirationgraph2',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient2' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/heart_rate3',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient3' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value3',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient3' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value3',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient3' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value3',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient3' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph3',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient3'  order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph3',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient3' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph3',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient3' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/respirationgraph3',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient3' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/heart_rate4',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient4' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value4',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient4' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value4',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient4' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value4',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient4' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph4',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient4'  order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph4',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient4' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph4',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient4' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/respirationgraph4',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient4' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/heart_rate5',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient5' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value5',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient5' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value5',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient5' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value5',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient5' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph5',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient5'  order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph5',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient5' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph5',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient5' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/respirationgraph5',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient5' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/heart_rate6',function(req,res){
	connection.query("SELECT * FROM Heart_Rate where username ='Patient6' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/temperature_rate_value6',function(req,res){
	connection.query("SELECT * FROM Temperature where username ='Patient6' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/oxidation_rate_value6',function(req,res){
	connection.query("SELECT * FROM Oxidation where username ='Patient6' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/respiration_rate_value6',function(req,res){
	connection.query("SELECT * FROM Respiration where username ='Patient6' ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}
	});
})
app.get('/heartrategraph6',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as Heart_Rate,dt FROM Heart_Rate where username ='Patient6'  order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/temperaturegraph6',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as temperature,dt FROM Temperature where username ='Patient6' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})
app.get('/oxidationgraph6',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as oxidation,dt FROM Oxidation where username ='Patient6' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})


app.get('/respirationgraph6',function(req,res){
	var end = moment().endOf('month').format('YYYY-MM-DD');
	var start = moment().startOf('month').format('YYYY-MM-DD');
		connection.query("SELECT value as respiration,dt FROM Respiration where username ='Patient6' order by dt DESC", function(err, rows){
			if(!err){
				res.json(rows);
			}
		});
})


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
