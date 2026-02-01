import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { supabase } from '~/client';

export default function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        imageURL: ''
    });

    useEffect(() => {
        async function fetchCreator() {
            const { data } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();
            if (data) setFormData(data);
        }
        fetchCreator();
    }, [id]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const { error } = await supabase
            .from('creators')
            .update({
                name: formData.name,
                description: formData.description,
                url: formData.url,
                imageURL: formData.imageURL,
            })
            .eq('id', id);
        
        if (!error) navigate(`/creator/${id}`);
        else console.log("Update creator's data failed: ", error.message);
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h1 style={titleStyle}>Editing...</h1>
            <label>Name</label>
            <input
                value={formData.name}
                onChange={e => setFormData(
                    {...formData, name: e.target.value})} 
                placeholder="Name" 
                style={inputStyle}
            />
            <label>Description</label>
            <textarea 
                value={formData.description} 
                onChange={e => setFormData(
                    {...formData, description: e.target.value})} 
                placeholder="Description" 
                style={inputStyle}
            />
            <label>URL</label>
            <input
                value={formData.url}
                onChange={e => setFormData(
                    {...formData, url: e.target.value})} 
                style={inputStyle}
            />
            <label>Image URL</label>
            <input
                value={formData.imageURL}
                onChange={e => setFormData(
                    {...formData, imageURL: e.target.value})} 
                style={inputStyle}
            />
            <button type="submit" style={{...buttonStyle, backgroundColor: '#28a745'}}>Save ↓</button>
            <button 
                type="button" 
                onClick={() => navigate(`/creator/${id}`)} 
                style={{...buttonStyle, backgroundColor: '#6c757d'}}
            >Cancel</button>
        </form>
    )
}

const titleStyle = {
    margin: '4px 0',
    fontSize: '1.5rem'
};

const formStyle: React.CSSProperties = { 
    display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '40px auto' 
};

const inputStyle = { 
    padding: '10px', borderRadius: '5px', border: '1px solid #ccc' 
};

const buttonStyle = { 
    padding: '10px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '12px'
};