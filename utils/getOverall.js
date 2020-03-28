const axios = require('axios');
const cheerio = require('cheerio');
const handleError = require('node-cli-handle-error');

const chalk = require('chalk');
const yellow = chalk.yellow;
const red = chalk.red;

module.exports = async () => {
    var dat = {};
    try {
        const r = await axios.get('https://covid19.th-stat.com/th');
        const $ = await cheerio.load(r.data)
        card = $('div.card-default').text() 
        card = card.split('\n');
        var infect = card[9];
        var infectToday = card[12].split(' ')[1].split(')')[0];
        var recover = card[18];
        var recoverToday = card[20].split(' ')[1].split(')')[0];
        var active = card[26];
        var activeToday = card[28].split(' ')[1].split(')')[0];
        var dead = card[34];
        var deadToday = card[36].split(' ')[1].split(')')[0];
        time = $('div.block-title-page>h2').text()
        var updateTime = time.split(" : ")[1];
    } catch (err) {
        handleError('API is down', err, false);
    }
    print = () => {
        console.log(yellow("TODAY : "))
        console.log(`Infected cases  : ${red(infectToday)}`)
        console.log(`Recovered cases : ${red(recoverToday)}`)
        console.log(`Dead            : ${red(deadToday)}`)
        console.log(`Active cases    : ${red(activeToday)}`)
        console.log();
        console.log(yellow("TOTAL : "))
        console.log(`Infected cases  : ${red(infect)}`)
        console.log(`Recovered cases : ${red(recover)}`)
        console.log(`Dead            : ${red(dead)}`)
        console.log(`Active cases    : ${red(active)}`)
        console.log();
    }
    return print;
}