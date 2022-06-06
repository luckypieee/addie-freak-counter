# counter-bot

Discord bot with a `/reset-counter` command, that counts the number of days since a context-dependent event.

## Setup

1. Install dependencies:

    ```
    $ npm install
    ```

2. Fill out `auth.pii.js` with the following information:

    ```js
    module.exports = {
        discordToken: "<your Discord bot token>",
        clientID: "<your Discord bot account's client ID>"
    };
    ```

3. Fill out `perms.pii.js` with the following information:

    ```js
    module.exports = {
        'guildID': ['server-roles', 'allowed-to', 'reset-counter']
    };
    ```

    Any guild specified in perms.pii will have the list of allowed roles as an allowlist -- anyone else will be disallowed from using the bot. Any guild not specified in perms.pii will by default allow everyone to use the bot.

4. Run `node register.js` to register bot commands on Discord (one-time).

5. Invite the bot to your Discord server with the following API link

    ```
    https://discord.com/api/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&permissions=329792&scope=bot%20applications.commands
    ```

6. Run `node index.js` to start the bot.

## License

Provided under MIT license; see LICENSE.md.
