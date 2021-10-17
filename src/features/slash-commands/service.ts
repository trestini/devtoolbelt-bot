import { Next, Context } from "koa";
import { readdirSync } from 'fs';
import { SlackSlashCommandPayload } from "../../slash-commands/types";

const LOADED = {};

const basePath = "./src/slash-commands";
const baseModules = "../../slash-commands";

// commands
readdirSync(basePath, {withFileTypes: true})
  .filter(e => e.isDirectory())
  .map(d => d.name)
  .forEach(command => {

    LOADED[command] = {};
    
    // utilities
    readdirSync(`${basePath}/${command}`, {withFileTypes: true})
      .filter(e => e.isFile())
      .map(d => d.name)
      .forEach(utility => {
        const module = utility.substr(0, utility.lastIndexOf('.'));
        console.log(`[AUTOLOAD] >> Loading ${baseModules}/${command}/${module}`);
        const Utility = require(`${baseModules}/${command}/${module}`).default;
        const clazz = new Utility();
        clazz.routes.forEach(r => LOADED[command][r] = {instance: clazz, file: `${command}/${utility}`})
      });
  });

export async function slashCommands(ctx: Context, next: Next) {
  const request = ctx.request.body as SlackSlashCommandPayload;
  const { command, text } = request;
  const [utility, ..._] = text.split(" ");

  const clazz = LOADED[command.substr(1, command.length)][utility].instance;

  const response = await clazz.process(request);

  ctx.status = 200;
  ctx.body = response;

  await next();
}
