export interface LipColor {
  id: string;
  name: string;
  hexCode: string;
  price: number;
  description: string;
}

export interface ColorSuggestion {
  id: string;
  originalColor: string;
  suggestedColors: LipColor[];
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}