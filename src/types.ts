export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    street: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
