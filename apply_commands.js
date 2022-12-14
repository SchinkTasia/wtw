const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = "MTAyNzU0OTMyMDYzMjg4MTE4Mg.GuwQ5p.LjO44jq9oCW3deMfNQYOfaTyIYZykAi0eo7H58"; 
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log("Modules to load: "+commandFiles);

const clientId = '1027549320632881182';
const guildId = '973176525060968468';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(command.data);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();