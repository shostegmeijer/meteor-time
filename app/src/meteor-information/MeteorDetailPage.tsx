import { useParams } from 'react-router-dom';
import { ShowerDetails, useApi } from '../api/useApi';
import { useEffect, useState } from 'react';
import { MeteorDetail } from './MeteorDetail';

export const MeteorDetailPage: React.FC = () => {
    const { sstr } = useParams() as { sstr: string };
    const { fetchShowers, fetchShower } = useApi();
    const [image, setImage] = useState<string | null>(null);
    const [details, setDetails] = useState<ShowerDetails | null>(null);

    useEffect(() => {
        (async () => {
            if (!sstr) return;
            const shower = await fetchShower(sstr);
            setDetails(shower);

            const { image } = (await fetchShowers()).showers.find((it) => it.sstr === sstr) || {};
            setImage(image ?? null);
        })();
    }, [sstr]);

    if (!details || !image) return null;
    return <MeteorDetail details={details} image={image} className="pt-16" />;
};
