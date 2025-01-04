import { Global, Module } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Global() // Define @Global so is not necessary to provide Prisma Service in each module
@Module({
	providers: [PrismaService],
	exports: [PrismaService] // Export prisma service
})
export class PrismaModule {}
