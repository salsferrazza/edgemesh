/* eslint no-var: 0 */

var exec = require('child_process').exec;
var inquirer = require('inquirer');
var chalk = require('chalk');

var version = {
	name: 'bump',
	message: 'How would you like to bump your version?',
	default: 'patch',
	choices: [ 'patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease' ],
	type: 'list'
};

inquirer.prompt([ version ]).then(answers => {
	exec('npm --no-git-tag-version version ' + answers.bump, (error, stdout) => {
		if (error !== null) {
			console.log(chalk.red(error));
		}
		console.log(stdout);
	});
});
