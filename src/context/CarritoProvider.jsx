import { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

export const CarritoProvider = ({ children }) => {
  const comprasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'CARRITO_AGREGAR_ITEM':
        return [...state, action.payload];
      case 'CARRITO_AUMENTAR_CANTIDAD':
        return state.map((item) => {
          const cant = item.cantidad + 1;
          if (item.id === action.payload) return { ...item, cantidad: cant };
          return item;
        });
      case 'CARRITO_DISMINUIR_CANTIDAD':
        return state.map((item) => {
          const cant = item.cantidad - 1;
          if (item.id === action.payload && item.cantidad > 1)
            return { ...item, cantidad: cant };
          return item;
        });
      case 'CARRITO_ELIMINAR_ITEM':
        return state.filter((compra) => compra.id !== action.payload);

      default:
        return state;
    }
  };

  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  const agregarCompra = (compra) => {
    compra.cantidad = 1;
    const action = {
      type: 'CARRITO_AGREGAR_ITEM',
      payload: compra,
    };
    dispatch(action);
  };
  const aumentarCantidad = (id) => {
    const action = {
      type: 'CARRITO_AUMENTAR_CANTIDAD',
      payload: id,
    };
    dispatch(action);
  };
  const disminuirCantidad = (id) => {
    const action = {
      type: 'CARRITO_DISMINUIR_CANTIDAD',
      payload: id,
    };
    dispatch(action);
  };
  const eliminarCompra = (id) => {
    const action = {
      type: 'CARRITO_ELIMINAR_ITEM',
      payload: id,
    };
    dispatch(action);
  };

  return (
    <CarritoContext.Provider
      value={{
        listaCompras,
        agregarCompra,
        aumentarCantidad,
        disminuirCantidad,
        eliminarCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
