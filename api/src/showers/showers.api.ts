import { Cacheable } from '@type-cacheable/core';
import meteorShowers from '../data/meteor-showers.json' with { type: 'json' };
import { Nullable } from '@meteor-time/shared';

class ShowersApi {
  @Cacheable({ ttlSeconds: 60 * 60 * 24 * 7 })
  getMeteorShowers() {
    return meteorShowers.events;
  }

  @Cacheable({ ttlSeconds: 60 * 60 * 24 * 7 })
  async getShowerInfo(sstr: string) {
    const params = new URLSearchParams({
      "ca-data": "1",
      "ca-body": "Earth",
      "ca-tunc": "both",
      "cd-epoch": "1",
      "cd-tp": "1",
      "discovery": "1",
      "full-prec": "1",
      "nv-fmt": "both",
      "orbit-defs": "1",
      "phys-par": "1",
      "r-notes": "1",
      "r-observer": "1",
      "sat": "1",
      "vi-data": "1",
      "www": "1",
      sstr
    });
    const sbdbResponse: SBDBResponse = await (await fetch(`https://ssd-api.jpl.nasa.gov/sbdb.api?${params.toString()}`)).json();
    return mapSBDBResponseToShowerInfo(sbdbResponse);
  }
}

interface OrbitDef {
  units: string;
  description: string;
  title: string;
}

interface SBDBResponse {
  phys_par: {
    notes: string;
    title: string;
    desc: string;
    name: string;
    value: string;
    sigma: string;
    ref: string;
    units: Nullable<string>;
  }[];
  orbit_defs: Record<string, OrbitDef>;
  orbit: {
    first_obs: string;
    elements: {
      title: string;
      value: string;
      sigma: string;
      name: string;
      units: string;
      label: string;
    }[];
  };
  object: {
    des: string;
    orbit_id: string;
    shortname: string;
    kind: string;
    fullname: string;
    orbit_class: {
      code: string;
      name: string;
    }
  };
  discovery: {
    location: string;
    who: string;
    date: string;
    discovery: string;
  };
  ca_data: {
    cd: string;
    dist_max: string;
    dist_min: string;
    dist: string;
    v_rel: string;
  }[];
}

interface ShowerInfo {
  shortName: string;
  fullName: string;
  physicalParameters: {
    title: string;
    description: string;
    units: Nullable<string>;
    value: string;
  }[];
  historicalApproaches: {
    date: string;
    distanceToEarthInAu: string;
    minDistanceToEarthInAu: string;
    maxDistanceToEarthInAu: string;
    relativeVelocityInKmPerSec: string;
  }[];
  discovery: SBDBResponse["discovery"];
  orbitalInformation: {
    firstObservation: string;
    elements: SBDBResponse["orbit"]["elements"]
  };
}

const mapSBDBResponseToShowerInfo = (response: SBDBResponse): ShowerInfo => {
  const {
    phys_par,
    discovery: { location, who, date, discovery },
    ca_data,
    orbit: { first_obs, elements },
    object
  } = response;
  const physicalParameters = phys_par.map(({ title, desc, units, value }) => ({ title, description: desc, units, value }));

  const historicalApproaches = ca_data
    .filter(({ cd }) => new Date(cd) <= new Date())
    .map(({ cd, dist, dist_min, dist_max, v_rel }) => ({
      date: cd,
      distanceToEarthInAu: dist,
      minDistanceToEarthInAu: dist_min,
      maxDistanceToEarthInAu: dist_max,
      relativeVelocityInKmPerSec: v_rel
    }));
  return {
    shortName: object.shortname,
    fullName: object.fullname,
    physicalParameters,
    discovery: { location, who, date, discovery },
    historicalApproaches,
    orbitalInformation: { firstObservation: first_obs, elements }
  }
};


export const showersApi = new ShowersApi();