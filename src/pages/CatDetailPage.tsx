import React from 'react';
import { useCustomSelector } from '../hooks/store';
import { useNavigate, useParams } from 'react-router-dom';
import IconSvgSelector from '../assets/icons/IconSvgSelector';

const CatDetailPage: React.FC = () => {
    const navigate = useNavigate();

    let { name } = useParams<{ name: string }>();
    
    const cats = useCustomSelector((state) => state.CatsSliceReducer.cats);

    const cat = cats.find((cat) => cat.breeds[0].name === name);

    return (
        <div className='cat-detail-page'>
            <div className="container">
                <button className='return-button' onClick={() => navigate('/products')}><IconSvgSelector id='return-arrow' />К карточкам</button>
                <div className='detail-box'>
                    <div className='cat-name'>{cat?.breeds[0].name}</div>
                    <div className='cat-box'>
                        <div className='img-block'>
                            <img src={cat?.url} alt={cat?.breeds[0].name} />
                        </div>
                        <div className='cat-info'>
                            <div className='alt-names'>{cat?.breeds[0].alt_names}</div>
                            <div className='description'>{cat?.breeds[0].description}</div>
                        </div>
                    </div>
                    <div className='cat-more-info'>
                        {cat?.breeds[0].origin && <div className='info-item'>Происхождение: <span>{cat.breeds[0].origin}</span>.</div>} 
                        {cat?.breeds[0].life_span && <div className='info-item'>Продолжительность жизни: <span>{cat.breeds[0].life_span} лет</span>.</div>}
                        {cat?.breeds[0].temperament && <div className='info-item'>Темперамент: <span>{cat.breeds[0].temperament}</span>.</div>}
                        {cat?.breeds[0].weight?.metric && <div className='info-item'>Вес: <span>{cat.breeds[0].weight.metric} кг</span>.</div>}
                        {cat?.breeds[0].affection_level && <div className='info-item'>Уровень привязанности от 1 до 5: <span>{cat.breeds[0].affection_level}</span>.</div>}
                        {cat?.breeds[0].wikipedia_url && <a href={cat.breeds[0].wikipedia_url} className='wikipedia-link' target='_blank'>Ссылка на Википедию.</a>}
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatDetailPage;