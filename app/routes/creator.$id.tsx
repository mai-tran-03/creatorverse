import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { supabase } from '~/client';

export default function CreatorDetails() {
    const { id } = useParams();
    const [creator, setCreator] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) setCreator(data);
            setLoading(false);
        }
        fetchCreator();
    }, [id]);

    if (loading) return <p>Loading creator...</p>;
    if (!creator) return <p>[404] Creator not found</p>;

    return (
        <div style={containerStyle}>
            <Link to='/' style={{ color: '#0070f3' }}>← Back</Link>
            <div style={contentLayout}>
                <img src={creator.imageURL} alt={creator.name} style={imageStyle} />
                <div style={{ paddingTop: '40px' }}>
                    <Link
                        to={`/edit/${id}`}
                        style={{ ...buttonStyle, backgroundColor: '#ffc107', color: 'black' }}
                    >Edit ✎</Link>
                    <h1 style={nameStyle}>{creator.name}</h1>
                    <p style={descriptionStyle}>{creator.description}</p>
                    <a href={creator.url} target='_blank' style={buttonStyle}>Visit Profile</a>
                </div>
            </div>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    padding: '40px', maxWidth: '800px', margin: '0 auto'
};

const nameStyle = {
    margin: '8px 0',
    fontSize: '1.5rem'
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    margin: 0,
    lineHeight: '1.5',
    paddingBottom: '20px',
};

const contentLayout: React.CSSProperties = {
    display: 'flex', gap: '40px', marginTop: '30px'
};
const imageStyle: React.CSSProperties = {
    width: '300px', height: '400px', borderRadius: '12px', objectFit: 'cover',
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block', padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', borderRadius: '5px', textDecoration: 'none'
};