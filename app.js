import { Client, Events, GatewayIntentBits } from 'discord.js';
import { GetMessageByChannelId } from "./discord/discord.utils.js";
import { CheckWallet } from './web3/commands/index.js'
import dotenv from "dotenv";
dotenv.config()

const client = new Client({ intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMessageReactions
                            ]
});

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, (message) => {
    const { bot, username, discriminator } = message.author;
    const channelId = message.channelId.toString();

    if(bot) return; // Ignore bot messages

    eval(GetMessageByChannelId(channelId)); // Execute the function that matches the channel id
});

client.login(process.env.BOT_TOKEN);