const axios = require('axios');
const handleError = require('node-cli-handle-error');
const orderBy = require('lodash.orderby');
const chalk = require('chalk');
const url = "https://opend.data.go.th/opend-search/vir_3300_1585285658/query?dsname=vir_3300_1585285658&path=vir_3300_1585285658&loadAll=1&type=json&limit=100&offset=0"

const yellow = chalk.yellow;
const red = chalk.red;

module.exports = async (limit) => {
    var dat = {};
    try {
        var offRecord = 0;
        const r = await axios.get(url, {headers: { 'api-key': 'F8rXfcrWL0rfaLMR8oz5tcKm3LPyTdh5'}});
        allProvinces = r.data.data;
        for (let i in allProvinces) {
            let Province = allProvinces[i]
            Province['Count of no'] = parseInt(Province['Count of no']);
            if (Province.Province == '(blank)' || Province == 'ไม่ทราบ') { 
                offRecord+=Province['Count of no']; 
                allProvinces.splice(i, 1);
            }
        }
        allProvinces = orderBy(
			allProvinces,
            'Count of no',
            "desc"
        ).splice(1, limit);
        
    } catch (err) {
        handleError('API is down', err, true);
    }
    
    print = () => {
        console.log(yellow("list of active cases split by province\n"));
        console.log(` ${yellow("Province")} \t\t ${yellow("Cases")} `)
        for (let i in allProvinces) {
            let Province = allProvinces[i];
            if (Province.Province == '(blank)' || Province == 'ไม่ทราบ') { 
                continue; 
            }
            process.stdout.write(` ${Province.Province}`);
            for (let c = 0; c < 10-Province.Province.length; c++) process.stdout.write(' ');
            if (Province.Province == 'บุรีรัมย์') process.stdout.write('\t');
            console.log(`\t\t ${red(Province['Count of no'])} `)
        }
        console.log();
        console.log(yellow(`More ${offRecord} patients with unspecified province`))
        console.log();
    }

    return print;
}