import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import { User } from "./entity/User";

const options: ConnectionOptions = {
  type: "sqlite",
  database: `./data/data.sqlite`,
  entities: [User],
  logging: true,
  synchronize:false,
};

createConnection(options)
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));
