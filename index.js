const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
client.once('ready', () => {
    client.user.setActivity("EXOTICS OFFICIAL", {type: "STREAMING"})
	console.log('Ready!');
});

Canvas.registerFont("lemonic.otf", {family: "lbold"});
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

client.on('guildMemberAdd', async member => {
    
    
    
	const channel = member.guild.channels.cache.find(ch => ch.topic === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://media.discordapp.net/attachments/860893996289359883/861167054475624458/20210704_141740.jpg');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);


	context.font = '20px lbold';
	context.fillStyle = '#ffffff';
	context.fillText('Welcome to EXOTICS OFFICIAL!', canvas.width / 2.5, canvas.height / 3.5);

	context.font = '45px lbold';
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}`, canvas.width / 2.5, canvas.height / 1.55);
  
  context.font = ' 30px lbold';
  context.fillStyle = '#FFFFFF';
  context.fillText(`YOU ARE ${client.users.cache.size}th MEMBER`, canvas.width / 5.5, canvas.height / 1.05 );

	context.beginPath();
	context.arc(105, 105, 80, 0, Math.PI * 2, true);
  context.strokeStyle = '#ffffff';
  context.lineWidth = 6;
  context.stroke();
  context.save();
	context.closePath();
	context.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 175, 175);
  

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);

});


client.login('ODYwODk2MTM2MTgzOTM5MDcz.YOB6AQ.oDqa1NCdCvKRqGGRTM5JzxUI5Vo');
