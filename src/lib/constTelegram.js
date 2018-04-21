
const mainMenu = {
  reply_markup: {
    keyboard: [
      ["🔎 Block Heights"],
      ["📦 Servers"],
      ["Tools"],
      ["🏠 Menu"]
    ]
  }
};

const serverMenu = nodeArray => {
  if (nodeArray.length != 1)
    return {
      reply_markup: {
        keyboard: [
          ["Node not found or multiple nodes with the same name found. Please fix config.js file"],
          ["❌ Cancel"]
        ]
      }
    }
  else {
    nodeName = nodeArray[0].name;
    return {
      reply_markup: {
        keyboard: [
          ["🔎 Block Height " + nodeName, "📦 Server status " + nodeName],
          ["🔎 Logs " + nodeName],
          ["🔑 Rebuild " + nodeName, "🔑 Restart " + nodeName],
          ["🔑 Forge On " + nodeName, "🔑 Forge Off " + nodeName],
          ["🏠 Menu"]
        ]
      }
    }
  }
};

const cancelMenu = () => {
  return {
    reply_markup: {
      keyboard: [["❌ Cancel"]]
    }
  }
};

const toolsMenu = () => {
  return {
    reply_markup: {
      keyboard: [
        ["🔑 Test 2FA"],
        ["❌ Cancel"]
      ]
    }
  }
};

const logsMenu = nodeArray => {
  if (nodeArray.length != 1)
    return {
      reply_markup: {
        keyboard: [
          ["Node not found or multiple nodes with the same name found. Please fix config.js file"],
          ["❌ Cancel"]
        ]
      }
    }
  else {
    nodeName = nodeArray[0].name;
    return {
      reply_markup: {
        keyboard: [
          ["<< Back", "📄 Recent logs\n" + nodeName, 'followLogsMsg\n' + nodeName],
          ["⚠️ Forks cause 1\n" + nodeName, "⚠️ Forks cause 2\n" + nodeName, "⚠️ Forks cause 3\n" + nodeName],
          ["⚠️ Forks cause 4\n" + nodeName, "⚠️ Forks cause 5\n" + nodeName, "Logs All Forks\n" + nodeName],
          ["Logs SIGKILL\n" + nodeName, "Logs SIGABRT\n" + nodeName, "Logs Consensus\n" + nodeName]
        ]
      }
    }
  }
}

exports.mainMenu    = mainMenu;
exports.serverMenu  = serverMenu;
exports.cancelMenu  = cancelMenu;
exports.toolsMenu   = toolsMenu;
exports.logsMenu    = logsMenu;
