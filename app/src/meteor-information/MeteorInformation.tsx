import { Button, Card, IconButton, Text, Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ShowerDetails } from '../api/useApi';

export const MeteorInformation: React.FC<{
    details: ShowerDetails | null;
    image: string | null;
}> = ({ details, image }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Tell me more</Button>
            <AnimatePresence>
                {open && details && (
                    <motion.div
                        key="modal"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        className="fixed inset-4"
                    >
                        <Card className="p-0">
                            <div className="w-full grid grid-cols-2 gap-6 p-6 overflow-auto max-h-[calc(100vh-4rem)]">
                                <div className="flex flex-col gap-2">
                                    {image && <img src={image} className="rounded-md mb-4" />}
                                    <Text as="p" size="6" weight="bold">
                                        {details.fullName}
                                    </Text>
                                    <Separator my="1" size="4" />
                                    <div className="mt-2 flex flex-col gap-2">
                                        <Text size="5" weight="bold">
                                            Discovery
                                        </Text>
                                        <Separator my="1" size="4" />
                                        <Text as="p" size="4">
                                            {details.discovery.discovery}
                                        </Text>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-2">
                                        <Text size="5" weight="bold">
                                            Physical Parameters
                                        </Text>
                                        <Separator my="1" size="4" />
                                        {details.physicalParameters.map((parameter, index) => (
                                            <div key={index} className="grid grid-cols-2 gap-1">
                                                <Text
                                                    as="p"
                                                    size="4"
                                                    weight="bold"
                                                    className="capitalize"
                                                >
                                                    {parameter.title}
                                                </Text>
                                                <Text as="p" size="3">
                                                    {parameter.value} {parameter.units}
                                                </Text>
                                                <Text
                                                    as="p"
                                                    size="3"
                                                    className="col-span-2 capitalize"
                                                >
                                                    {parameter.description}
                                                </Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <header>
                                        <IconButton
                                            className="top-6 right-10 absolute"
                                            variant="solid"
                                            onClick={() => setOpen(false)}
                                        >
                                            <Cross2Icon />
                                        </IconButton>
                                    </header>
                                    <main className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Text size="5" weight="bold">
                                                Orbital Information
                                            </Text>
                                            <Separator my="1" size="4" />
                                            <Text as="p" size="4" weight="bold">
                                                {(
                                                    details.orbitalInformation
                                                        .firstObservation as unknown as Date
                                                ).toDateString()}
                                            </Text>
                                            {details.orbitalInformation.elements.map(
                                                (element, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col gap-1"
                                                    >
                                                        <Text
                                                            as="p"
                                                            size="4"
                                                            className="capitalize"
                                                        >
                                                            {element.title}:{' '}
                                                            <Text weight="bold">
                                                                {element.value}
                                                            </Text>
                                                            &nbsp;
                                                            {element.units}
                                                        </Text>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <div className="mt-2 flex flex-col gap-2">
                                            <Text size="5" weight="bold">
                                                Historical Events
                                            </Text>
                                            <Separator my="1" size="4" />
                                            {details.historicalApproaches.map((approach, index) => (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <Text as="p" size="4" weight="bold">
                                                        {(
                                                            approach.date as unknown as Date
                                                        ).toDateString()}
                                                    </Text>
                                                    <Text as="p" size="3">
                                                        <Text weight="bold">
                                                            Distance to Earth:
                                                        </Text>
                                                        &nbsp;
                                                        {approach.distanceToEarthInAu} AU
                                                    </Text>
                                                    <Text
                                                        as="p"
                                                        size="3"
                                                        className="col-span-2 capitalize"
                                                    >
                                                        <Text weight="bold">Relative speed:</Text>
                                                        &nbsp;
                                                        {approach.relativeVelocityInKmPerSec} km/s
                                                    </Text>
                                                </div>
                                            ))}
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
