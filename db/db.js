import Sequelize from 'sequelize';
import env from 'dotenv';

env.config();
env.load();

const db = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

db.authenticate()
  .then(() => {
    console.log('succefully connected the database');
  })
  .catch((err) => {
    console.log('something wrong with the database connection', err);
  });

export default db;
