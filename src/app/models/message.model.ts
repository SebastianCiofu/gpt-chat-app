export interface Message {
  id: string;
  content: string;
  imageUrl: string | null;
  timestamp: number;
  sender: string;
}
