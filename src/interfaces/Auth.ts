export interface User {
  id: string;
  name: string;
  email: string;
  identity: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  identity: string;
}
