import { createSchema } from 'graphql-yoga'

const typeDefs = `
   type Query {
      hello: String
   }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
}

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})
