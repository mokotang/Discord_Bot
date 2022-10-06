// メッセージが作成された時のイベント処理

const { GuildManager, ThreadChannel } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
		console.log(message);
    // Bot自身の発言は無視
    if (message.author.id == message.client.user.id || message.author.bot) {
      return;
    }

    // console.log(message.mentions);

    // "おみくじ"という文言がメッセージに含まれている場合
    if (message.content.match(/おみくじ/)) {
      console.log("おみくじルート");

      let resMsg = lotteryByWeight();
      console.log(resMsg);
      sendReply(resMsg);
      return;

    // "にゃーん"or"にゃ～ん"という文言がメッセージに含まれている場合  
    } else if (message.content.match(/にゃーん|にゃ～ん/)) {
      console.log("にゃーんルート");
      let text = "にゃ～ん";
      sendReply(text);
      return;

      // メンションに対する反応
    } else if ( message.mentions.has(message.client.user, {ignoreEveryone: true}) ) {
      
      // アクティブスレッド一覧を表示するルート
      if (message.content.match(/test/)) {
        console.log("アクティブスレッド一覧testルート");
        let activeThreads = [];
        
        message.client.guilds.fetch(process.env.DISCORD_GUILD_ID)
          .then((guild) => {
            // console.log(guild.channels.fetchActiveThreads());
            return guild.channels.fetchActiveThreads();
          })
          .then((result) => {
            // console.log(result.threads);
            let replyMessage = "";            
            result.threads.each((thread)=> {
              console.log(thread);
              replyMessage += "<#" + thread.id + ">\n";
            });
            sendReply(replyMessage);
          })
          .catch(console.error);

      } else {
        sendReply("気やすく呼んでんじゃにゃあ！");
        return;
      }
    }
    
    // おみくじ関数
    function lotteryByWeight() {
      let messageArray = [
          "大吉、一緒に遊んであげるにゃ",
          "吉、ぼちぼちだにゃ",
          "凶、ラッキーアイテムはチュールだにゃ",
          "大凶、〇ねにゃ！！",
        ];
      let weightArray = [10, 30, 30, 30];
      let totalWeight = 0;
      for (var i = 0; i < weightArray.length; i++) {
        totalWeight += weightArray[i];
      }
      let random = Math.floor(Math.random() * totalWeight);
      for (var i = 0; i < weightArray.length; i++) {
        if (random < weightArray[i]) {
          return messageArray[i];
        } else {
          random -= weightArray[i];
        }
      }
      console.log("lottery error");
    }

    // リプライを送る関数
    function sendReply(text) {
      // console.log(message);
      message
        .reply(text)
        .then(console.log("リプライ送信: " + text))
        .catch(console.error);
    }

    // メッセージを送る関数
    function sendMsg(channelId, text, option = {}) {
      message.client.channels
        .fetch(channelId)
        .send(text, option)
        .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
        .catch(console.error);
    }
  },
};