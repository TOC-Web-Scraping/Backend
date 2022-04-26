const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const fetch = require('cross-fetch');

dotenv.config();

const PLAYER_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/players.json';
const TEAM_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/teams.json';
const MATCH_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/matchs.json';
const AGENT_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/agents.json';

const { DATABASE_NAME, MONGODB_URI } = process.env;

const getData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

console.log('Connecting mongodb...');
MongoClient.connect(MONGODB_URI, async (err, client) => {
  if (err) throw err;

  const db = client.db(DATABASE_NAME);

  const players = await getData(PLAYER_URL);
  await db.collection('players').insertMany(players);
  console.log('Insert players data successful');

  const teams = await getData(TEAM_URL);
  await db.collection('teams').insertMany(teams);
  console.log('Insert teams data successful');

  const matchs = await getData(MATCH_URL);
  await db.collection('matchs').insertMany(matchs);
  console.log('Insert matchs data successful');

  const agents = await getData(AGENT_URL);
  await db.collection('agents').insertMany(agents);
  console.log('Insert agents data successful');

  await client.close();
  console.log('Close database connection...');
});
