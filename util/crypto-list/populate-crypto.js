const fs = require('fs');
// import { ICryptoInfo } from '../../interfaces/interfaces';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// I created this function to extract only the info that I need from the
// big object that I receive when I query the coingecko API (such as names an images).
// To run this function, you need to create in this folder a file named crypto-list.json
// and then you need to copy in that file  all the info that you get back from hitting this
// endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false
// You can also change the number of page in the url, to retrieve other pages with
// 250 coins in each page ordered by market cap. Once you copied the info in that file,
// run npm run populate to populate the database.

fs.readFile(__dirname + '/crypto-list.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err);
    return;
  }
  const parsed = JSON.parse(jsonString);
  const relevInfo = parsed.map((coinInfo) => {
    const infoToKeep = {
      idCoinGecko: coinInfo.id,
      name: coinInfo.name,
      symbol: coinInfo.symbol,
      image: coinInfo.image,
    };
    return infoToKeep;
  });
  async function populate() {
    await prisma.crypto.createMany({
      data: relevInfo,
    });
  }
  populate();
});
