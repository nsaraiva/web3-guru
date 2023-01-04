import { DiscordRequest } from './discord.utils.js';
import Commands from "../commands.json" assert { type: "json" };

export async function HasGuildCommands (appId, guildsId, commands) {
    if (guildsId === '' || appId === '') return;

    commands.forEach((c) => HasGuildCommand(appId, guildsId, c));
}

// Checks for a command
async function HasGuildCommand (appId, guildsId, command) {
    // Guild Ids
    const guildsIdArray = guildsId.split(',');

    guildsIdArray.map((guildId) => {
        // API endpoint to get and post guild commands
        const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
        try {
            const discordRequest = DiscordRequest (endpoint, {method: 'GET'})
            .then((res) => res.json()
            .then((data) => {
                //const data = res ? await res.json() : null;
                if (data) {
                    const installedNames = data.map((c) => c['name']);
                    // This is just matching on the name, so it's not good for updates
                    if (!installedNames.includes(command['name'])) {
                        console.log(`Installing "${command['name']}" on ${guildId}`);
                        InstallGuildCommand (appId, guildId, command);                
                    } else {
                        console.log(`"${command['name']}" is already installed on ${guildId}`);
                    }
                }
            }));
        } catch (err) {
            console.error(err);
        }
    });    
}

// Gets all commands
export function GetMyGuildCommands() {
    const {commands} = Commands;
    const commandsName = commands.map((c) => c['command']);
    return commands;
}

export function GetCommandContentByName(name) {
    const {commands} = Commands;
    const command = commands.find((c) => c['name'] === name);
    return command['data']['content'];
}

// Installs a command
export async function InstallGuildCommand (appId, guildId, command) {
    // API endpoint to get and post guild commands
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
    // Install command
    try {
        await DiscordRequest (endpoint, { method: 'POST', body: command });
    } catch (err) {
        console.error(err);
    }
}