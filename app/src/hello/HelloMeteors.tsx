import { MeteorInformation } from '../meteor-information/MeteorInformation';
import { useLatestMeteorShower } from '../hooks/useLatestMeteorShower';
import { useCountdown } from '../hooks/calculateCountdown';
import { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { MeteorCalendar } from '../meteor-calendar/MeteorCalendar';

export const HelloMeteors = () => {
    const { upcomingShower: shower, upcomingShowerDetails, showers } = useLatestMeteorShower();
    const [notificationSent, setNotificationSent] = useState(false);

    const showNotification = () => {
        if (shower && !notificationSent) {
            new Notification('Upcoming Meteor Shower', {
                body: `The next meteor shower is the ${shower.description} on ${new Date(shower.dateTime).toLocaleString()}.`,
            });
            setNotificationSent(true);
        }
    };

    const enableNotifications = () => {
        if (Notification.permission === 'granted') {
            showNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    };

    const timeTillShower = useCountdown(shower?.dateTime, showNotification);
    const granted = Notification.permission === 'granted';

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
                    disabled={granted}
                >
                    {granted ? 'Notifications Enabled' : 'Enable Notifications'}
                </Button>
                <MeteorInformation details={upcomingShowerDetails} image={shower?.image ?? null} />
                {showers && <MeteorCalendar className="fixed bottom-4 right-4" meteors={showers} />}
            </div>
        </>
    );
};

