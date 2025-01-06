import { Get } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import { UserModel } from '@/src/modules/auth/account/models/user.model'

import { AccountService } from './account.service'

@Resolver('Account')
export class AccountResolver {
	public constructor(private readonly accountService: AccountService) {}
	// Import Query from GraphQL in our case
	// UserModel should go in list as we will expect to return a list of this model,
	// second argument is for documentation
	@Query(() => [UserModel], { name: 'findAllUsers' })
	public async findAll() {
		return this.accountService.findAll()
	}
}
