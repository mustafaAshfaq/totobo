/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  id: string | number; // Primary ID
  email: string;
  first_name: string;
  last_name: string;
  token: string;
  provider: string;
    uid: string;
    name: string;
    nickname: string | null;
    image: string | null;
    role: string;
}

