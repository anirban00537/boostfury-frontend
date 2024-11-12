import toast from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface ApiError {
  response?: {
    data?: {
      statusCode?: number;
      message?: string | string[];
      error?: string;
    };
  };
  message?: string;
  error?: string;
  statusCode?: number;
}

export const processApiResponse = (
  result: ApiResponse | ApiError
): any | null => {
  // Handle successful responses
  if ("success" in result) {
    if (result.success) {
      if (result.message) {
        toast.success(result.message);
      }
      return result.data || null;
    } else {
      toast.error(result.message || "An unexpected error occurred");
      return null;
    }
  }

  // Handle error responses
  try {
    // Case 1: Direct error object
    if (result.message && typeof result.message === "string") {
      toast.error(result.message);
      return null;
    }

    // Case 2: Nested error in response.data
    if (result.response?.data) {
      const errorData = result.response.data;
      
      if (typeof errorData.message === "string") {
        toast.error(errorData.message);
      } else if (Array.isArray(errorData.message)) {
        errorData.message.forEach(msg => toast.error(msg));
      } else if (errorData.error) {
        toast.error(`${errorData.error}: ${errorData.statusCode || 'Error'}`);
      }
      return null;
    }

    // Case 3: Fallback error message
    toast.error("An unexpected error occurred");
    return null;
  } catch (err) {
    console.error("Error processing API response:", err);
    toast.error("An unexpected error occurred");
    return null;
  }
};
