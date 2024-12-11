import { Button, Card } from '@radix-ui/themes';
import { useState } from 'react';

export const MeteorInformation = () => {
    const [open, setOpen] = useState(false);

    return <>
        <Button onClick={() => setOpen(true)}>Tell me more</Button>
        {open && <Card>Here's some information</Card>}
    </>
}
