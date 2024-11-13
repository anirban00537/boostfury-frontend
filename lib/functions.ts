import toast from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
      error?: string;
    };
  };
  message?: string;
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
    // First check for response.data.message
    if (result.response?.data?.message) {
      const message = result.response.data.message;
      if (Array.isArray(message)) {
        message.forEach(msg => toast.error(msg));
      } else {
        toast.error(message);
      }
      return null;
    }

    // Fallback to response.data.error
    if (result.response?.data?.error) {
      toast.error(result.response.data.error);
      return null;
    }

    // Last fallback to direct message
    if (result.message) {
      toast.error(result.message);
      return null;
    }

    return null;
  } catch (err) {
    console.error("Error processing API response:", err);
    return null;
  }
};
