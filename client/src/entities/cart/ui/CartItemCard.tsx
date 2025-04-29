import { Card } from 'react-bootstrap';

type CartItemCardProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  add: () => void;
  remove: () => void;
  isOutOfStock?: boolean;
};

export function CartItemCard({
  image,
  name,
  price,
  quantity,
  stock,
  add,
  remove,
  isOutOfStock = false,
}: CartItemCardProps): React.JSX.Element {
  console.log('Рендер CartItemCard:', {
    name,
    quantity,
    stock,
    isOutOfStock,
  });
  const totalItemPrice = price * quantity;
  return (
    <Card className="shadow-sm p-2">
      <div className="d-flex">
        <div style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
          <Card.Img
            src={image}
            className="h-100 w-100 object-fit-contain"
            alt={name}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="text-truncate">{name}</Card.Title>
            {isOutOfStock ? (
              <Card.Text className="text-danger">Нет в наличии</Card.Text>
            ) : (
              <Card.Text>
                {price.toLocaleString()} ₽ × {quantity} шт. = <strong>{totalItemPrice.toLocaleString()} ₽</strong>
              </Card.Text>
            )}
          </div>

          <div className="d-flex gap-2 align-items-center mt-2">
            <button
              className="btn btn-outline-danger"
              onClick={remove}
              disabled={isOutOfStock}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-outline-success"
              onClick={add}
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}
