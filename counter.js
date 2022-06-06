const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./log');
const fs = require('fs');
const path = require('path');


const data = new SlashCommandBuilder()
    .setName('reset-counter')
    .setDescription('Resets the global counter');

const log = logger.new('reset-counter');

const counterFile = 'counters.json';

function Counter() {
    let counters = {};
    if(fs.existsSync(counterFile)) {
        try {
            let contents = fs.readFileSync(counterFile, {encoding: 'utf-8'});
            counters = JSON.parse(contents);
        }
        catch(e) {
            log(`could not read ${counterFile} though it exists!`);
            throw e;
        }
    }
    this.set = function(id, val) {
        counters[id] = val;
        let json = JSON.stringify(counters);
        fs.writeFile(counterFile, json, err => {
            if(err) {
                log(`WARN: could not save new ${counterFile}, err: ${err}`);
                log(`setting counter[${id}] = ${val}`);
            }
        });
    }
    this.get = function(id) {
        return counters[id];
    }
}

const counter = new Counter();

const execute = async (interaction) => {
    const newCounter = Date.now();
    const id = interaction.guildId ?? interaction.user.id;
    if(!counter.get(id)) {
        counter.set(id, Date.now());
        log(`Starting counter for ${id}`);
        await interaction.reply(`Counting...`);
        return;
    }
    const daysSince = Math.floor((newCounter - counter.get(id)) / (24 * 60 * 60 * 1000));
    if(daysSince > 0) {
        counter.set(id, newCounter);
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

module.exports = { data, execute };
