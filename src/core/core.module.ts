import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { getGraphQLConfig } from '@/src/core/config/graphql.config'
import { PrismaModule } from '@/src/core/prisma/prisma.module'
import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [
		// Added configuration so if is not development environment, it will ignore the .env file,
		// this config is global for the whole app
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		PrismaModule,
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		RedisModule
	]
})
export class CoreModule {}
