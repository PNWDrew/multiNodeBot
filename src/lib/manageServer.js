'use strict';
const axios         = require("axios");
const winston       = require('winston');
const querystring   = require('querystring');
const {monitorServicePort}  = require('../config');

//**********************************************************************************************************//
//                                                                                                          //
//                                            getServerStatus                                               //
//                                                                                                          //
//**********************************************************************************************************//
const getServerStatus = async (nodeArray) => {
    let returnValue = {message: "", status: "NOK"};

    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    const replyServerStatus = await axios
        .post(node.url + node.monitorServicePort + "/api/server", querystring.stringify({ password: 'notUsedYet', request: 'serverStatus'}))
        .catch(function (error) {
            winston.log('debug',error);
            returnValue.message = "Sorry. Getting server status was not successfull.";
            return (returnValue);
        });

    if (!replyServerStatus || !replyServerStatus.data ){
        returnValue.message = "Sorry. Getting server status was not successfull.";
        return (returnValue);
    }

    returnValue.message = 'Server status for ' + node.name + ': \n' + replyServerStatus.data;
    returnValue.status = "OK";
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                             getServerLogs                                                //
//                                                                                                          //
//**********************************************************************************************************//
const getServerLogs = async (nodeArray, logType, cause) => {
    let returnValue = {message: "", status: "NOK"};

    if (!cause)
        cause = 0;
        
    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    const replyServerLogs = await axios
        .post(node.url + node.monitorServicePort + "/api/server", querystring.stringify({   password:   'notUsedYet',
                                                                                            request:    'liskLogs',
                                                                                            logType:    logType,
                                                                                            forkCause:  cause}))
        .catch(function (error) {
            winston.log('debug',error.message.toString() );
            returnValue.message = "Sorry. Getting logs was not successfull. " + error.message.toString();
        });

    if (returnValue.message != "")
        return (returnValue);

    if ((!replyServerLogs || !replyServerLogs.data) && returnValue.message == "" ){
        returnValue.message = "Sorry. Getting logs was not successfull.";
        return (returnValue);
    }
    
    returnValue.message = logType + 'logs for ' + node.name + ': \n' + replyServerLogs.data;
    returnValue.status = "OK";
    return (returnValue);
};

exports.getServerStatus     = getServerStatus;
exports.getServerLogs       = getServerLogs;
