import { Button, Card, IconButton, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Shower } from '../api/useApi';

export const MeteorCalendar: React.FC<{ meteors: Shower[], className: string }> = ({ meteors, className }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)} className={className}>Upcoming showers</Button>
            <AnimatePresence>
                {open && meteors && (
                    <motion.div
                        key="modal"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        className="fixed inset-4"
                    >
                        <Card className="w-full min-h-full gap-8 p-6">
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
                                <main>
                                    <Heading size="6" className='mb-4'>Upcoming Calendar</Heading>
                                    {meteors.map(m => <div className='mb-4 pt-4 border-t-white/10 border-t'><Heading size="3">{m.dateTime.toLocaleString()}</Heading><span>{m.description}</span></div>)}
                                </main>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
