import { useState, useEffect } from "react";
import { Alert } from "react-native";
const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const postData = await fn();
      if (postData) {
        setData(postData);
      }
    } catch (err) {
      Alert.alert("Error ", err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, loading, refetch };
};

export default useAppwrite;
