const commander = require('commander');
const inquirer = require('inquirer');
const path = require('path');

const { version, description } = require(path.join(__dirname, '../package.json'))
commander.program.version(version).description(description);

commander.program.command('init')
	.argument('[name]', '组件名', 'demo')
	.description('根据模版创建组件')
	.action((name) => {
		console.log(name)
	})

commander.program.command('build')
	.action(() => {
		
	})

commander.parse(process.argv);