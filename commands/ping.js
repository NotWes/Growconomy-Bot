const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args, reply) => {
  const m = await reply("Gathering Data...");
  
  const pingEmbed = new RichEmbed()
    .setTitle("PONG!")
    .setAuthor(message.author.tag, message.author.displayAvatarUrl)
    .setColor("#36393E")
    .setDescription(`
:ping_pong:
Latency: ${m.createdTimestamp - message.createdTimestamp} **MS**
API Latency: ${Math.round(client.ping)} **MS**
`)
  
};

module.exports.help = {
  name: "ping"
}
