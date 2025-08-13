import apiInstance from "../api/axiosInstance";

export async function getProductById(id) {
  const response = await apiInstance.get(`/products/${id}`);
  return response.data;
}
