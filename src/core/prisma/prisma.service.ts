import {
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '@prisma/generated'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	public async onModuleInit() {
		await this.$connect()
	}

	// In case of destroying the module, we need to disconnect from the database
	public async onModuleDestroy() {
		await this.$disconnect()
	}
}
