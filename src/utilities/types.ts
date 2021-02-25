export type NewClientType = {
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
}

export type ClientType = NewClientType & {
    id: string;
  };