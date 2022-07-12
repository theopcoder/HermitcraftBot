let slash = []
const { readdirSync } = require("fs");

//THIS ONE FROM V12

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.slash.set(pull.name, pull);
                slash.push(pull);
            } else {
                continue;
            }
        }
    });

    client.on("ready", async () => {
        await client.application.commands.set(slash)
    });
}