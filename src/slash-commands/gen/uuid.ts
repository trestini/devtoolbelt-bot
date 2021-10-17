import { v4 } from 'uuid';
import { BasicResponse, ResponseType, SlackSlashCommandPayload } from './../types';
import { range } from 'ramda';
import { BaseCommand } from '../base-command';

export default class extends BaseCommand {

  get routes() {
    return ["uuid", "uuidv4"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {

    const command = super.parse(payload);

    const responseText = range(0, command.times)
      .map(_ => v4())
      .map(uuid => "`" + uuid + "`")
      .join("\n");

    return {
      "response_type": ResponseType.EPHEMERAL,
      "text": responseText
    }
  }

}

