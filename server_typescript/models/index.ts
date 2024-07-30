'use strict';

import process from 'process';
import { Model, ModelStatic, Options, Sequelize } from 'sequelize';
// @ts-ignore
import config  from '../config/config.cjs';
import User from './user.ts'
import Post from './post.ts';
import File from './file.ts';
import Room from './room.ts';
import Chat from './chat.ts';
import Connection from './connection.ts';
import { ConfigTypes, IEnvConfig } from '../src/utils/types/sequelizeTypes.ts';
import Message from './messages.ts';

interface IDatabase {
  User: ModelStatic<Model>;
  Post: ModelStatic<Model>;
  File: ModelStatic<Model>;
  Room: ModelStatic<Model>;
  Chat: ModelStatic<Model>;
  Connection: ModelStatic<Model>;
  Message: ModelStatic<Model>;
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env] as IEnvConfig;
const sequelizeConfigString = JSON.stringify(config);

const db: IDatabase = {
  sequelize: {} as Sequelize,
  Sequelize: Sequelize,
  User: User,
  Post: Post,
  File: File,
  Room: Room,
  Chat: Chat,
  Message: Message,
  Connection: Connection,
};

let sequelize: Sequelize;
if (sequelizeConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[sequelizeConfig.use_env_variable] as string, sequelizeConfigString);
} else {
  sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password as (string | undefined), sequelizeConfig as Options);
}

User.initialize(sequelize);
Post.initialize(sequelize);
File.initialize(sequelize);
Room.initialize(sequelize);
Chat.initialize(sequelize);
Connection.initialize(sequelize);

db.User = User;
db.Post = Post;
db.File = File;
db.Room = Room;
db.Chat = Chat;
db.Message = Message;
db.Connection = Connection;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { User, Post, File };


