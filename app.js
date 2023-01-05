import { Client, GatewayIntentBits } from 'discord.js';
import { RefreshCommands, GetMyGuildCommands, GetCommandContentByName, GetMessageByChannelId } from "./discord/discord.utils.js";
import { Namaste, RandomQuotes, CheckAddress } from './web3/commands/index.js'
import dotenv from "dotenv";
dotenv.config()

// Refreshing commands
RefreshCommands(process.env.APP_ID, process.env.DISCORD_TOKEN, GetMyGuildCommands());

const client = new Client({ intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                            ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply(eval(GetCommandContentByName(interaction.commandName)));
});

client.on('messageCreate', (message) => {
    const bot = JSON.parse(message.author.bot);

    if(bot) return;
    message.channel.send(eval(GetMessageByChannelId(message.channelId.toString())));
});

client.login(process.env.DISCORD_TOKEN);