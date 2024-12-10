import dataSource from "../data-source/data-source.js";
import { Hello } from "./model/hello.entity.js";

export default dataSource.getMongoRepository(Hello);