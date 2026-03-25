export interface Address {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface User {
  _id: string;
  name: string;
  mobile: string;
  addresses?: Address[];
  profilePicture?: string;
}