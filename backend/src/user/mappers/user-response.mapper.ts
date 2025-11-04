import { User } from '../schemas/user.schema';
import { UserResponseDto } from '../dto/user-response.dto';

export function mapUserToDto(user: User): UserResponseDto {
  return {
    id: (user._id as any).toString(),
    email: user.email,
    createdAt: user.createdAt,
  };
}
