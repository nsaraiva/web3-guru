import { REST, Routes} from 'discord.js';
import dotenv from "dotenv";
dotenv.config()

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });
        console.log('Sucefully reloaded application (/) commands.');
    } catch (error){
        console.error(error);
    }

