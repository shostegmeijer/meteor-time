import { Button, Card, IconButton } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross2Icon } from "@radix-ui/react-icons"

export const MeteorInformation = () => {
    const [open, setOpen] = useState(false);

    return <>
        <Button onClick={() => setOpen(true)}>Tell me more</Button>
        <AnimatePresence>
            {open && <motion.div key="modal" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} className='fixed inset-4'>
                <Card className='w-full min-h-full'><header><IconButton className='top-4 right-4 absolute' variant='solid' onClick={() => setOpen(false)} ><Cross2Icon /></IconButton></header><div>Info here</div></Card>
            </motion.div>}
        </AnimatePresence>
    </>
}
