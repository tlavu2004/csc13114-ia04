import { User } from '../../user/schemas/user.schema';
import { TokenPayload } from '../interfaces/token-payload.interface';

export function mapUserToTokenPayload(user: User): TokenPayload {
  return {
    id: (user._id as any).toString(),
    email: user.email,
  };
}
