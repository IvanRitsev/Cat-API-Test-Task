import React, { useRef } from 'react';
import { Cat } from '../store/types/types';
import IconSvgSelector from '../assets/icons/IconSvgSelector';
import { useNavigate } from 'react-router-dom';

interface CatCardProps {
    cat: Cat;
    onDelete: () => void;
    onLike: () => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, onDelete, onLike }) => {
    const buttonContainer = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${cat.breeds[0].name}`);
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    }

    return (
        <div onClick={handleCardClick} className='cat-card'>
            <img src={cat.url} alt={cat.breeds[0].name} />
            <h3>{cat.breeds[0].name}</h3>
            <p>{cat.breeds[0].description}</p>
            <div ref={buttonContainer} className='button-container'>
                <button
                    className='remove-button'
                    onClick={(event) => {
                        handleButtonClick(event);
                        onDelete(); 
                    }}>
                    <IconSvgSelector id={'remove-icon'} />
                </button>
                <button
                    onClick={(event) => {
                        handleButtonClick(event);
                        onLike();
                    }}
                    className={cat.liked ? 'like-button liked' : 'like-button'}>
                    <IconSvgSelector id={'like-icon'} />
                </button>
            </div>
        </div>
    );
}

export default React.memo(CatCard);
