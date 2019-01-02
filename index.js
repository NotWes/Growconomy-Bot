const { Client, Collection } = require("discord.js");
const client = new Client({
  disableEveryone: true,
  messageCacheMaxSize: 50,
   messageCacheLifetime: 14400,
   messageSweepInterval: 900,
   restWsBridgeTimeout: 3500,
   disabledEvents: ["RESUMED", "GUILD_UPDATE", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_MEMBER_UPDATE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE", "MESSAGE_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "TYPING_START", "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE"]
});
const { token } = require("./config.js");
client.commands = new Collection();
const fs = require("fs");

// Event Loader & Handler
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    console.log(`Event Loaded: ${file.split(".")[0]}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

// Command Loader
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("# No commands we're found!!!");
      return;
    }
  
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`Command Loaded: ${f.split(".")[0]}`);
      client.commands.set(props.help.name, props);
    });
});

client.on("disconnect", async () => console.log("Bot it's disconnecting..."))
  .on("error", async (err) => console.error(err))
  .on("warn", async (msg) => cosnole.warn(msg))
  .on("reconnecting", async () => console.log("Bot it's reconnecting..."));

client.login(token);
