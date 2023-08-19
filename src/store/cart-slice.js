import { createSlice } from '@reduxjs/toolkit';
import { mainActions } from './main-slice';

const initialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.itemsQuantity++;
      state.isCartContentChanged = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.itemsQuantity--;
      state.isCartContentChanged = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});

export const sendCartData = cartData => {
  return async dispatchAction => {
    dispatchAction(
      mainActions.showStatusMessage({
        status: 'pending',
        title: 'Sending Data',
        message: 'Cart data is sent to the server...',
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        'https://redux-advanced-fbd14-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cartData.items,
            itemsQuantity: cartData.itemsQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error submitting cart data');
      }
    };

    try {
      await sendDataHttpRequest();

      dispatchAction(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Sending Data Successful',
          message: 'Cart data has been successfully sent to the server!',
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'The request failed',
          message: 'Error sending cart data!',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export const getCartData = () => {
  return async dispatchAction => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        'https://redux-advanced-fbd14-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Unable to retrieve data');
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartActions.updateCart({
          items: cartData.items || [],
          itemsQuantity: cartData.itemsQuantity,
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'The request failed',
          message: 'Error getting cart data!',
        })
      );
    }
  };
};

export default cartSlice;
