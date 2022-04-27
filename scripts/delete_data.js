const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const { DATABASE_NAME, MONGODB_URI } = process.env;

console.log('Connecting mongodb...');
MongoClient.connect(MONGODB_URI, async (err, client) => {
  if (err) throw err;

  const db = client.db(DATABASE_NAME);

  await db.collection('players').drop();
  console.log('Delete players data successful');

  await db.collection('teams').drop();
  console.log('Delete teams data successful');

  await db.collection('matches').drop();
  console.log('Delete matchs data successful');

  await db.collection('agents').drop();
  console.log('Delete agents data successful');

  await db.collection('valomaps').drop();
  console.log('Delete maps data successful');

  await client.close();
  console.log('Close database connection...');
});
