import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const pharmacies = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  location: `${faker.location.city()}, ${faker.location.state()}`,
  claims: "https://link-to-pharmacy-claims",
}));
