const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class GambleCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "gamble",
            group: "economy",
            memberName: 'gamble',
            description: 'Lets you gamble with your money'
        });
    }

    async run(message, args)
    {
        let words = args.split(' ');
        let bet = words.slice(0).join(' ');
        {
            if (!bet) return message.reply(':warning: Please say how much you want to bet! Your must be $200 or more!')
            .then(msg => {
                msg.delete(10000)
            })
            if (bet < 200)return message.reply("Sorry, you have to bet $200 dollars or more!")
        }
        if (bet > db.get(`{money}_${message.author.id}`))return message.reply("Im sorry, you don't have enough money to make a **$"+bet+"** bet. You only have **$"+db.get(`{money}_${message.author.id}`)+"** dollars!");

        db.subtract(`{money}_${message.author.id}`, bet)
        var GambleBet = Math.floor(Math.random() * 8);
        if (GambleBet < 7){
            var Prize = Math.floor(Math.random() * 4);

            let Prize0 = "Congrats! You won your **$200** dollars back! ;)";
            db.add(`{money}_${message.author.id}`, 200);
            if (Prize == 0)return message.reply(Prize0);

            let Prize1 = "Congrats! You won **$250** dollars!";
            db.add(`{money}_${message.author.id}`, 250);
            if (Prize == 1)return message.reply(Prize1);

            let Prize2 = "Congrats! You won **$300** dollars!";
            db.add(`{money}_${message.author.id}`, 300);
            if (Prize == 2)return message.reply(Prize2);

            let Prize3 = "Congrats! You won **$500** dollars!";
            db.add(`{money}_${message.author.id}`, 500);
            if (Prize == 3)return message.reply(Prize3);

            let Prize4 = "Congrats! You won the mini jackpot of **$1000** dollars!";
            db.add(`{money}_${message.author.id}`, 1000);
            if (Prize == 4)return message.reply(Prize4);

            let Prize5 = "Congrats! You won the big jackpot of  **$2000** dollars!"+db.add(`{money}_${message.author.id}`, 2000);
            if (Prize == 5)return message.reply(Prize5);
        }else{
            if (db.get(`{money}_${message.author.id}`) > 50){
                message.channel.send("Sorry, "+message.author+", you lost. Take another shot! You still have **$"+db.get(`{money}_${message.author.id}`)+"** dollars!");
            }else{
                message.reply("You lost. Better luck next time!")
            }
        }
    }
}

module.exports = GambleCommand;