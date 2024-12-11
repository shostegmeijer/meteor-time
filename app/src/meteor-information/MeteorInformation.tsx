import { Button, Card, IconButton, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ShowerDetails } from '../api/useApi';

export const MeteorInformation: React.FC<{ details: ShowerDetails | null }> = ({ details }) => {
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
                        <Card className="w-full min-h-full">
                            <header>
                                <IconButton
                                    className="top-4 right-4 absolute"
                                    variant="solid"
                                    onClick={() => setOpen(false)}
                                >
                                    <Cross2Icon />
                                </IconButton>
                            </header>
                            <main>
                                <Text size="8">{details.fullName}</Text>
                                <div>
                                    <Text size="7" weight="bold">
                                        Physical Parameters
                                    </Text>
                                    {details.physicalParameters.map((parameter, index) => (
                                        <div key={index} className="grid grid-cols-2">
                                            <Text as="p" size="6" weight="bold">
                                                {parameter.title}
                                            </Text>
                                            <Text as="p" size="5">
                                                {parameter.value} {parameter.units}
                                            </Text>
                                            <Text as="p" size="5" className="col-span-2">
                                                {parameter.description}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
