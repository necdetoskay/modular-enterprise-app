/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}
