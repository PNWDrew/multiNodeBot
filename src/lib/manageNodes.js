'use strict';
const axios         = require("axios");
const winston       = require('winston');
const querystring   = require('querystring');

//**********************************************************************************************************//
//                                                                                                          //
//                                          checkBlockHeights                                               //
//                                                                                                          //
//**********************************************************************************************************//
const checkBlockHeights = async (settings) => {
    let remoteNodes , referenceNodes;
    let remBlockMessage = "\nYour nodes :";
    let refBlockMessage = "Reference nodes :";
    let returnValue = {message: "", status: "NOK"};
    let foundBadNode = false;
  
    remoteNodes = await getNodesBlockHeight(settings.remoteNodes);
    winston.log('debug',JSON.stringify(remoteNodes));
  
    referenceNodes = await getNodesBlockHeight(settings.referenceNodes);
    winston.log('debug',JSON.stringify(referenceNodes));
  
    for (let refNode of referenceNodes){
        //compiling message to display reference nodes block heigth
        refBlockMessage += `\n<b>${refNode.name}</b> : ${refNode.blockHeight}`;
    }

    //check if nodes have the correct height and set appropriate message
    for (let remNode of remoteNodes){
        let nbrOfMatchingNodes= 0;

        for (let refNode of referenceNodes){
            let delta = Math.abs(remNode.blockHeight - refNode.blockHeight);
            if (delta <= settings.maxDeltaBlockHeight) nbrOfMatchingNodes++;
        }

        if (nbrOfMatchingNodes >= settings.minNbrOfMatchingNodes){
            remBlockMessage += `\n👌 <b>${remNode.name}</b> OK : ${remNode.blockHeight}`;
        } else {
            remBlockMessage += `\n⚠️ <b>${remNode.name}</b> NOT OK : ${remNode.blockHeight}`
            if (remNode.monitor)
                foundBadNode = true;
        }
    }

    if (!foundBadNode)
        returnValue.status = "OK";

    returnValue.message = refBlockMessage + `\n` + remBlockMessage;
    
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                          checkBlockHeight                                               //
//                                                                                                          //
//**********************************************************************************************************//
const checkBlockHeight = async (settings, nodeArray) => {
    let returnValue = {message: "", status: "NOK"};
    let referenceNodes;
    let remBlockMessage = "\nYour node :";
    let refBlockMessage = "Reference nodes :";

    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    node.blockHeight = await getNodeBlockHeight(node);
    winston.log('debug',JSON.stringify(node));

    referenceNodes = await getNodesBlockHeight(settings.referenceNodes);
    winston.log('debug',JSON.stringify(referenceNodes));
  
    for (let refNode of referenceNodes){
        //compiling message to display reference nodes block heigth
        refBlockMessage += `\n<b>${refNode.name}</b> : ${refNode.blockHeight}`;
    }

    //check if node has the correct height and set appropriate message
    let nbrOfMatchingNodes= 0;

    for (let refNode of referenceNodes){
        let delta = Math.abs(node.blockHeight - refNode.blockHeight);
        if (delta <= settings.maxDeltaBlockHeight) nbrOfMatchingNodes++;
    }

    if (nbrOfMatchingNodes >= settings.minNbrOfMatchingNodes){
        remBlockMessage += `\n👌 <b>${node.name}</b> OK : ${node.blockHeight}`;
        returnValue.status = "OK";
    } else {
        remBlockMessage += `\n⚠️ <b>${node.name}</b> NOT OK : ${node.blockHeight}`
    }

    returnValue.message = refBlockMessage + `\n` + remBlockMessage;
    
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                              setForgingOn                                                //
//                                                                                                          //
//**********************************************************************************************************//
const setForgingOn = async (nodeArray) => {
    let returnValue = {message: "", status: "NOK"};

    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    const replyForgeOn = await axios
    .post( node.url + node.port + "/api/delegates/forging/enable" , { secret: node.secret } )
    .catch( () =>  {
      winston.log('debug','Error in setForgingOn');
      returnValue.message = "Sorry. Switching on forging was not successfull.";
      return (returnValue);
    });

    if (!replyForgeOn || !replyForgeOn.data ){
        returnValue.message = "Sorry. Switching on forging was not successfull.";
        return (returnValue);
    }

    if ( !replyForgeOn.data.success ){
        returnValue.message = 'Sorry. Switching on forging was not successfull: ' + replyForgeOn.data.error ;
        return (returnValue);
    }

    returnValue.message = "Forging was switched on for " + node.name;
    returnValue.status = "OK";
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                              setForgingOff                                               //
//                                                                                                          //
//**********************************************************************************************************//
const setForgingOff = async (nodeArray) => {
    let returnValue = {message: "", status: "NOK"};

    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    const replyForgeOff = await axios
    .post( node.url + node.port + "/api/delegates/forging/disable" , { secret: node.secret } )
    .catch(function (error) {
      winston.log('debug',error);
      return "Sorry. Switching off forging was not successfull.";
    });

    if (!replyForgeOff || !replyForgeOff.data ){
        returnValue.message = "Sorry. Switching off forging was not successfull.";
        return (returnValue);
    }

    if ( !replyForgeOff.data.success ){
        returnValue.message = 'Sorry. Switching off forging was not successfull: ' + replyForgeOff.data.error ;
        return (returnValue);
    }

    returnValue.message = "Forging was switched off for " + node.name;
    returnValue.status = "OK";
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                             restartCore                                                  //
//                                                                                                          //
//**********************************************************************************************************//
const restartCore = async (nodeArray) => {
    let returnValue = {message: "", status: "NOK"};

    if (nodeArray.length != 1)
        return 'Sorry. Nodename not found or there is more then one server configured with the same name!';

    let node = nodeArray[0];

    const replyRestart = await axios
        .post(node.url + node.monitorServicePort + "/api/node", querystring.stringify({ password: 'weakpassword', request: 'restart'}))
        .catch( () => {
            winston.log('debug','Error in rebuildNode');
            returnValue.message = "Sorry. Restarting core was not successfull.";
            return (returnValue);
        });

    if (!replyRestart || !replyRestart.data ){
        returnValue.message = "Sorry. Restarting was not successfull.";
        return (returnValue);
    }

    if (!replyRestart.data.status == "OK"){
        returnValue.message = replyRestart.data.message;
        returnValue.status = "OK";
    } else {
        returnValue.message = replyRestart.data.message;
        returnValue.status = "NOK";
    }
    return (returnValue);
};

//**********************************************************************************************************//
//                                                                                                          //
//                                          getNodesBlockHeight                                             //
//                                                                                                          //
//**********************************************************************************************************//
const getNodesBlockHeight = async (nodes) => {
    let returnNodes = [];
   
       for (let node of nodes) {
           node.blockHeight = await getNodeBlockHeight(node).catch(() => {
            node.blockHeight = 'undefined'; 
            winston.log('debug',"unhandled error in 'getNodesBlockHeight'");
        });
         returnNodes.push(node);
       }
       return returnNodes;
};

//**********************************************************************************************************//
//                                                                                                          //
//                                          getNodeBlockHeight                                              //
//                                                                                                          //
//**********************************************************************************************************//
const getNodeBlockHeight = async (node) => {
  const blockHeightData = await axios
    .get(node.url + node.port + "/api/loader/status/sync")
    .catch( () => {
      winston.log('debug','Error in getNodeBlockHeight');
    });

  if (!blockHeightData || !blockHeightData.data || !blockHeightData.data.height) return 'undefined';

  return blockHeightData.data.height;
};

exports.checkBlockHeight    = checkBlockHeight;
exports.checkBlockHeights   = checkBlockHeights;
exports.setForgingOn        = setForgingOn;
exports.setForgingOff       = setForgingOff;
exports.restartCore         = restartCore