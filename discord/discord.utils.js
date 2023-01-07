import { REST, Routes} from 'discord.js';
import Commands from "../commands.json" assert { type: "json" };

// Gets message by channel id
export function GetMessageByChannelId(channelId) {
  const {commands} = Commands;
  const message = commands.find((c) => c['channelId'] === channelId);
  return message['run'];
};