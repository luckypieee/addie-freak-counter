const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./log');

const data = new SlashCommandBuilder()
    .setName('reset-counter')
    .setDescription('Resets the global counter')
    .setDefaultPermission(false);

const counters = {};

const log = logger.new('reset-counter');

const execute = async (interaction) => {
    const newCounter = Date.now();
    const id = interaction.guildId ?? interaction.user.id;
    if(!counters[id]) {
        counters[id] = Date.now();
        log(`Starting counter for ${id}`);
        await interaction.reply(`Counting...`);
        return;
    }
    const daysSince = Math.floor((newCounter - counters[id]) / (24 * 60 * 60 * 1000));
    if(daysSince > 0) {
        counters[id] = newCounter;
        log(`Resetting counter for ${id} after ${daysSince} days`);
        await interaction.reply(`IT HAS BEEN ***~~${daysSince}~~*** ZERO DAYS.`);
    }
    else {
        let lugubrious = null;
        try {
            const emojis = await interaction.guild.emojis.fetch();
            lugubrious = emojis.find(e => e.name === "lugubrious");
        }
        catch(e) {
            // shrug
        }
        log(`Not resetting counter for ${id}, zero days`);
        await interaction.reply(`sigh ${lugubrious ? lugubrious.toString() : ':pensive:'}`);
    }
}

// permissions is an array where every object looks like:
// { 
//     guild: 'GUILD_ID',
//     permissions: [
//         {
//             id: 'ROLE_ID or USER_ID',
//             type: 'ROLE or USER',
//             permission: true,
//         }
//     ],
// }
// this is an allowlist -- by default, everyone is blocked
// from using the bot
const { permissions } = require('./counter.pii');
module.exports = { data, execute, permissions };
