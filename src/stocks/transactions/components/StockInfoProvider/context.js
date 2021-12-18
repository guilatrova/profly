import { createContext, useContext } from 'react';

const initialState = {
  error: null,
  loadingStock: false,
  stock: null
};

export const StockInfoContext = createContext(initialState);

export const useStockInfo = () => useContext(StockInfoContext);
