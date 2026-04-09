import {Field, InputType, Int} from "@nestjs/graphql";
import {Kind} from "graphql/language";
import {GraphQLError} from "graphql/error";
import {GraphQLScalarType} from "graphql/type";
import {isEmail} from "class-validator";



export const EmailScalar = new GraphQLScalarType({
    name: 'Email',

    description:
        'The Email scalar type represents E-Mail addresses compliant to RFC 822.',

    serialize(value: unknown): string {
        return value as string;
    },

    parseValue(value): string {
        return value as string;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as email but got a: ${ast.kind}`
            );
        }
        return ast.value;
    },
});

@InputType()
export class CreateProfileInput {
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field(() => EmailScalar, {
        nullable: true,
    })
    email?: string;

    @Field({
        nullable: true,
    })
    job_title?: string;

    @Field(() => Int,)
    location_id: number;

    @Field(() => Int, {
        nullable: true,
    })
    extra_location_id?: number;

    @Field(() => Date)
    birthdate: Date;

    @Field({ nullable: true })
    about?: string;
}