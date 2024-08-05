export interface IMessage {
    id: string,
    message: string
    datetime: string,
}

export type MessageWithoutId = Omit<IMessage, "id">;