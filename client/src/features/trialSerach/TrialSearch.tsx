import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { debouncedSearch } from '../../entities/searchOptions/model/searchThunks';

export default function TrialSearch(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.search);

  const handleChange: React.ChangeEvent<HTMLInputElement> = (e): void => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(dispatch, value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Поиск..." />
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
