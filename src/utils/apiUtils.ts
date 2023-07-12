import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://testapiv1.breatheesg.com/api/v1/enterprise/breathe-esg-test/"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};