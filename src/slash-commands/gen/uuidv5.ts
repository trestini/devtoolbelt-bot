import { v5 } from "uuid";
import {
  BasicResponse,
  ResponseType,
  SlackSlashCommandPayload,
} from "./../types";
import { range } from "ramda";
import { BaseCommand } from "../base-command";

export default class extends BaseCommand {
  get routes() {
    return ["uuidv5"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {
    const command = super.parse(payload);

    const [name, namespace, ..._] = command.args;

    const responseText = range(0, command.times)
      .map((_) => v5(name, namespace))
      .map((uuid) => "`" + uuid + "`")
      .join("\n");

    return {
      response_type: ResponseType.EPHEMERAL,
      text: responseText,
    };
  }
}
