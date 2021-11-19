import fs from 'fs';
import { ICryptoInfo } from '../../interfaces/interfaces';

// I created this function to extract only the info that I need from the
// big object that I receive when I query the coingecko API (such as names an images).
// To run this function, you need to create in this folder a file named cryptoListRaw.json
// and then you need to copy in that file  all the info that you get back from hitting this
// endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false
// You can also change the number of page in the url, to retrieve other pages with
// 250 coins in each page ordered by market cap. Once you copied the info in that file,
// you need to run this file by running "node utils/cryptoList/saveRelevantInfo"
// this will populate the cryptoList.json file, that you can then use for the logic in
// the application.

fs.readFile('./utils/cryptoListRaw.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err);
    return;
  }
  const parsed = JSON.parse(jsonString);
  const relevInfo = parsed.map((coinInfo: ICryptoInfo) => {
    const infoToKeep = {
      id: coinInfo.id,
      name: coinInfo.name,
      symbol: coinInfo.symbol,
      image: coinInfo.image,
    };
    return infoToKeep;
  });
  fs.writeFile(
    './utils/cryptoList.json',
    JSON.stringify(relevInfo),
    function (err) {
      if (err) throw err;
      console.log('complete');
    },
  );
});
