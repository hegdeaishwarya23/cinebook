export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;       // e.g. "2h 14m"
  rating: number;         // e.g. 8.4
  posterUrl?: string;
  showtimes: string[];    // e.g. ["16:45", "19:30", "22:10"]
}