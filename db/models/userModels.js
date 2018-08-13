import Sequelize from 'sequelize';
import db from '../db';

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photolink: Sequelize.STRING,
}, {
  timestamps: false,
});

db.sync();

// User.sync({force: true})

export default User;
