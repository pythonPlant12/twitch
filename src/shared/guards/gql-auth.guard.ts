import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
	public constructor(private readonly prismaService: PrismaService) {}
	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context) // As in our case we use GraphQL we should get context from graphql
		const request = ctx.getContext().req

		if (typeof request.session.userId === 'undefined') {
			throw new UnauthorizedException('Пользователь не авторизован')
		}

		const user = await this.prismaService.user.findFirst({
			where: {
				id: request.session.userId
			}
		})

		request.user = user
		return true
	}
}
