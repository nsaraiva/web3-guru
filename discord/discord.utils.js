import { REST, Routes} from 'discord.js';
import Commands from "../commands.json" assert { type: "json" };

// refreshing commands
export async function RefreshCommands(appId, token, commands){
  const rest = new REST({ version: '10' }).setToken(token);

  try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands(appId), { body: commands });
      console.log('Sucefully reloaded application (/) commands.');
  } catch (error){
      console.error(error);
  }
};

// Gets all slash commands
export function GetMyGuildCommands() {
  const {commands} = Commands;
  const commandsToInstall = commands.filter((c) => c['commandType'] === 'slash' && c['install'] === true);
  return commandsToInstall;
};

// Gets slash command content by name
export function GetCommandContentByName(name) {
  const commandsToInstall = GetMyGuildCommands();
  const command = commandsToInstall.find((c) => c['name'] === name);
  return command['run'];
};

// Gets message by channel id
export function GetMessageByChannelId(channelId) {
  const {commands} = Commands;
  const message = commands.find((c) => c['commandType'] === 'message' && c['channelId'] === channelId);
  return message['run'];
};