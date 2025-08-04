export interface SafeStream {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isChatSlowMode: boolean;
  isChatLinksAllowed: boolean;
  isChatProfanityFilter: boolean;
}

export interface SafeUser {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
  stream: SafeStream | null;
}

export interface SafeUserWithFollowers extends SafeUser {
  _count: { userFollowers: number };
}
