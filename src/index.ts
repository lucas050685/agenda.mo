import { User } from '@core/types/User';

const user: User = {
  name: 'Lucas',
  email: 'lucas@lucas.com',
  password: '',
  phoneNumbers: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

console.log(user);
