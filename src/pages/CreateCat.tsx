// CreateProduct.tsx
import React, { useId, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/CatSlice';
import { useNavigate } from 'react-router-dom';
import { Cat } from '../store/types/types';
import IconSvgSelector from '../assets/icons/IconSvgSelector';  

const CreateProduct = () => {
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const origin = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = useId();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCat: Cat = {
            id,
            breeds: [{
                description: description.current?.value || '',
                name: name.current?.value || '',
                origin: origin.current?.value || '',
            }],
            url: image ? URL.createObjectURL(image) : 'https://sun1-15.userapi.com/s/v1/if1/b0snhOZfuyISoAS656ksvUHaa8_JMAXOpj_cyppIvvjIDz1np2qvg405Tam9ih98fgvTDQ.jpg?size=400x400&quality=96&crop=0,7,689,689&ava=1',
            liked: false, 
        };
        dispatch(addProduct(newCat));
        navigate('/');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Сохраняем файл в состояние
        }
    };

    return (
        <div className='create-page'>
            <div className="container">
                <button className='return-button' onClick={() => navigate('/products')}><IconSvgSelector id='return-arrow' />К карточкам</button>
                <form className='create-form' onSubmit={handleSubmit}>
                    <div className='form-flex-container'>
                        <div className='form-item'>
                            <input
                                type="text"
                                ref={name}
                                placeholder='Имя'
                                required
                            />
                            <input
                                type="text"
                                ref={origin}
                                placeholder='Происхождение'
                                required
                            />
                        </div>
                        <div className='form-item'>
                            <textarea   
                                ref={description}
                                placeholder='Описание'
                                required
                            />
                        </div>
                        <div className='form-item'>
                            <label>Изображение: </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <button className='submit-button'  type="submit">Добавить карточку</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
