const graphql = require('graphql');
const _ = require('lodash');
const https = require('https');

let JsonData = '';

const url = 'https://rickandmortyapi.com/api/character/';

https
  .get(url, function(res) {
    let body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', async function() {
      const response = await JSON.parse(body);
      JsonData = response;
    });
  })
  .on('error', function(e) {
    console.log('Got an error: ', e);
  });

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data

const books = [
  { name: 'Name of the winds', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '1' },
  { name: 'I am kalam', genre: 'auto-Biography', id: '3', authorId: '3' },
  { name: 'discovery of India', genre: 'Sci-Fi', id: '4', authorId: '2' },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'J L Neheu', age: 69, id: '2' },
  { name: 'APJ Kalam', age: 87, id: '3' },
];
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

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      // eslint-disable-next-line no-use-before-define
      type: authorType,
      resolve(parent) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: bookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: function(obj, args) {
        // get data from db / other source
        console.log(args);
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: authorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(bookType),
      resolve() {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve() {
        return authors;
      },
    },
    users: {
      type: new GraphQLList(userType),
      resolve() {
        return JsonData.results;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
