import { UserProps } from "../types/types";
import { FETCH_USER_API } from "./fetchIp";

export default async function fetchUser(
  params: { email?: string; id?: string } = {}
): Promise<UserProps[] | null> {
  try {
    const queryParams = new URLSearchParams();
    if (params.email) queryParams.append("email", params.email);
    if (params.id) queryParams.append("id", params.id);

    const apiUrl = `${FETCH_USER_API}?${queryParams.toString()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: UserProps[] = await response.json();
    if (!data || Object.keys(data).length === 0) return null;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function postUser(data = {}) {
  try {
    const response = await fetch(FETCH_USER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (!response.ok)
      throw new Error(responseData.message || "Error inserting user data");
    return responseData;
  } catch (error) {
    console.error("Error inserting user data:", error);
    return null;
  }
}

export async function patchUser(id: string, data = {}) {
  try {
    const response = await fetch(`${FETCH_USER_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (!response.ok)
      throw new Error(responseData.message || "Error patching user data");
    return responseData;
  } catch (error) {
    console.error("Error patching user data:", error);
    return null;
  }
}
