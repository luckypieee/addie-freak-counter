const { REST } = require('@discordjs/rest');
const counter = require('./counter');
const { Routes } = require('discord-api-types/v9');
const { discordToken, clientID } = require('./auth.pii');

function fail(err) { throw err; }

const rest = new REST({ version: '9' }).setToken(discordToken);

const commands = [
    counter.data.toJSON()
];

// register commands
rest.put(
    Routes.applicationCommands(clientID),
    { body: commands },
)
.then(() => console.log('registered!'))
.catch((err) => console.warn(err));
