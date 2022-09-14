const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This function will populate the database with the information that we need, and it can be executed
// by running `npm run populate`.
// In order to make it work correctly, you need to have a file called `crypto-list.json` in the same
// directory of this file, the file should contain the response of this endpoint:
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false
// tip: you can include more crypto by modifying the query parameters of the endpoint above.
// At the moment the file is populated with the top 500 crypto by market cap.

fs.readFile(__dirname + '/crypto-list.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err);
    return;
  }
  const parsedInfo = JSON.parse(jsonString);
  const relevantInfo = parsedInfo.map((coinInfo) => {
    return {
      idCoinGecko: coinInfo.id,
      name: coinInfo.name,
      symbol: coinInfo.symbol,
      image: coinInfo.image,
    };
  });
  async function populate() {
    await prisma.crypto.createMany({
      data: relevantInfo,
    });
  }
  populate();
});
