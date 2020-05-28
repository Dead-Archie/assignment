const graphql = require('graphql');
const axios = require('axios');

const url = 'https://rickandmortyapi.com/api/character/';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

const subType = new GraphQLObjectType({
  name: 'Subtype',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  }),
});
const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    type: { type: GraphQLString },
    gender: { type: GraphQLString },
    image: { type: GraphQLString },
    origin: {
      type: subType,
      resolve(parent) {
        return parent.origin;
      },
    },
    url: { type: GraphQLString },
    location: {
      type: subType,
      resolve(parent) {
        return parent.location;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve() {
        return axios
          .get(url)
          .then(res => res.data)
          .then(res => res.results);
      },
    },
    usersWithParams: {
      type: new GraphQLList(userType),
      args: {
        params: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`${url}?${args.params}`)
          .then(res => res.data)
          .then(res => res.results);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
