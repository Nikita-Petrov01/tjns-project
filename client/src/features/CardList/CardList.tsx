import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import type { Props } from '../productCard/ProductCard';
import ProductCard from '../productCard/ProductCard';

export default function CardList(): React.JSX.Element {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   void dispatch(getProducts());
  // }, [dispatch]);
  // const products = useSelector((state: RootState) => state.products.products);

  const products: Props[] = [
    {
      id: 1,
      name: 'Notebook 1',
      description: 'Notebook description',
      image:
        'https://avatars.mds.yandex.net/i?id=875c32f9a15715741cf554790eb5e4a4cd19a57b-4514866-images-thumbs&n=13',
      price: 100,
    },
    {
      id: 2,
      name: 'Notebook 2',
      description: 'Notebook description',
      image:
        'https://avatars.mds.yandex.net/i?id=875c32f9a15715741cf554790eb5e4a4cd19a57b-4514866-images-thumbs&n=13',
      price: 200,
    },
    {
      id: 3,
      name: 'Notebook 3',
      description: 'Notebook description',
      image:
        'https://avatars.mds.yandex.net/i?id=875c32f9a15715741cf554790eb5e4a4cd19a57b-4514866-images-thumbs&n=13',
      price: 300,
    },
    {
      id: 4,
      name: 'Notebook 4',
      description: 'Notebook description',
      image:
        'https://avatars.mds.yandex.net/i?id=875c32f9a15715741cf554790eb5e4a4cd19a57b-4514866-images-thumbs&n=13',
      price: 400,
    },
    {
      id: 5,
      name: 'Notebook 5',
      description: 'Notebook description',
      image:
        'https://avatars.mds.yandex.net/i?id=875c32f9a15715741cf554790eb5e4a4cd19a57b-4514866-images-thumbs&n=13',
      price: 500,
    },
  ];


  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <button>Add</button>
    </Container>
  );
}
