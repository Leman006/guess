import React, { createContext, useEffect, useState } from 'react';
import apiInstance from '../api/axiosInstance';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    apiInstance.get('/products') // Запрос к твоему db.json (продукты)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
        setError(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, error, loader }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
