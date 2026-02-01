import { useEffect, useState } from 'react';
import { supabase } from '~/client';
import { InfoCard } from '../CreatorInfoCard';

export function ShowCreators({ }) {
    const [creators, setCreators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreators();
    }, []);

    async function fetchCreators() {
        setLoading(true);
        let { data, error } = await supabase
            .from('creators')
            .select('*');

        if (error) {
            console.error("Error fetching creators: ", error);
        } else {
            setCreators(data || []);
        }
        setLoading(false);
    }

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading creators...</p>;
    }

    return (
        <div style={pageContainer}>
            <h1 style={titleStyle}>Creatorverse</h1>

            <div style={gridStyle}>
                {creators.map((creator) => (
                    <InfoCard
                        key={creator.id}
                        id={creator.id}
                        name={creator.name}
                        description={creator.description}
                        url={creator.url}
                        imageURL={creator.imageURL}
                    />
                ))}
            </div>
        </div>
    )
}

const pageContainer: React.CSSProperties = {
    padding: '30px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
};

const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#1a1a1a'
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
};