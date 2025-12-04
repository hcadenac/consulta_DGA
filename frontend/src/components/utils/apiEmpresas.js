import axios from 'axios';
import { useState, useEffect } from 'react';
//import { fetchEmpresas } from '../utils/api';

export const apiEmpresas = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    error: null
  });

const API_BASE_URL = 'http://localhost:3000';

const fetchEmpresas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empresas`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching empresas: ${error.message}`);
  }
};

/* const updateEmpresa = async (id, empresaData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response = await axios.put(`${API_BASE_URL}/empresas/${id}`, empresaData);
      setState(prev => ({
        ...prev,
        data: prev.data.map(item => item.id === id ? response.data : item),
        isLoading: false,
        editingCompany: null
      }));
      return response.data;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }; */

  const fetchData = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchEmpresas();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { ...state, refetch };
};