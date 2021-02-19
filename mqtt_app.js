var mqtt = require('mqtt');
var mysql = require('mysql');
var urlencode = require('urlencode');
var http = require('http');
var dbconfig = require('./config/database');
var options = {
    username: 'freeza',
    password: 'freeza'
};
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'n5sYGPfvr7hunpxR',
    database: 'multipatientmonitor'
});
connection.connect();
var client = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client.on('connect', function () {
    client.subscribe('tritcs1');
    console.log(`MQTT Started to Listen...`);
});
client.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient1' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient1" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 1 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient1' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient1" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 1 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient1' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient1" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 1 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient1' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient1" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 1 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient1" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 1 inserted successfully");
                        }
                    })
                }
            }
        }

        
    })

    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient1' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

                console.log ("patietn 1 true" + rows[0].level + splits[4])



            } else {
                console.log ("patietn 1 false")



                checkflag5 = false;

            }

            if (checkflag5 == false) {

                var today = new Date();

                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (splits[4] == "Normal") {
                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient1' ", function (err) {                        if (err) {
                            console.log("Error inserting Patient2 Level ", err);
                        }
                        else {
                            console.log("Normal Patient2 data  inserted successfully");
                        }
                    })
                }

                else {
                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient1' ", function (err) {                        
                        if (err) {

                            console.log("Error inserting Patient2 Level ", err);
                        }

                        else {
                            console.log("Abnormal Patient2 data  inserted successfully");
                        }

                    })

                }

            }

        }



        

    })


    
})
var client2 = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client2.on('connect', function () {
    client2.subscribe('tritcs2');
    console.log(`MQTT Started to Listen...`);
});
client2.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient2' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient2" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 2 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient2' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient2" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 2 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient2' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient2" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 2 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient2' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient2" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 2 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient2" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 2 inserted successfully");
                        }
                    })
                }
            }
        }
    })
    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient2' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

            } else {

                checkflag5 = false;

            }

            if (checkflag5 == false) {

                var today = new Date();

                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (splits[4] == "Normal") {

                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient2' ", function (err) {                        if (err) {

                            console.log("Error inserting Patient2 Level ", err);

                        }

                        else {

                            console.log("Normal Patient2 data  inserted successfully");

                        }

                    })

                }

                else {



                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient2' ", function (err) {                        



                        if (err) {

                            console.log("Error inserting Patient2 Level ", err);

                        }

                        else {

                            console.log("Abnormal Patient2 data  inserted successfully");

                        }

                    })

                }

            }

        }



        

    })
})
var client3 = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client3.on('connect', function () {
    client3.subscribe('tritcs3');
    console.log(`MQTT Started to Listen... client3`);
});
client3.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient3' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient3" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 3 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient3' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient3" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 3 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient3' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient3" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 3 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient3' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient3" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 3 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient3" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 3 inserted successfully");
                        }
                    })
                }
            }
        }
    })

    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient3' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

            } else {

                checkflag5 = false;

            }

            if (checkflag5 == false) {

                var today = new Date();

                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (splits[4] == "Normal") {

                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient3' ", function (err) {                        if (err) {

                            console.log("Error inserting Patient3 Level ", err);

                        }

                        else {

                            console.log("Normal Patient3 data  inserted successfully");

                        }

                    })

                }

                else {



                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient3' ", function (err) {                        



                        if (err) {

                            console.log("Error inserting Patient3 Level ", err);

                        }

                        else {

                            console.log("Abnormal Patient3 data  inserted successfully");

                        }

                    })

                }

            }

        }



        

    })
})
var client4 = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client4.on('connect', function () {
    client4.subscribe('tritcs4');
    console.log(`MQTT Started to Listen... client4`);
});
client4.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient4' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient4" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 4 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient4' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient4" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 4 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient4' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient4" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 4 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient4' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient4" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 4 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient4" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 4 inserted successfully");
                        }
                    })
                }
            }
        }
    })

    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient4' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

            } else {

                checkflag5 = false;

            }

            if (checkflag5 == false) {

                var today = new Date();

                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (splits[4] == "Normal") {

                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient4' ", function (err) {                        if (err) {

                            console.log("Error inserting Patient4 Level ", err);

                        }

                        else {

                            console.log("Normal Patient4 data  inserted successfully");

                        }

                    })

                }

                else {



                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient4' ", function (err) {                        



                        if (err) {

                            console.log("Error inserting Patient4 Level ", err);

                        }

                        else {

                            console.log("Abnormal Patient4 data  inserted successfully");

                        }

                    })

                }

            }

        }



        

    })
})
var client5 = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client5.on('connect', function () {
    client5.subscribe('tritcs5');
    console.log(`MQTT Started to Listen... client5`);
});
client5.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient5' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient5" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 5 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient5' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient5" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 5 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient5' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient5" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 5 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient5' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient5" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 5 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient5" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 5 inserted successfully");
                        }
                    })
                }
            }
        }
    })

    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient5' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

            } else {

                checkflag5 = false;

            }

            if (checkflag5 == false) {

                var today = new Date();

                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (splits[4] == "Normal") {

                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient5' ", function (err) {                        if (err) {

                            console.log("Error inserting Patient5 Level ", err);

                        }

                        else {

                            console.log("Normal Patient5 data  inserted successfully");

                        }

                    })

                }

                else {



                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient5' ", function (err) {                        



                        if (err) {

                            console.log("Error inserting Patient5 Level ", err);

                        }

                        else {

                            console.log("Abnormal Patient5 data  inserted successfully");

                        }

                    })

                }

            }

        }



        

    })
})

