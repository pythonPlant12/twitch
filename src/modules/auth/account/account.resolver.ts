import { Get } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserModel } from '@/src/modules/auth/account/models/user.model'
import { CreateUserInput } from '@/src/modules/auth/inputs/create-user.input'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { AccountService } from './account.service'

@Resolver('Account')
export class AccountResolver {
	public constructor(private readonly accountService: AccountService) {}
	@Authorization() // Here we use our created decorator which check if the user is authorized
	@Query(() => UserModel, { name: 'findProfile' })
	public async me(@Authorized('id') id: string) {
		// We also use @Authorized decorator which find the user by it's id
		return this.accountService.me(id)
	}

	// With decorator mutation we can create a new user, in second param we give the name of the action
	@Mutation(() => Boolean, { name: 'createUser' }) // In => We should specify the type of the return
	public async create(@Args('data') input: CreateUserInput) {
		// We should use decorator @Args to get the data from the input
		return this.accountService.create(input)
	}
}
