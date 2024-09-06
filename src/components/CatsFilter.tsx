import React from 'react';
import { useCustomDispatch } from '../hooks/store';
import { setFilter } from '../store/slices/CatSlice';

interface CatsFilterProps {
    filter: 'all' | 'liked';
    onFilterChange: (filter: 'all' | 'liked') => void;
}

const CatsFilter: React.FC<CatsFilterProps> = ({ filter, onFilterChange }) => {
    const dispatch = useCustomDispatch();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = e.target.value as 'all' | 'liked';
        dispatch(setFilter(newFilter));
        onFilterChange(newFilter);
    };

    return (
        <div className='cats-filter'>
            <div
                className='cats-filter__title'
                onClick={() => {
                    document.querySelector('.cats-filter__options')?.classList.toggle('active');
                    document.querySelector('.cats-filter__title')?.classList.toggle('active-filter');
                }}
            >
                Фильтр по {filter === 'all' ? 'всем' : 'избранным'}
            </div>
            <div className='cats-filter__options'>
                <label>
                    <input
                        onChange={handleFilterChange}
                        value='all'
                        name='cats'
                        type='radio'
                        checked={filter === 'all'}
                    />{' '}
                    Все
                </label>
                <label>
                    <input
                        onChange={handleFilterChange}
                        value='liked'
                        name='cats'
                        type='radio'
                        checked={filter === 'liked'}
                    />{' '}
                    Избранные
                </label>
            </div>
        </div>
    );
};

export default CatsFilter;
