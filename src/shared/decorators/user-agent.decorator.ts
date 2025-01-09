import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { Request } from 'express'

/* Custom decorator for getting browser type from execution context, valid for REST and GraphQL */
export const UserAgent = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		if (ctx.getType() === 'http') {
			const request = ctx.switchToHttp().getRequest() as Request
			return request.headers
		} else {
			const context = GqlExecutionContext.create(ctx)
			return context.getContext().req.headers['user-agent']
		}
	}
)
