import { Button, Card, IconButton, Text, Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ShowerDetails } from '../api/useApi';
import { MeteorDetail } from './MeteorDetail';

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
                            <IconButton
                                className="top-6 right-10 absolute"
                                variant="solid"
                                onClick={() => setOpen(false)}
                            >
                                <Cross2Icon />
                            </IconButton>
                            <MeteorDetail
                                details={details}
                                image={image}
                                className="max-h-[calc(100vh-4rem)]"
                            />
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
