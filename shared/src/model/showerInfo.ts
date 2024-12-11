import { Nullable } from "../util/types";

export interface ShowerInfo {
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
  discovery: {
    location: string;
    who: string;
    date: string;
    discovery: string;
  };
  orbitalInformation: {
    firstObservation: string;
    elements: {
      title: string;
      value: string;
      sigma: string;
      name: string;
      units: string;
      label: string;
    }[]
  };
}