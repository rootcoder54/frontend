import { BACKEND_URL } from "@/types/constant";

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
    const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      method: "GET",
      credentials: "include" // ⚡ renvoie automatiquement le cookie
    });

    if (!response.ok) {
      return null;
    }

    const data: Payload = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
