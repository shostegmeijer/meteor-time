import { useEffect, useState } from "react";
import { Shower, useApi } from "../api/useApi";

export const useLatestMeteorShower = () => {
  const { fetchShowers } = useApi();
  const [upcomingShower, setUpcomingShower] = useState<Shower | null>(null);

  useEffect(() => {
    const getUpcomingShower = async () => {
      const { showers } = await fetchShowers();
      if (showers && showers.length > 0) {
        const sortedShowers = showers.sort(
          (a: Shower, b: Shower) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        );
        setUpcomingShower(sortedShowers[0]);
      }
    };

    getUpcomingShower();
  }, [fetchShowers]);

  return upcomingShower;
};

