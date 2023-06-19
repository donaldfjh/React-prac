import '../Cart/CartItem.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  console.log(props)

  return (
    <li className='cart-item'>
      <div>
        <h2>{props.name}</h2>
        <div className='cart-item-summary'>
          <span className='cart-item-price'>{price}</span>
          <span className='cart-item-amount'>x {props.amount}</span>
        </div>
      </div>
      <div className='cart-item-actions'>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
