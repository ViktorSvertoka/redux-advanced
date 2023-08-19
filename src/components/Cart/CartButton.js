import { mainActions } from '../../store/main-slice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CartButton.module.css';

const CartButton = props => {
  const dispatchAction = useDispatch();
  const itemsQuantity = useSelector(state => state.cart.itemsQuantity);

  const cartVisibilityHandler = () => {
    dispatchAction(mainActions.toggleCartVisibility());
  };

  return (
    <button className={styles.button} onClick={cartVisibilityHandler}>
      <span>Cart</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
