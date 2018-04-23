# How to install multiNodeBot

## Pre-requisites

### Telegram Bot API Token

 - Search for the [@BotFather](https://telegram.me/BotFather) on Telegram
 - Send a /newbot command to the BothFather
 - Follow the steps that the BotFather is telling you
 - At the end the BotFather gives you your HTTP API key which you need later in your config file
 
 
 
 
 

### Node.js

cd ~

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs


## Install

 git clone https://github.com/tool462/multiNodeBot.git
 
 cd multiNodeBot
 
 npm install
 
 cp src/config_mainnet.js src/config.js
 
 
