import { Connection } from 'mongoose';
import { UserSchema } from 'src/user/schema/user.schema';

export const authProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
