import React, { useEffect, useId, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/CatSlice';
import { useNavigate } from 'react-router-dom';
import { Cat } from '../store/types/types';
import IconSvgSelector from '../assets/icons/IconSvgSelector';

const CreateProduct = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const originRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [image, setImage] = useState<File | null>(null);

    const [errors, setErrors] = useState({
        name: { touched: false, error: '' },
        origin: { touched: false, error: '' },
        description: { touched: false, error: '' }
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useId();

    const validateField = (field: string, value: string) => {
        let error = '';
        switch (field) {
            case 'name':
                if (value.trim().length < 4) error = 'Имя должно содержать не менее 4 символов.';
                break;
            case 'origin':
                if (value.trim() === '') error = 'Происхождение не может быть пустым.';
                break;
            case 'description':
                if (value.trim() === '') error = 'Описание не может быть пустым.';
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: { touched: true, error }
        }));
    };

    const isFormValid = () => {
        return !Object.values(errors).some(error => error.error !== '');
    };

    const handleBlur = (field: string) => {
        const value = field === 'name' ? nameRef.current?.value || '' :
            field === 'origin' ? originRef.current?.value || '' :
                descriptionRef.current?.value || '';
        validateField(field, value);
    };

    const handleFieldChange = (field: string) => {
        const value = field === 'name' ? nameRef.current?.value || '' :
            field === 'origin' ? originRef.current?.value || '' :
                descriptionRef.current?.value || '';
        validateField(field, value);
    };

    useEffect(() => {
        setIsSubmitDisabled(!isFormValid());
    }, [errors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCat: Cat = {
            id,
            breeds: [{
                description: descriptionRef.current?.value || '',
                name: nameRef.current?.value || '',
                origin: originRef.current?.value || '',
            }],
            url: image ? URL.createObjectURL(image) : 'https://sun1-15.userapi.com/s/v1/if1/b0snhOZfuyISoAS656ksvUHaa8_JMAXOpj_cyppIvvjIDz1np2qvg405Tam9ih98fgvTDQ.jpg?size=400x400&quality=96&crop=0,7,689,689&ava=1',
            liked: false,
        };

        dispatch(addProduct(newCat));
        navigate('/');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    return (
        <div className='create-page'>
            <div className="container">
                <button className='return-button' onClick={() => navigate('/products')}>
                    <IconSvgSelector id='return-arrow' />К карточкам
                </button>
                <form className='create-form' onSubmit={handleSubmit}>
                    <div className='form-flex-container'>
                        <div className='form-item'>
                            <div className="tooltip">
                                <input
                                    type="text"
                                    ref={nameRef}
                                    placeholder='Имя'
                                    required
                                    onBlur={() => handleBlur('name')}
                                    onChange={() => handleFieldChange('name')}
                                    className={errors.name.error ? 'input-error' : ''}
                                />
                                {errors.name.touched && errors.name.error && (
                                    <span className="tooltip-text">
                                        {errors.name.error}
                                    </span>
                                )}
                            </div>
                            <div className="tooltip">
                                <input
                                    type="text"
                                    ref={originRef}
                                    placeholder='Происхождение'
                                    required
                                    onBlur={() => handleBlur('origin')}
                                    onChange={() => handleFieldChange('origin')}
                                    className={errors.origin.error ? 'input-error' : ''}
                                />
                                {errors.origin.touched && errors.origin.error && (
                                    <span className="tooltip-text">
                                        {errors.origin.error}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='form-item'>
                            <div className="tooltip">
                                <textarea
                                    ref={descriptionRef}
                                    placeholder='Описание'
                                    required
                                    onBlur={() => handleBlur('description')}
                                    onChange={() => handleFieldChange('description')}
                                    className={errors.description.error ? 'input-error' : ''}
                                />
                                {errors.description.touched && errors.description.error && (
                                    <span className="tooltip-text">
                                        {errors.description.error}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='form-item'>
                            <label>Изображение: </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <button className='submit-button' type="submit" disabled={isSubmitDisabled}>
                            Добавить карточку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
