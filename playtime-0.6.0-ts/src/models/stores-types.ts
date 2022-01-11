export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Track {
  _id: string;
  playlistid: string;
  title: string;
  artist: string;
  duration: number;
};

export interface Playlist {
  _id: string;
  userid: string;
  title: string;
  tracks: Track[];
}

export interface UserStore {
  getAllUsers(): Promise<User[]>;

  addUser(user: User): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  deleteUserById(id: string): Promise<void>;

  deleteAll(): Promise<void>
}

export enum StoreType {
  mem,
}
