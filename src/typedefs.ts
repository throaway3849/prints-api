import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    prints(page: Int, size: Int): [Print!]!
  }

  type Print {
    title: String!
    technique: String
    century: String
    url: String
    department: String
    primaryimageurl: String
  }
`;
