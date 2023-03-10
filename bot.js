require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Discord = require('discord.js');
const client = new Discord.Client()
const token = process.env.DISCORD_TOKEN;
const url = process.env.URL;
const moment = require('moment-timezone');

const record = async (guild, channel, author, content, date) => {
    let endpoint = url + `?guild=${guild}&channel=${channel}&author=${author}&content=${content}&date=${date}`

    let response = await fetch(endpoint)
        .then(resp => resp.text())
        .catch(err => console.log(err))

    return await response;
}

client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
    let date = moment().tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss');
    record(msg.guild.name, msg.channel.name, msg.author.username, msg.content, date)
        .then(r => console.log(r))
        .catch(err => console.log(err));
})

