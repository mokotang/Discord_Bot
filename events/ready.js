// Botの準備ができた時のイベント処理

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log("Bot準備完了～");
    client.user.setPresence({ game: { name: "自宅警備" } });
    console.log(`string text ${"test"} string text`);
//     client.channels.fetch(process.env.DISCORD_MAIN_CHANNEL_ID)
//       .then(()=>{
        
//     })
//     .catch(console.error);
	},
};