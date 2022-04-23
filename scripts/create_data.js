import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import fetch from 'cross-fetch';

dotenv.config();

const PLAYER_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/players.json';
const TEAM_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/teams.json';
const MATCH_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/matchs.json';
const AGENT_URL = 'https://raw.githubusercontent.com/TOC-Web-Scraping/scraping/main/data/agents.json';

const getData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

console.log('Connecting mongodb...');
MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {
  if (err) throw err;

  const players = await getData(PLAYER_URL);
  db.collection('players').insertMany(players);
  console.log('Insert players data successful');

  const teams = await getData(TEAM_URL);
  db.collection('teams').insertMany(teams);
  console.log('Insert teams data successful');

  const matchs = await getData(MATCH_URL);
  db.collection('matchs').insertMany(matchs);
  console.log('Insert matchs successful');

  const agents = await getData(AGENT_URL);
  db.collection('agents').insertMany(agents);
  console.log('Insert agents successful');
});
