module.exports.run = async (client) => {
  await client.user.setActivity(`${client.guilds.size} servers | ${prefix}help`, { type: "WATCHING"});
  await client.user.setStatus("online");
  console.log(`Growconomy bot its online. Currently serving ${client.users.size} users in ${client.guilds.size} guilds and ${client.channels.size} channels.`);
}; 
