import axios from "axios";
export const fetchData = async (url) => {
  try{
    return await axios.get(url);
  } catch(err) {
    throw(err);
  }
};
