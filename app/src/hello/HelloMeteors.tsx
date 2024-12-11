import { MeteorInformation } from '../meteor-information/MeteorInformation';
import { useLatestMeteorShower } from '../hooks/useLatestMeteorShower';
import { useCountdown } from '../hooks/calculateCountdown';
import { useState } from 'react';
import { Button } from '@radix-ui/themes';

export const HelloMeteors = () => {
    const { upcomingShower: shower, upcomingShowerDetails } = useLatestMeteorShower();
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const showNotification = () => {
        if (shower) {
            new Notification('Upcoming Meteor Shower', {
                body: `The next meteor shower is the ${shower.description} on ${new Date(shower.dateTime).toLocaleString()}.`,
            });
            setNotificationEnabled(true);
        }
    };

    const enableNotifications = () => {
        if (Notification.permission === 'granted') {
            showNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    showNotification();
                }
            });
        }
    };

    const timeTillShower = useCountdown(new Date(shower?.dateTime || 0), showNotification);

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center flex-col gap-4 relative">
                <h1 className="flex text-3xl font-medium">Next meteor shower is in:</h1>
                <span className="text-5xl font-black">
                    {timeTillShower?.days || 0} days {timeTillShower?.hours || 0} hours{' '}
                    {timeTillShower?.minutes || 0} minutes {timeTillShower?.seconds || 0} seconds
                </span>
                {shower?.description}
                <Button
                    className="fixed top-4 right-4 z-0"
                    variant="outline"
                    onClick={enableNotifications}
                    disabled={notificationEnabled}
                >
                    {notificationEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
                </Button>
                <MeteorInformation details={upcomingShowerDetails} image={shower?.image ?? null} />
            </div>
        </>
    );
};
