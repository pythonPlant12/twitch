import { Field, ID, ObjectType } from '@nestjs/graphql'

// We create a structured model for GraphQL that we will be waiting for return from query
// We can add some documentation like swagger inside the @ObjectType decorator
@ObjectType({})
export class UserModel {
	@Field(() => ID) // Type of data that will be returned
	id: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string

	@Field(() => String)
	username: string

	@Field(() => String)
	displayName: string

	@Field(() => String, { nullable: true }) // Nullable means that this field can be null
	avatar: string

	@Field(() => String, { nullable: true })
	bio: string

	@Field(() => Date)
	createdAt: Date // Don't need comma as after it has decorator

	@Field(() => Date)
	updatedAt: Date
}
