# Lucrum Facio

## About the project

 Crypto portfolio tracker that allows users to add their crypto and specify: quantity, staking provider, APY. The app can help to keep track of where the funds are allocated and to see the total APY averaged across all the providers.
 For the moment it supports only single asset pools.

### Built with:

- Front end - Next.js, Redux, Apollo Client, Chakra UI, TypeScript
- Back end - GraphQL, Prisma, PostgreSQL, TypeScript
- Others - JWT, CoinGecko API

## Screenshots

<img src="screenshots/login.png?raw=true" width="400"> <img src="screenshots/holdings.png?raw=true" width="400"> <img src="screenshots/add-position.png?raw=true" width="400"> <img src="screenshots/portfolio-list.png?raw=true" width="400"> <img src="screenshots/edit-position.png?raw=true" width="400">

## Steps for running the project

1. After cloning the repo locally, create a postgres database 
2. Create a .env file and populate it using as reference the .env.example file, setting the url of the database, the JWT Secret and the port
3. run  ```npm run populate```  to populate the database with the prices of all crypto
4. You can now install the dependencies using ```npm install``` and finally run the project using ```npm run dev```
5. One of the cool features of prisma is that you can actually see the data in your database by running ```npx prisma studio``` with a nice looking UI, so you can run that if you are interested the relationship between data or if you need to debug the app. 
