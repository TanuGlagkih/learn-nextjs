import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'email is not valid' })
	email: string;

	@IsString({ message: 'set password' })
	password: string;

	@IsString({ message: 'set name' })
	name: string;
}
