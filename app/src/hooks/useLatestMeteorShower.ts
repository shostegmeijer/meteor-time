import { useEffect, useState } from "react";
import { Shower, ShowerDetails, useApi } from "../api/useApi";

export const useLatestMeteorShower = () => {
  const { fetchShowers, fetchShower } = useApi();
  const [upcomingShower, setUpcomingShower] = useState<Shower | null>(null);
  const [upcomingShowerDetails, setUpcomingShowerDetails] = useState<ShowerDetails | null>(null);

  useEffect(() => {
    const getUpcomingShower = async () => {
      const { showers } = await fetchShowers();
      if (!showers || showers.length <= 0) return;
      const sortedShowers = showers.sort(
        (a: Shower, b: Shower) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      setUpcomingShower(sortedShowers[0]);

      const showerInfo = await fetchShower(sortedShowers[0].sstr);
      setUpcomingShowerDetails(showerInfo);
    };

    getUpcomingShower();
  }, [fetchShowers]);

  return { ...upcomingShower, ...upcomingShowerDetails };
};

