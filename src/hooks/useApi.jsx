import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createData = async (newData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, newData);
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, updatedData);
      setData((prev) => prev.map((item) => (item.id === id ? response.data : item)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, fetchData, createData, updateData, deleteData };
};

export default useApi;
