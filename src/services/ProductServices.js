import apiInstance from "../api/axiosInstance";

export async function getProductByCode(code) {
  const response = await apiInstance.get(`/products?code=${code}`);
  return Array.isArray(response.data) ? response.data[0] : response.data;
}
