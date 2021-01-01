import { createContext, useContext } from 'react';

const initialState = {
  stock: null,
  loadingStock: false,
  error: null
};

export const StockInfoContext = createContext(initialState);

export const useStockInfo = () => useContext(StockInfoContext);
