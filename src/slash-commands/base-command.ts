import {
  BasicResponse,
  BlockKitResponse,
  SlackSlashCommand,
  SlackSlashCommandPayload,
} from "./types";

import { splitSpacesExcludeQuotes as splitter } from "quoted-string-space-split";

type Command = {
  command: String;
  utility: String;
  times?: number;
  args?: Array<string>;
};

export abstract class BaseCommand implements SlackSlashCommand {
  protected parse(payload: SlackSlashCommandPayload): Command {
    const { command, text } = payload;
    const [utility, ...params] = splitter(text)

    return {
      command,
      utility,
      times: this.findTimes(params),
      args: params,
    };
  }

  private findTimes(args: Array<string>): number {
    const x = args.filter((arg) => arg.charAt(0) === "x");
    return x.length > 0 ? parseInt(x[0].replace("x", "")) : 1;
  }

  abstract get routes(): Array<string>;
  abstract process(
    payload: SlackSlashCommandPayload
  ): Promise<BasicResponse | BlockKitResponse>;
}
