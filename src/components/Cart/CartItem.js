import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = props => {
  const dispatchAction = useDispatch();

  const { id, title, quantity, total, price } = props.item;

  const addItemHandler = () => {
    dispatchAction(
      cartActions.addItem({
        id,
        title,
        price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatchAction(cartActions.removeItem(id));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{' '}
          <span className={styles['item-price']}>
            (${price.toFixed(2)} / PC.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
