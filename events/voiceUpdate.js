// 音声チャンネルで何か変更があった時のイベント処理

// ボイスチャンネルの状態に変化があった時
module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(oldState, newState) {
		console.log("voiceStateUpdate");
    // console.log(oldState);
    // console.log(newState);
    if(newState.channel !== null) console.log(newState.channel.members.size);
    
    // 現世に人が誕生した時
    if(oldState.channel == null && newState.channel !== null && newState.channelId === process.env.DISCORD_MAIN_VOICE_CHANNEL_ID && newState.channel.members.size === 1) {
      let invitation;
      newState.channel.createInvite()
        .then((invite)=>{
          invitation = invite;
          return newState.guild.channels.fetch(process.env.DISCORD_MAIN_TEXT_CHANNEL_ID)
        })
        .then((channel)=>{
          // console.log(channel);
          channel.send(
            `@everyone\n\n<@${newState.id}> が <#${newState.channelId}>で通話を開始したにゃ！！\n${invitation.url}`
          );
        })
        .catch(console.error);
    }
	},
};