import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '~/client';
import { InfoCard } from './CreatorInfoCard';

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
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <Link
                    to="/add"
                    style={floatingButtonStyle}
                    aria-label="Add a creator">
                    <span>+</span>
                </Link>
            </div>
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

const floatingButtonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#0070f3',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    zIndex: 1000,
    textDecoration: 'none',
    transition: 'transform 0.2s ease',
};