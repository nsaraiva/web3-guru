import express from "express";
import { VerifyDiscordRequest } from "./discord/discord.utils.js";
import { HasGuildCommands, GetMyGuildCommands, GetCommandContentByName } from "./discord/discord.commands.js";
import { RandomQuotes, Namaste } from "./web3/web3.commands.js";
import { InteractionType, InteractionResponseType, InteractionResponseFlags, MessageComponentTypes, ButtonStyleTypes } from "discord-interactions";
import dotenv from "dotenv";
dotenv.config()

// Create an express app
const app = express();
// Get port, or default to 3000
const port = process.env.PORT || 3000;
const channelIdArray = process.env.CHANNEL_IDS.split(',');

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async function (req, res){
    const { type, id, channel_id, data} = req.body;

    // Handle verification requests
    if (type === InteractionType.PING) {
        res.send({ type: InteractionResponseType.PONG });
    }

    // Handle slash command requests
    if (type === InteractionType.APPLICATION_COMMAND && channelIdArray.includes(channel_id)) {
        const { name } = data;
        
        res.send({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: eval(GetCommandContentByName(name)),
            },
        });
    } else {
        res.send({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Eu não respondo nesse canal... 🙏",
            },
        });
    }
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);

    // Check if guild commands from commands.json are installed (if not, install them)
    HasGuildCommands(process.env.APP_ID, process.env.GUILDS_ID, GetMyGuildCommands());
});