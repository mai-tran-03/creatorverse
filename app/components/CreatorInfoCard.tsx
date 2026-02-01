import React from 'react';
import { Link } from 'react-router'

interface CreatorProps {
    id: number;
    name: string;
    url: string;
    description: string;
    imageURL?: string;
}

export function InfoCard(
    { id, name, url, description, imageURL }: CreatorProps
) {
    return (
        <div style={cardStyle}>
            <img src={imageURL} alt={name} style={imageStyle} />
            <div style={{ padding: '12px' }}>
                <h2 style={nameStyle}>{name}</h2>
                <p style={descriptionStyle}>{description}</p>
                <Link to={`/creator/${id}`} style={buttonStyle}>More...</Link>
                <a href={url} target='_blank' style={buttonStyle}> Visit ↗</a>
            </div>
        </div>
    )
}

const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    paddingBottom: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    color: '#333'
};

const nameStyle = {
    margin: '8px 0',
    fontSize: '1.5rem'
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
    lineHeight: '1.5',

    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    marginTop: '12px',
    marginRight: '12px',
    padding: '10px 16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
};