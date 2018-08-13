import HTTPStatus from 'http-status';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../../db/models/userModels';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const userController = {
  signup: async (req, res) => {
    const { username, email, password, gender, photolink } = req.body;
    try {
      if( !username, !email, !password, !gender ) {
        res.status(HTTPStatus.BAD_REQUEST).send({error: "Fields cannot be empty"})
      } else {
        const checkUsernameExist = await User.findOne({where : {username}});
        const checkEmailExist = await User.findOne({where: {email}});
        if(checkUsernameExist || checkEmailExist) {
          res.status(HTTPStatus.CONFLICT).send({error: "User already exists"});
        } else {
          const hashPW = await bcrypt.hashSync(req.body.password, SALT_ROUNDS);
          if(!hashPW) {
            res.status(HTTPStatus.CONFLICT).send({error: "Failed to hash password in user signup"});
          } else {
            let jwtToken = await jwt.sign({username, email}, 'secretkey');
            const userData = await User.create({
              username, 
              email, 
              password: hashPW, 
              gender,
              token: jwtToken,
              photolink,
            })
            // const compare = bcrypt.compareSync(req.body.password, hashPW);
            // console.log('compare password', compare);
            return res.status(HTTPStatus.CREATED).send(userData);
          }
        }
      }
    } catch (err) {
      res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const userData = await User.findOne({where: {
        username: req.params.username,
      }});
      if(!userData) {
        res.status(HTTPStatus.BAD_REQUEST).send({error: "Username/Password does not match"})
      }
      const jwtToken = await jwt.sign({user: userData}, 'secretkey', (err, token) => {
        return res.status(HTTPStatus.OK).json(token);
      });
      // return res.status(HTTPStatus.OK).send(userData);
    } catch (err) {
      return res.status(HTTPStatus.BAD_REQUEST).send(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const userData = await User.findAll();
      if(!req.token) {
        return res.status(403)
      }
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          return res.status(403)
        } else {
          return res.status(HTTPStatus.OK).send(userData)
        }
      })
    } catch (err) {
      return res.status(HTTPStatus.NOT_FOUND).send(err)
    }
  }
}

export default userController;