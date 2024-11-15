import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ApiError, ApiResponse, CarouselState, ResponseData } from "@/types";
import {
  addAllSlides,
  setAllData,
  setProperty,
} from "@/state/slice/carousel.slice";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getCarousels,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  getCarouselDetails,
} from "@/services/carousels.service";
import { processApiResponse } from "@/lib/functions";
import { useEffect, useState } from "react";
import { setLoading } from "@/state/slice/user.slice";

// Define a new interface for the API response
interface CarouselResponse {
  success: boolean;
  message: string;
  data: {
    items: CarouselItem[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

interface CarouselItem {
  id: string;
  userId: string;
  name: string;
  // ... other properties ...
}

export const useCarouselManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const carouselId = searchParams?.get("id");
  const { loggedin, userinfo, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );

  const CarouselData = useSelector((state: RootState) => state.slides);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const {
    data: carouselsResponse,
    isLoading: isFetchingAll,
    refetch: refetchCarousels,
  } = useQuery<CarouselResponse>(
    ["carousels", currentPage, pageSize, currentWorkspace?.id],
    () => getCarousels(currentPage, pageSize, currentWorkspace?.id || 0),
    {
      enabled: loggedin && !!currentWorkspace,
      onSuccess: (response) => {},
      onError: (error: any) => processApiResponse(error),
      retry: false,
    }
  );

  const {
    mutateAsync: createOrUpdateCarousel,
    isLoading: isCreatingOrUpdating,
  } = useMutation<CarouselResponse, Error, { newName?: string; id?: string }>(
    async ({ newName, id }) => {
      if (id) {
        return updateCarousel({
          id: id,
          data: CarouselData,
          workspaceId: currentWorkspace?.id || 0,
        });
      } else {
        return createCarousel({
          data: CarouselData,
          workspaceId: currentWorkspace?.id || 0,
        });
      }
    },
    {
      onSuccess: (response: any, variables) => {
        console.log("Response from create/update:", response.data);
        if (response && response.success && response.data) {
          let newId = response.data.id;
          if (typeof response.data === "object" && "items" in response.data) {
            newId = response.data.items[0]?.id;
          }
          if (newId) {
            const newUrl = `/carousel-editor?id=${newId}`;
            router.replace(newUrl);
          } else {
            console.error("No carousel ID found in the response");
          }
        }
        processApiResponse(response);
        queryClient.invalidateQueries("carousels");
      },
      onError: (error) => {
        processApiResponse(error);
      },
    }
  );

  const { mutate: deleteCarouselMutation, isLoading: isDeleting } = useMutation<
    ResponseData,
    Error,
    string
  >((id: string) => deleteCarousel(id), {
    onSuccess: (response: ResponseData) => {
      processApiResponse(response);
      refetchCarousels();
    },
    onError: (error) => {
      processApiResponse(error);
    },
  });

  const { isLoading: isLoadingCarouselDetails } = useQuery<
    CarouselState,
    Error
  >(
    ["carouselDetails", carouselId],
    () => getCarouselDetails(carouselId!, currentWorkspace?.id || 0),
    {
      enabled: !!carouselId && !!currentWorkspace,
      onSuccess: (data: any) => {
        console.log("Carousel details:", data);
        dispatch(setAllData(data.data.data));
      },
      onError: (error: Error) => {
        processApiResponse(error);
      },
    }
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    carousels: carouselsResponse?.data?.items,
    pagination: carouselsResponse?.data?.pagination,
    deleteCarousel: deleteCarouselMutation,
    isDeleting,
    isFetchingAll,
    isAuthenticated: loggedin,
    createOrUpdateCarousel,
    isCreatingOrUpdating,
    refetchCarousels,
    handlePageChange,
    currentPage,
    pageSize,
    isLoadingCarouselDetails,
  };
};
