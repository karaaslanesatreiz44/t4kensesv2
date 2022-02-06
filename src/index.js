const Discord = require('discord.js-selfbot');

const moment = require('moment');

const chalk = require('chalk');

const config = require('./config.js')

const token = config.Token;

const clients = [];

function log(logMsg) {

    if (!logMsg) return console.log('Konsola loglanması gereken log mesajı belirtilmemiş.');

    console.log(chalk.gray(moment().format("HH:mm:ss YYYY-MM-DD")) + chalk.cyan.bold(' [INFO] ') + chalk.white.bold(logMsg));

};

for (let s = 0;s<config.Token.length;s++) { clients.push(new Discord.Client()); }

for (let i = 0;i<clients.length;i++) { clients[i].login(`${token[i]}`) }

for (let k = 0;k<clients.length;k++) {

    clients[k].on('ready', () => {

        const channel = clients[k].channels.cache.get(config.ChannelId)

        if (!channel) {

            throw new Error('Böyle bir kanal bulunamadı')

            process.exit()

        }

        clients[k].channels.cache.get(config.ChannelId).join().then(kanal => kanal.voice.setSelfMute(true));

        setInterval(() => {

            clients[k].channels.cache.get(config.ChannelId).join().then(kanal => kanal.voice.setSelfMute(true));

            clients[k].user.setStatus('dnd');

        }, 60000);

        log(`Self-Bot ${clients[k].user.tag} adı ile aktif!`);

    });

};
