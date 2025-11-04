import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @Length(5, 255, { message: 'Email must be between 5 and 255 characters' })
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>/?\\|-])[A-Za-z\d!@#$%^&*()_+\[\]{};':",.<>/?\\|-]{8,128}$/,
    { message: 'Password must be 8-128 characters, include at least one uppercase letter, one lowercase letter, one number, one special character, and contain no spaces' }
  )
  password: string;
}
