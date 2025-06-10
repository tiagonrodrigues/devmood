export interface User {
  username: string;
  firstName: string;
  lastName: string;
}

export interface Mood {
  id: string;
  emoji: string;
  rating: number;
  comment: string | null;
  tech: string | null;
  date: string;
  user: User;
}

// Explore page feed interface

export interface MoodsResponse {
  data: Mood[];
  total: number;
  hasMore: boolean;
}
