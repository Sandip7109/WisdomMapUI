/* eslint-disable no-unused-vars */
import axios from 'axios';

export const getData = async (topic, keyword) => {
  const response = await axios.get(
    `http://13.234.113.33:5000/api?root=${topic}&keyword=${keyword}`
  );
  return response.data.answer;
};
