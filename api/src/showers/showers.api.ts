import meteorShowers from '../data/meteor-showers.json' with { type: 'json' };

class ShowersApi {
  getMeteorShowers() {
    return meteorShowers.events;
  }
}
export const showersApi = new ShowersApi();