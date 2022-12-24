import { DiscordRequest } from './discord.utils.js';
import Commands from "../commands.json" assert { type: "json" };

export async function HasGuildCommands (appId, guildId, commands) {
    if (guildId === '' || appId === '') return;

    commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand (appId, guildId, command) {
    // API endpoint to get and post guild commands
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    try {
        const res = await DiscordRequest (endpoint, {method: 'GET'});
        const data = res ? await res.json() : null;

        if (data) {
            const installedNames = data.map((c) => c['name']);
            // This is just matching on the name, so it's not good for updates
            if (!installedNames.includes(command['name'])) {
                console.log(`Installing "${command['name']}"`);
                InstallGuildCommand (appId, guildId, command);                
            } else {
                console.log(`"${command['name']}" is already installed`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// Gets all commands
export function GetGuildCommands() {
    const {commands} = Commands;
    console.log(commands);
    const commandsName = commands.map((c) => c['command']);
    return commands;
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