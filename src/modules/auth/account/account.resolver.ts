import { Get } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserModel } from '@/src/modules/auth/account/models/user.model'
import { CreateUserInput } from '@/src/modules/auth/inputs/create-user.input'

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

	// With decorator mutation we can create a new user, in second param we give the name of the action
	@Mutation(() => Boolean, { name: 'createUser' }) // In => We should specify the type of the return
	public async create(@Args('data') input: CreateUserInput) {
		// We should use decorator @Args to get the data from the input
		return this.accountService.create(input)
	}
}
