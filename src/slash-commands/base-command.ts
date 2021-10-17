import { BasicResponse, BlockKitResponse, SlackSlashCommand, SlackSlashCommandPayload } from "./types";

const TIMES_PARAMS = /(x? ?([0-9]{1,2}))/;

type Command = {
  command: String
  utility: String
  times?: number
}

export abstract class BaseCommand implements SlackSlashCommand {

  protected parse(payload: SlackSlashCommandPayload): Command {

    const {command, text} = payload;
    const [utility, ...params] = text.split(" ");
    const resp = params.join(" ").match(TIMES_PARAMS);

    return {
      command,
      utility,
      times: resp && resp.length > 0 ? parseInt(resp[2]) : 1
    }

  }

  abstract get routes(): Array<string>
  abstract process(payload: SlackSlashCommandPayload): Promise<BasicResponse | BlockKitResponse>

}
