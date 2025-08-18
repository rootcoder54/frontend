"use server";
/*export const login = async (username: string, password: string) => {
  const result = fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  return result;
};*/

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { message: string; token: string };
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
