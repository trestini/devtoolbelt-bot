import { BasicResponse, ResponseType, SlackSlashCommandPayload } from './../types';
import { range } from 'ramda';
import { BaseCommand } from '../base-command';

export default class extends BaseCommand {

  get routes() {
    return ["pastdate", "past-date"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {

    const command = super.parse(payload);

    const responseText = range(0, command.times)
      .map(this.randomPastDate)
      .map(isoDate => "`" + isoDate + "`")
      .join("\n");

    return {
      "response_type": ResponseType.EPHEMERAL,
      "text": responseText
    }
  }

  private randomPastDate(): string {
    const aDay = 1000 * 60 * 60 * 24;
    const rand = Math.random() * 30;

    return new Date(Date.now() - aDay * rand).toISOString()
  }

}

