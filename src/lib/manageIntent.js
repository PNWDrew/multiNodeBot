let promptIntent = {};

const intents =
{
  ASK_PASSWORD_TEST:
    "ASK_PASSWORD_TEST",
  ASK_PASSWORD_REBUILD:
    "ASK_PASSWORD_REBUILD",
  ASK_PASSWORD_RESTART:
    "ASK_PASSWORD_RESTART",
  ASK_PASSWORD_SET_FORGING_OFF:
    "ASK_PASSWORD_SET_FORGING_OFF",
  ASK_PASSWORD_SET_FORGING_ON:
    "ASK_PASSWORD_SET_FORGING_ON"
};

const initPrompt = () => {
    promptIntent = {
        //used for making the bot interactive when waiting for user input
        waitingPrompt: false,
        lastMessage: "",
        lastIntent: ""
    };
}

const cleanIntent = () => {
    promptIntent = {
        //used for making the bot interactive when waiting for user input
        waitingPrompt: false,
        lastMessage: "",
        lastIntent: ""
    };
};
  
const setIntent = (intent, message) => {
    promptIntent = {
        waitingPrompt: true,
        lastMessage: message,
        lastIntent: intent
    };
};

const getIntent = () => {
    return promptIntent;
}

exports.intents     = intents;
exports.initPrompt  = initPrompt;
exports.cleanIntent = cleanIntent;
exports.setIntent   = setIntent;
exports.getIntent   = getIntent;