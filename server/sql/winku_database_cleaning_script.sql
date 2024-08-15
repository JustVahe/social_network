DROP TABLE IF EXISTS "public"."chats";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."chats" (
    "id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "avatar" varchar(255) DEFAULT '/assets/defaultAvatar.jpg'::character varying,
    "description" varchar(255) DEFAULT 'This chat has no description yet'::character varying,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."comments";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "post_id" uuid NOT NULL,
    "message" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."connections";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."connections" (
    "id" uuid NOT NULL,
    "chat_id" uuid NOT NULL,
    "user_id" uuid,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."files";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."files" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "post_id" uuid,
    "type" varchar(255) NOT NULL,
    "path" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."friends";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."friends" (
    "id" uuid NOT NULL,
    "user_a_id" uuid NOT NULL,
    "user_b_id" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."messages";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."messages" (
    "id" uuid NOT NULL,
    "from_id" uuid NOT NULL,
    "room_id" uuid NOT NULL,
    "message" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."posts";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."posts" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "message" varchar(255),
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."reactions";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."enum_reactions_type";
CREATE TYPE "public"."enum_reactions_type" AS ENUM ('like', 'dislike');

-- Table Definition
CREATE TABLE "public"."reactions" (
    "id" uuid NOT NULL,
    "type" "public"."enum_reactions_type" NOT NULL,
    "user_id" uuid NOT NULL,
    "post_id" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."replies";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."replies" (
    "id" uuid NOT NULL,
    "user_id" uuid,
    "comment_id" uuid,
    "message" varchar(255),
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."requests";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."enum_requests_status";
CREATE TYPE "public"."enum_requests_status" AS ENUM ('approved', 'pending', 'rejected');

-- Table Definition
CREATE TABLE "public"."requests" (
    "id" uuid NOT NULL,
    "from_id" uuid NOT NULL,
    "to_id" uuid NOT NULL,
    "status" "public"."enum_requests_status" DEFAULT 'pending'::enum_requests_status,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."rooms";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."rooms" (
    "id" uuid NOT NULL,
    "user_a_id" uuid NOT NULL,
    "user_b_id" uuid,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."SequelizeMeta";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."SequelizeMeta" (
    "name" varchar(255) NOT NULL,
    PRIMARY KEY ("name")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."enum_users_status";
CREATE TYPE "public"."enum_users_status" AS ENUM ('offline', 'online');

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "surname" varchar(255) NOT NULL,
    "username" varchar(255),
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "description" varchar(255),
    "title" varchar(255),
    "avatar" varchar(255),
    "headerImg" varchar(255),
    "status" "public"."enum_users_status" DEFAULT 'offline'::enum_users_status,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);























INSERT INTO "public"."SequelizeMeta" ("name") VALUES
('20240716123153-create-user.cjs');
INSERT INTO "public"."SequelizeMeta" ("name") VALUES
('20240719080451-create-post.cjs');
INSERT INTO "public"."SequelizeMeta" ("name") VALUES
('20240722083650-create-file.cjs');
INSERT INTO "public"."SequelizeMeta" ("name") VALUES
('20240725094357-create-room.cjs'),
('20240725095621-create-chat.cjs'),
('20240725100220-create-connection.cjs'),
('20240730084246-messages.cjs'),
('20240731094140-create-friends.cjs'),
('20240731100412-create-requests.cjs'),
('20240802092032-create-comments.cjs'),
('20240802092347-create-replies.cjs'),
('20240805081115-create-reactions.cjs');


