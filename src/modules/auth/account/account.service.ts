import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateUserInput } from '@/src/modules/auth/inputs/create-user.input'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async me(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})
		return user
	}

	public async create(input: CreateUserInput): Promise<boolean> {
		const { username, email, password } = input

		// Validation for username
		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})
		if (isUsernameExists) {
			throw new ConflictException('Это имя пользователя уже занято')
		}

		// Validation for email
		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})
		if (isEmailExists) {
			throw new ConflictException('Эта почта уже занята')
		}

		await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username
			}
		})

		return true
	}
}
