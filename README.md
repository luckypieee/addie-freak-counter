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

3. Fill out `counter.pii.js` with the following information:

    ```js
    module.exports = {
        permissions: [
            PermissionObjects...
        ]
    };
    ```

    Where each `PermissionObject` looks like:

    ```json
    { 
        guild: "<id of guild where permission is to apply>",
        permissions: [
            {
                id: "<id of role or user to allow>",
                type: "<either the string 'ROLE' or the string 'USER'>",
                permission: true,
            }
        ],
    }
    ```

4. Run `node register.js` to register bot commands on Discord (one-time).

5. Invite the bot to your Discord server with the following API link

    ```
    https://discord.com/api/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&permissions=329792&scope=bot%20applications.commands
    ```

6. Run `node index.js` to start the bot.

## License

Provided under MIT license; see LICENSE.md.
