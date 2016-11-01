#!/usr/bin/env node
var program = require('commander');
var shell = require('shelljs');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var packageJSON = require('./package.json');

var CONFIG_LOCATION = '/usr/local/etc/edgemesh';
var CONFIG_FILENAME = 'edgemesh.conf';

program
    .version(require('./package.json').version)
    .usage('<command> [options]')
    .on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ edgemesh install ./server/static');
        console.log('    $ edgemesh update');
        console.log('    $ edgemesh check-updates');
        console.log();
    });

/**
 * Install Command
 */
program
    .command('install <path>')
    .alias('i')
    .description('install edgemesh server files at static path')
    .usage('edgemesh install ./server/static')
    .action(function(stdin) {

        checkVersion();

        if(!path.isAbsolute(stdin)) {
            stdin = path.resolve(__dirname, stdin);
        } 

        shell.exec('mkdir -p ' + CONFIG_LOCATION)
        shell.cp(path.resolve(__dirname, './edgemesh.inject.min.js'), stdin);
        shell.cp(path.resolve(__dirname, './emsw.js'), stdin);

        // Store Config
        fs.writeFile(path.join(CONFIG_LOCATION, CONFIG_FILENAME), "path: " + stdin, function(err) {
            if(err) {
                return console.log(chalk.red('Error writing edgemesh config'), err);
            }

            return console.log(chalk.green('Edgemesh installed successfully.'));

        });

    });

/**
 * Update Command
 */
program
    .command('update')
    .alias('u')
    .description('update edgemesh server files')
    .usage('edgemesh update')
    .action(function () {

        checkVersion();
        
        fs.readFile(path.join(CONFIG_LOCATION, CONFIG_FILENAME), 'utf8', function (error, data) {
            
            if (error) return console.log(chalk.red('Config file not found.', error));

            let options = {};
            let lineArr = data.split('\n');
            lineArr.forEach(function(option) {
                let arr = option.split(': ');
                options[arr[0]] = arr[1];
            });
            shell.cp(path.resolve(__dirname, './edgemesh.inject.min.js'), options.path);
            shell.cp(path.resolve(__dirname, './emsw.js'), options.path);

            return console.log(chalk.green('Edgemesh updated successfully!'));
        });

    });

/**
 * Version Command
 * 
 */

program
    .command('check-updates')
    .alias('v')
    .description('check for newer version')
    .usage('edgemesh version')
    .action(function() {
        var valid = checkVersion();
        if(valid) console.log(chalk.green('Edgemesh up to date!'));
    });

program.parse(process.argv);

function checkVersion() {
    var latestVersion = shell.exec('npm show edgemesh version', { silent: true }).stdout;
    var currentVersion = packageJSON.version;
    if(currentVersion !== latestVersion) {
        var edgemesh = chalk.white('A new version of ') + chalk.magenta('edge') + chalk.magenta.bold('mesh') + chalk.white(' is available');
        var installCommand = chalk.green('npm i -g edgemesh && edgemesh update');
        var lv = chalk.white('latest version:  ') + chalk.cyan(latestVersion.split('\n')[0]);
        var cv = chalk.white('current version: ') + chalk.yellow(currentVersion);
        console.log(chalk.dim('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'));
        console.log(chalk.dim('┃         ')          + edgemesh   + chalk.dim('          ┃'));
        console.log(chalk.dim('┃                                                         ┃'));
        console.log(chalk.dim('┃                  ') + lv  + chalk.dim('                 ┃'));
        console.log(chalk.dim('┃                  ') + cv  + chalk.dim('                 ┃'));
        console.log(chalk.dim('┃                                                         ┃'));
        console.log(chalk.dim('┃          ')   + installCommand  + chalk.dim('           ┃'));
        console.log(chalk.dim('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
        return false;
    } else {
        return true;
    }

}