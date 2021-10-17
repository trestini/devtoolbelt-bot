import { BasicResponse, ResponseType, SlackSlashCommandPayload } from './../types';
import { range } from 'ramda';
import { BaseCommand } from '../base-command';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export default class extends BaseCommand {

  get routes() {
    return ["date"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {

    const command = super.parse(payload);

    const responseText = range(0, command.times)
      .map(_ => this.gen(command.args))
      .map(uuid => "`" + uuid + "`")
      .join("\n");

    return {
      "response_type": ResponseType.EPHEMERAL,
      "text": responseText
    }
  }

  private gen(...args){
    const [direction, ..._] = args;
    console.log("direction", direction);
    const signal = direction[0] === "future" ? 1 : -1;
    const rand = Math.random() * 30;

    return new Date(Date.now() + signal * DAY_IN_MS * rand ).toISOString()
  }

}

