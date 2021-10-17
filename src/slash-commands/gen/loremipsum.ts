import {
  BasicResponse,
  ResponseType,
  SlackSlashCommandPayload,
} from "./../types";
import { BaseCommand } from "../base-command";
import { ifElse, range } from "ramda";
import { LoremIpsum } from "lorem-ipsum";

export default class extends BaseCommand {
  get routes() {
    return ["loremipsum", "lorem", "loren", "lipsum"];
  }

  async process(payload: SlackSlashCommandPayload): Promise<BasicResponse> {
    const command = super.parse(payload);

    const [sentenceOrParagraph, ..._] = command.args;

    console.log('arg', sentenceOrParagraph);

    const lorem = new LoremIpsum();

    const responseText = sentenceOrParagraph &&
        sentenceOrParagraph.charAt(0).toLowerCase() === "s" 
        ? lorem.generateSentences(command.times)
        : lorem.generateParagraphs(command.times);


    return {
      response_type: ResponseType.EPHEMERAL,
      text: "```" + responseText + "```",
    };
  }

}
