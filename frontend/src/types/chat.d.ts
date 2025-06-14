export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  name?: string; // User's name
  avatar?: string; // User's avatar (optional)
}
