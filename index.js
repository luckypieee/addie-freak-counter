const {Intents, Client, Collection } = require('discord.js');
const counter = require('./counter');
const logger = require('./log');
const { discordToken } = require('./auth.pii');

function fail(err) { throw err; }
const log = logger.new('index');


async function main() {
    const commands = [
        counter
    ];

    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],
    });


    client.once('ready', async () => {
        log('client up');

        client.commands = new Collection();

        await client.application.fetch();
        const appCommands = await client.application.commands.fetch();

        for(let i = 0; i < commands.length; ++i) {
            const cmd = commands[i];
            const name = cmd.data.name;
            client.commands.set(name, cmd);
            appCommands.filter(appCmd => appCmd.name === name).map(appCmd => appCmd.id).forEach(async appCmdId => {
                const appCmd = await client.application.commands.fetch(appCmdId);
                for(perm of cmd.permissions) {
                    await appCmd.permissions.add(perm);
                }
            });
        }
    
        log('commands registered');
    });

    client.on('interactionCreate', async interaction => {
        if(!interaction.isCommand()) {
            return;
        }

        const cmd = client.commands.get(interaction.commandName);

        if(!cmd) {
            return;
        }
        
        try {
            await cmd.execute(interaction);
        }
        catch(e) {
            log(`error in executing ${interaction.commandName}:\n${e}`);
        }
    });

    await client.login(discordToken);
}

main();
