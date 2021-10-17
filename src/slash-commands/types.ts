export type SlackSlashCommandPayload = {
  token: string
  team_id: string
  team_domain: string
  enterprise_id: string
  enterprise_name: string
  channel_id: string
  channel_name: string
  user_id: string
  user_name: string
  command: string
  text: string
  response_url: string
  trigger_id: string
  api_app_id: string
}

export enum ResponseType {
  EPHEMERAL = 'ephemeral',
  IN_CHANNEL = 'in_channel'
}

export type BlockKitResponse = {
  blocks: Array<{type: string, text: {type: string, text: string}}>
}

export type BasicResponse = {
  response_type: ResponseType
  text: string
}

export interface SlackSlashCommand {
  get routes(): Array<string>
  process(payload: SlackSlashCommandPayload): Promise<BasicResponse | BlockKitResponse>
  helpMessage?: string | BlockKitResponse
}
