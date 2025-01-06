import { Field, ID, ObjectType } from '@nestjs/graphql'

// We create a structured model for GraphQL that we will be waiting for return from query
// We can add some documentation like swagger inside the @ObjectType decorator
@ObjectType({})
export class UserModel {
	@Field(() => ID) // Type of data that will be returned
	public id: string

	@Field(() => String)
	public email: string

	@Field(() => String)
	public password: string

	@Field(() => String)
	public username: string

	@Field(() => String)
	public displayName: string

	@Field(() => String, { nullable: true }) // Nullable means that this field can be null
	public avatar: string

	@Field(() => String, { nullable: true })
	public bio: string

	@Field(() => Date)
	public createdAt: Date // Don't need comma as after it has decorator

	@Field(() => Date)
	public updatedAt: Date
}
