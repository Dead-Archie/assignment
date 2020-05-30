# Ricky Morty Assignment XT

###### API Server

- Created a GraphQl schema and GraphiQl page `sh http://localhost:3002/grpahql` to render data from rick morty api.
- API return the characters on the basis of search and filter criteria sent.

###### Login & Registration Page

- Created separate pages for Login & User Registration.
- Initialy save Data into Local Storage to Validate. Registered. Currently not using Backend.

###### Front Page

- The Dashboard page is protected, which means if user cannot access it without logging in. Non-logged in user should be redirected to login page.
- Implement Sort feature (to filter through ‘id’ in ascending and descending order).
- Implement Filters to filter out data based on Species and Gender.
- A feature to Search (via name) should be implemented.

###### Misc

- Worte Unit tests for Components to test the functionalities.
- Create Responsive Templates.

## Main Technology Dependencies

1. React
2. Next.js
3. Redux
4. Node.js
5. GraphQl
6. Jest & Enzyme

## Installation

Fork the repository & install dependencies using the yarn/npm command line tools.

```sh
yarn install
yarn dev
```
