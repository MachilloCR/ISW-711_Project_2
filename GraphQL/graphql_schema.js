// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.




  type New {
    title: String ,
    short_description: String,
    permalink: String,
    date: String,
    news_source_id: String,
    category_id: String,
    user_id: String
    imagen: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "players" query returns an array of zero or more players (defined above).

  type Query {
    newsByCategory(category_id: String , user_id: String ): [New]
    newsByWord(word: String , user_id: String): [New]
    news(user_id: String): [New]
    version: String
  }
`;