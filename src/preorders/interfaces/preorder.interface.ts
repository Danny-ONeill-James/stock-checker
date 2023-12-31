export interface IPreorder {
  id: string;
  title: string;
  firestormLink: string;
  game: string;
  image: string;
  hasBeenCommunicated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
