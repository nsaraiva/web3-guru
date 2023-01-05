import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('pong');
    }
});

client.login(process.env.DISCORD_TOKEN);