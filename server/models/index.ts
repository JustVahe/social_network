'use strict';

// @ts-ignore
import config from '../config/config.cjs';
import process from 'process';
import User from './user.ts'
import Post from './post.ts';
import File from './file.ts';
import Room from './room.ts';
import Chat from './chat.ts';
import Message from './message.ts';
import Friend from './friend.ts';
import FriendRequest from './request.ts';
import Connection from './connection.ts';
import { IEnvConfig } from '../src/utils/types/sequelizeTypes.ts';
import { Model, ModelStatic, Options, Sequelize } from 'sequelize';
import Comment from './comment.ts';
import Reply from './reply.ts';
import Reaction from './reaction.ts';

interface IDatabase {
  User: ModelStatic<Model>;
  Post: ModelStatic<Model>;
  File: ModelStatic<Model>;
  Room: ModelStatic<Model>;
  Chat: ModelStatic<Model>;
  Connection: ModelStatic<Model>;
  Message: ModelStatic<Model>;
  Friend: ModelStatic<Model>;
  FriendRequest: ModelStatic<Model>;
  Comment: ModelStatic<Model>;
  Reply: ModelStatic<Model>;
  Reaction: ModelStatic<Model>;
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
  Friend: Friend,
  FriendRequest: FriendRequest,
  Message: Message,
  Connection: Connection,
  Comment: Comment,
  Reply: Reply,
  Reaction: Reaction
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
Message.initialize(sequelize);
Friend.initialize(sequelize);
FriendRequest.initialize(sequelize);
Comment.initialize(sequelize);
Reply.initialize(sequelize);
Reaction.initialize(sequelize);

db.User = User;
db.Post = Post;
db.File = File;
db.Room = Room;
db.Chat = Chat;
db.FriendRequest = FriendRequest;
db.Message = Message;
db.Friend = Friend;
db.Connection = Connection;
db.Comment = Comment;
db.Reply = Reply;
db.Reaction = Reaction;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { User, Post, File, Room, Chat, Connection, Friend, FriendRequest, Comment, Reply, Reaction };

