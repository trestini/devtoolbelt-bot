import { BasicResponse, ResponseType, SlackSlashCommandPayload } from './../types';
import { BaseCommand } from '../base-command';

export default class extends BaseCommand {

  get routes() {
    return ["now"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {
    return {
      "response_type": ResponseType.EPHEMERAL,
      "text": "`" + new Date().toISOString() + "`"
    }
  }

}

