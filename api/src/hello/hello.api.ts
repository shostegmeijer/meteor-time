import { Cacheable } from "@type-cacheable/core";
import { isDev } from "../util/isDev.js";

class HelloApi {
    @Cacheable({ ttlSeconds: isDev ? 60 : 86_400 })
    public fetchHello(): string {
        return "Hello World!";
    }
}

export const helloApi = new HelloApi();