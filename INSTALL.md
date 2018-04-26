# How to install multiNodeBot

## Pre-requisites

### Telegram Bot API Token

 - Search for the [@BotFather](https://telegram.me/BotFather) on Telegram
 - Send a /newbot command to the BothFather
 - Follow the steps that the BotFather is telling you
 - At the end the BotFather gives you your HTTP API key which you need later in your config file
 - Click on the link that the BotFather gives you in the same message (i.e.: t.me/MyNewBot )
 - Click on START at the bottom of telegram (this should add the bot to your contacts)
 
### Git

`cd ~`

`sudo apt-get install git`

### Node.js

Login to your server that you want to use to monitore your Onz servers

`cd ~`

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

## Install multiNodeBot

  Login to your server that you want to use to monitore your Onz servers

 `git clone https://github.com/tool462/multiNodeBot.git`
 
 `cd multiNodeBot`
 
 `npm install`
 
 `cp src/config_mainnet.js src/config.js`
 
 --------
 
 ### 2FA (Google Authenticator)

  Login to your server that you want to use to monitore your Onz servers

  `cd ~`

  `cd multiNodeBot`

  `npm run generate-password`

  Scan the QR-Code with your Google Authenticator App

  Copy the generated secret at the end

  `nano src/config.js`

  paste the secret to exports.OTPsecret="Paste your secret here"
  
  close and safe config.js file
  
### Add Telegram chatId to config.js

  start your bot: `npm start`
  
  go to your telegram application and send any messaage to your new bot

  the bot should reply with your personal chatId (i.e.: 123456789 )
  
  copy and paste the chatId to your config.js file ( exports.chatId = "123456789" )

### Customize config.js

  Add your server data to the 'remote servers' section

  Please don't use the following strings in your server names:
  back / log / block / height / server / tool / forge / status
 
  close and safe config.js file
  
  `npm stop`
  
  `npm start`
