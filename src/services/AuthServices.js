import  authInstance  from "../api/axiosInstance";

// Регистрация
async function userSignUp(user) {
  try {
    const res = await authInstance.get(`/users?email=${user.email}`);
    if (res.data.length) {
      throw new Error("Этот email уже зарегистрирован!");
    }
    const newUser = await authInstance.post(`/users`, user);
    return newUser.data;
  } catch (error) {
    throw new Error(error.message || "Ошибка при регистрации!");
  }
}

// Логин
async function userLogin(user) {
  try {
    const res = await authInstance.get(`/users?email=${user.email}&password=${user.password}`);
    if (!res.data.length) {
      throw new Error("Wrong email or password!");
    }
    return res.data[0]; 
  } catch (error) {
    throw new Error(error.message || "Ошибка при входе!");
  }
}

export { userSignUp, userLogin };
