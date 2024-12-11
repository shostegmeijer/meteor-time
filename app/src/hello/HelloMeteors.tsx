import { useCountdown } from '../hooks/calculateCountdown';
import { useLatestMeteorShower } from '../hooks/useLatestMeteorShower';
import { MeteorInformation } from '../meteor-information/MeteorInformation';

export const HelloMeteors = () => {
    const { upcomingShower: shower, upcomingShowerDetails } = useLatestMeteorShower();
    const timeTillShower = useCountdown(shower?.dateTime);

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center flex-col gap-4 relative">
                <h1 className="flex text-3xl font-medium ">Next meteor shower is in:</h1>
                {timeTillShower?.seconds ? (
                    <span className="text-5xl font-black">
                        {timeTillShower?.days || 0} days {timeTillShower?.hours || 0} hours{' '}
                        {timeTillShower?.minutes || 0} minutes {timeTillShower?.seconds || 0}{' '}
                        seconds
                    </span>
                ) : null}
                {shower?.description}
                <MeteorInformation details={upcomingShowerDetails} />
            </div>
        </>
    );
};

// const { fetchShowers } = useApi();
// const [showers, setShowers] = useState<object>();
//
// useEffect(() => {
//     (async () => {
//         const { showers } = await fetchShowers();
//         setShowers(showers);
//     })();
// }, []);
