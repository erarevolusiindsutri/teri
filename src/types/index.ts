export interface ChatMessage {
  type: 'bot' | 'user';
  content: string;
}