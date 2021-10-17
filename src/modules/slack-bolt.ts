import ConfigHandler from "../utils/config-handler";
import Bootable from "../utils/bootable";
import { App } from '@slack/bolt'

export default class SlackBolt implements Bootable {

  config: ConfigHandler;

  async boot(){

    const port = this.config.contents.boltPort || 3000;

    // Initializes your app with your bot token and signing secret
    const app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET
    });
    
    (async () => {
      // Start your app
      await app.start(port);
    
      console.log('⚡️ Bolt app is running!');
    })();
  }
  
}
