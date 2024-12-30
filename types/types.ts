// Item details for item props

export interface ItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface SearchHistory {
  id?: string;
  title: string;
}
export interface UserProps {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  cart?: [
    {
      id: string;
      title: string;
      image: string;
      price: number;
      quantity: number;
    }
  ];
  order?: [
    {
      // Update in the future
    }
  ];
  favorite?: string[]; //Item id as string
  searchHistory?: SearchHistory[];
}
