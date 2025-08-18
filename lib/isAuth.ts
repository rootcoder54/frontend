interface Payload {
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    email: string;
    password: string;
    telephone: string;
    //createdAt: "2025-08-14T14:59:00.949Z",
    //updatedAt: "2025-08-14T14:59:00.949Z",
    roleId: string;
    shopId: string;
    adresseId: null;
  };
  iat: Date;
  exp: Date;
}
export const getAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await fetch(`http://localhost:3000/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Authorization: `Bearer ${token}`
      }
      //credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { payload: Payload };
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
