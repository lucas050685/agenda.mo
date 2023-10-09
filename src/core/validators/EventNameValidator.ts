import z from 'zod';

export const EventNameValidator = z.enum([
  'createUser',
  'createGroup',
  'createRole',
  'createDefaultRole',
  'createRendezvous',
  'createInvitation',
  'createPlace',

  'addUserToGroup',
  'addUserToRole',
]);
