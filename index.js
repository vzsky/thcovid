#!/usr/bin/env node

process.on('unhandledRejection', (err) => {
	handleError(`UNHANDLED ERROR`, err);
});

const ora = require('ora');
const spinner = ora({ text: '' });
const handleError = require('node-cli-handle-error');
const cli = require('./utils/cli.js');
const getOverall = require('./utils/getOverall.js');
const getProvinces = require('./utils/getProvinces.js');

const limit = cli.flags.limit;

(async () => {
    spinner.start();
    overall = await getOverall();
    provinces = await getProvinces(limit);

    spinner.stopAndPersist();

    overall();
    provinces();

    spinner.stop();
})();