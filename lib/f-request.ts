import Cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

interface RequestOptions extends RequestInit {
  data?: any;
}

const post = async (url: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        ...(!(data instanceof FormData) && {
          'Content-Type': 'application/json',
        }),
        Authorization: `Bearer ${Cookie.get("token")}`,
        apisecretkeycheck: API_SECRET || "",
      },
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    const result = await response.json();

    // If response is not ok, throw the error
    if (!response.ok) {
      throw {
        message: result.message,
        error: result.error,
        statusCode: result.statusCode
      };
    }

    return result;
  } catch (error: any) {
    // If it's our thrown error, pass it directly
    if (error.message && error.statusCode) {
      throw error;
    }
    
    // For other errors, format them consistently
    throw {
      message: error.message || "An unexpected error occurred",
      error: error.error || "Error",
      statusCode: error.statusCode || 500
    };
  }
};

export const fRequest = {
  post,
  // You can add other methods (get, put, delete) here as needed
};

export default fRequest;
