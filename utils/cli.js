
const meow = require('meow');
const chalk = require('chalk');
const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;

module.exports = meow(
	`
	Usage
	    ${green(`thcovid`)} ${yellow(`[OPTIONS]`)}
	Options
        ${green(`--help`)}                  ${cyan(`show this page`)}
        ${green(`--province -p [N]`)}       ${cyan(`show N top provinces`)}
	Examples
	    -
	❯ You can also run command + option at once:
	    -
`,
	{
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			limit : {
                alias : 'l',
                type : 'number',
                default : 100
            }
		}
	}
);