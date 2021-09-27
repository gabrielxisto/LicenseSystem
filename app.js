const Discord = require("discord.js");
const Collection = ("discord.js"); 
const client = new Discord.Client();
const config = require("./config.json");
const path = require('path');
const fs = require('fs');

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clientes"
});


client.on('ready', () => { 
  console.log(`Logado em ${client.user.tag} em ${client.channels.size} canais, com ${client.users.size} usuarios e em ${client.guilds.size}\nCriado e desenvolvido por ${config.author}`)
});

client.commands = new Discord.Collection();
client.queues = new Map();

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  if(comando == "addlicense") {
	if (message.member.hasPermission("BAN_MEMBER")) {
			console.log("Conectado!");
			var discordidentification = args[0];
			var name = args[1];
			var cpf = args[2];
			var sql = "INSERT INTO customers ( discordid, name, cpf ) VALUES ('" + discordidentification + "','" + name + "', '" + cpf + "')";
			con.query(sql, function (result) {   
	  			console.log("Licença adicionada com sucesso");
			});
			message.reply("Licença foi adicionada com sucesso em nosso banco de dados")
		}
	}
	if(comando == "ip") {
				console.log("Conectado!");
				var discordid = message.author.id
				var ip = args[0];
				var nameserver = args[1]
				var sql = "UPDATE customers SET address= '" + ip + "' WHERE discordid='" + discordid + "'  ";
				var sql2 = "UPDATE customers SET nameserver= '" + nameserver + "' WHERE discordid='" + discordid + "'  ";
				con.query(sql, function (result) {
					  console.log("IP Mudado com sucesso");
				});
				await(3000)
				con.query(sql2, function (result) {   
					console.log("Nome do server mudado com sucesso");
			  	});
				const embed = new Discord.MessageEmbed()
				  .setTimestamp()
				  .setFooter("MX Dev 2021")
				  .setTitle("Dados atuais")
				  .addFields(
					{ name: 'IP', value: ip },
					{ name: 'SERVER NAME', value: nameserver },
				)				  
				.setColor("#ff0000");
				message.reply("Você mudou o IP e Nome do Servidor com sucesso!").then(message=>message.delete({timeout:"7000"}));
				message.channel.send(embed).then(message=>message.delete({timeout:"7000"}));
		}
});


client.login(config.token);
