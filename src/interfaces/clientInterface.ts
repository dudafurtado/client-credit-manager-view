interface Address {
  id: number;
  zip_code: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  additional_information: string;
  client_id: number;
}

export interface Card {
  id: number;
  number: string;
  expire_date: string;
  CVV: string;
  client_id: number;
}

export interface Client {
  id: number;
  name: string;
  surname: string;
  email: string;
  birth_date: string;
  phone: string;
  address: Address;
  cards: Card[];
}
