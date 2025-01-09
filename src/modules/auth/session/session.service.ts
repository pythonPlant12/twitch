import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { LoginInput } from '@/src/modules/auth/session/inputs/login.input'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}
	public async login(request: Request, input: LoginInput, userAgent: string) {
		// Important to take this request from express dependency
		const { login, password } = input
		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [{ username: { equals: login } }, { email: { equals: login } }]
			}
		})
		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}
		const isValidPassword = await verify(user.password, password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный пароль')
		}

		const metadata = getSessionMetadata(request, userAgent)

		return new Promise((resolve, reject) => {
			request.session.createdAt = new Date()
			request.session.userId = user.id
			request.session.metadata = metadata

			request.session.save(error => {
				if (error) {
					return reject(
						new InternalServerErrorException('Не удалось сохранить сессию')
					)
				}
				resolve(user)
			})
		})
	}

	public async logout(request: Request) {
		return new Promise((resolve, reject) => {
			request.session.destroy(error => {
				if (error) {
					return reject(
						new InternalServerErrorException('Не удалось удалить сессию')
					)
				}
				request.res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME')
				)
				resolve(true)
			})
		})
	}
}
