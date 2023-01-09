import { Client, GatewayIntentBits } from 'discord.js';
import { GetMessageByChannelId } from "./discord/discord.utils.js";
import { CheckAddress } from './web3/commands/index.js'
import dotenv from "dotenv";
dotenv.config()

const client = new Client({ intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                            ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    const { bot, username, discriminator } = message.author;
    const channelId = message.channelId.toString();

    if(bot) return;

    message.channel.send(eval(GetMessageByChannelId(channelId)));
});

client.login(process.env.BOT_TOKEN);