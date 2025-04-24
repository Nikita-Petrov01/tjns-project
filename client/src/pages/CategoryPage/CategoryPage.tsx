import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { deleteCategory, getCategories } from '../../entities/category/model/categoryThunks';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function CategoryPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories.categories);

  const deleteHandler = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteCategory(id));
    } catch (error) {
      console.error('Ошибка удаление категорию', error);
    }
  };

  return (
    <ListGroup className="mt-3">
      {categories.map((category) => (
        <ListGroup.Item key={category.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {category.name}
            <div>
              <img
                src="../../../../../public/icons/edit.png"
                alt="Удалить"
                style={{ width: '20px', marginRight: '10px' }}
                onClick={() => navigate(`/categories/${category.id}/edit`)}
              />
              <img
                src="../../../../../public/icons/delete-2.png"
                alt="Удалить"
                style={{ width: '20px' }}
                onClick={() => deleteHandler(category.id)}
              />
              <img src="" alt="" />
            </div>
          </div>
        </ListGroup.Item>
      ))}
      <button
        style={{
          marginBottom: '10px',
          marginTop: '5px',
          borderRadius: '8px',
          height: '40px',
          width: '100px',
          background: 'black',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => navigate('/categories/create')}
      >
        Добавить
      </button>
    </ListGroup>
  );
}
