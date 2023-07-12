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

export const postData = async (data:any) => {
  try {
    const {
      additional_information,
      topic,
      suggested_unit_of_measurement,
      ...values
    } = data;
    const postValues = {
      values,
      template: 0,
      additional_information,
      suggested_unit_of_measurement,
      topic,
    };
    const response = await axios.post(
      "https://testapiv1.breatheesg.com/api/v1/enterprise/breathe-esg-test/",
      postValues
    );
    return response.data;
  } catch (error) {
    console.log("Error posting data:", error);
    throw error;
  }
};
