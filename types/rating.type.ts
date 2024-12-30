interface RatingMap {
  [key: number]: {
    stars: number;
    count: number;
  };
}
interface RatingCount {
  stars: number;
  count: number;
}

export type { RatingMap, RatingCount };
