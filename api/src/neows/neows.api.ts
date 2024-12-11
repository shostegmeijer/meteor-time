import { Cacheable } from "@type-cacheable/core";
import config from "../config/config.js";

class NEOWSApi {
  @Cacheable({ ttlSeconds: 86400 })
  async getAsteroids() {
    const filters = {
      start_date: new Date().toISOString().split("T")[0],
    }
    return (await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${config.NASA_API_KEY}&${new URLSearchParams(filters).toString()}`)).json();
  }
}
export const neowsApi = new NEOWSApi();