var client6 = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client6.on('connect', function () {
    client6.subscribe('tritcs6');
    console.log(`MQTT Started to Listen... client6`);
});
client6.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM Heart_Rate where username ='Patient6' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Heart Rate value ", err);
        }
        else {
            if (rows[0].value == splits[0]) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Heart_Rate`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[0] + '","' + "Patient6" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Heart Rate Level ", err);
                    }
                    else {
                        console.log("Heart Rate data for Patient 6 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag2;
    connection.query("SELECT `value` FROM Temperature where username ='Patient6' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Temperature value ", err);
        }
        else {
            if (rows[0].value == splits[1]) {
                checkflag2 = true;
            } else {
                checkflag2 = false;
            }
            if (checkflag2 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Temperature`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[1] + '","' + "Patient6" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Temperature Level ", err);
                    }
                    else {
                        console.log("Temperature data for Patient 6 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag3;
    connection.query("SELECT `value` FROM Oxidation where username ='Patient6' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[2]) {
                checkflag3 = true;
            } else {
                checkflag3 = false;
            }
            if (checkflag3 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                connection.query('INSERT INTO `Oxidation`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + splits[2] + '","' + "Patient6" + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting Oxidation Level ", err);
                    }
                    else {
                        console.log("Oxidation data for Patient 6 inserted successfully");
                    }
                })
            }
        }
    })
    let checkflag4;
    connection.query("SELECT `value` FROM Respiration where username ='Patient6' ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous Oxidation value ", err);
        }
        else {
            if (rows[0].value == splits[3]) {
                checkflag4 = true;
            } else {
                checkflag4 = false;
            }
            if (checkflag4 == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (splits[3] == 0) {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Normal","' + splits[3] + '","' + "Patient6" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Normal Respiration data for Patient 6 inserted successfully");
                        }
                    })
                }
                else {
                    connection.query('INSERT INTO `Respiration`( `level`,`value`,`username`,`sensors_data_date`,`sensors_data_time`) VALUES ("Abnormal","' + splits[3] + '","' + "Patient6" + '","' + date + '","' + time + '")', function (err) {
                        if (err) {
                            console.log("Error inserting Respiration Level ", err);
                        }
                        else {
                            console.log("Abormal Respiration data for Patient 6 inserted successfully");
                        }
                    })
                }
            }
        }
    })

    let checkflag5;

    connection.query("SELECT `level` FROM Patient_status where username ='Patient6' ORDER BY dt DESC LIMIT 1", function (err, rows) {

        if (err) {

            console.log("Error getting previous Patient_status value ", err);

        }

        else {

            if (rows[0].level == splits[4]) {

                checkflag5 = true;

            } else {

                checkflag5 = false;

            }

            if (checkflag5 == false) {
            

                if (splits[4] == "Normal") {

                    connection.query("UPDATE Patient_status SET level ='Normal' where username ='Patient6' ", function (err) {                        if (err) {

                            console.log("Error inserting Patient6 Level ", err);

                        }

                        else {

                            console.log("Normal Patient6 data  inserted successfully");

                        }

                    })

                }

                else {



                    connection.query("UPDATE Patient_status SET level ='Abnormal' where username ='Patient6' ", function (err) {                        



                        if (err) {

                            console.log("Error inserting Patient6 Level ", err);

                        }

                        else {

                            console.log("Abnormal Patient6 data  inserted successfully");

                        }

                    })

                }

            }

        }



        

    })
})