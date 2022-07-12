const { readdirSync } = require("fs");

module.exports = (client) => {

  const commands = readdirSync(__dirname.replace("/handlers")).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
      let pull = require(`${__dirname.replace("/handlers")}/${file}`);

      pull.event = pull.event || file.replace(".js", "");

      //BUG the code below seems to cause an issue | unsure of cause
      client.on(pull.event, pull.run.bind(null, client));

    } catch(err) {
      console.log("Error While loading");
      console.log(err);
    }
  }
}