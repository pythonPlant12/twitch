// Util to check in what environment the app is running (dev/produciton)
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config()

export function isDev(configService: ConfigService) {
	return configService.getOrThrow<string>('NODE_ENV') === ''
}

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
