import { DataSource } from "typeorm";

import { Hello } from "../hello/model/hello.entity.js";

const dataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 4002,
    database: "meteor-time",
    synchronize: true,
    logging: true,
    entities: [Hello],
    subscribers: [],
    migrations: [],
    useUnifiedTopology: true,
});

export default dataSource;