import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import RedisStore from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'

import { RedisService } from '@/src/core/redis/redis.service'
import { StringValue, ms } from '@/src/shared/utils/ms.util'
import { parseBoolean } from '@/src/shared/utils/parse-boolean.util'

import { CoreModule } from './core/core.module'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)

	const config = app.get(ConfigService) // Connect config to the app
	const redis = app.get(RedisService) // Connect redis to the app

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
	// Configuration of global pipes
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	// Configuration of global session and cookies
	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false, // This is necessary so the session is not saved for unnitialized sessions

			// Configuration of cookies
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
				httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
				secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
				sameSite: 'lax'
			},

			// Configuration of store
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	// Configuration of global cors
	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
}
bootstrap()
