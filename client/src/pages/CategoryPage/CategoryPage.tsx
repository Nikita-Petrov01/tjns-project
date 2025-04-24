import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getCategories } from '../../entities/category/model/categoryThunks';
import { ListGroup } from 'react-bootstrap';

const categories = [
  {
    id: 1,
    name: 'Холодильники',
  },
  {
    id: 2,
    name: 'Стиральные машины',
  },
  {
    id: 3,
    name: 'Пылесосы',
  },
  {
    id: 4,
    name: 'Микроволновые печи',
  },
  {
    id: 5,
    name: 'Посудомоечные машины',
  },
  {
    id: 6,
    name: 'Кухонные плиты',
  },
];

const products = [
  {
    id: 1,
    name: 'Холодильник Samsung RB34T602EF',
    price: 59990,
    categoryId: 1,
    description: 'No Frost, 340 л, серебристый, класс энергопотребления A+',
    image: 'https://vashholodilnik.ru/upload/resize_cache/webp/upload/iblock/07e/373701-0.webp',
    rating: 4.5,
    features: ['No Frost', 'Зона свежести', 'Ice Dispenser'],
  },
  {
    id: 2,
    name: 'Стиральная машина LG F4J6TY2W',
    price: 42990,
    categoryId: 2,
    description: 'Загрузка 8 кг, inverter motor, паровая обработка',
    image: 'https://lgtambov.ru/image/cache/catalog/washing_mashine/F2J3HS2W_1-160x160.jpg',
    rating: 4.7,
    features: ['Паровая стирка', 'AI Direct Drive', 'Тихая работа'],
  },
  {
    id: 3,
    name: 'Пылесос Dyson V11 Absolute',
    price: 54990,
    categoryId: 3,
    description: 'https://dysonmarket.ru/images/1024/3/3370/pylesos-dyson-v11-absolute_0.jpeg',
    image: '/images/dyson-v11.jpg',
    rating: 4.9,
    features: ['Беспроводной', 'Авторежим', 'ЖК-дисплей'],
  },
  {
    id: 4,
    name: 'Микроволновка Bosch BFL634GS1',
    price: 21990,
    categoryId: 4,
    description: 'Объем 25 л, гриль, инверторный нагрев',
    image:
      'https://static.insales-cdn.com/r/As1xWc0i9Ds/rs:fit:1100:1100:1/plain/images/products/1/868/450806628/13hq__34_.jpg@webp',
    rating: 4.3,
    features: ['Гриль', 'Инверторная технология', 'Автоменю'],
  },
];
console.log(categories);
console.log(products);

export default function CategoryPage(): React.ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <ListGroup>
      {categories.map((category) => (
        <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
