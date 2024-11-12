import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation, useQuery } from "react-query";
import { getBrandingData, createOrUpdateBranding } from "@/services/branding.service";
import { ApiResponse } from "@/types";
import { processApiResponse } from "@/lib/functions";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const { loggedin } = useSelector((state: RootState) => state.user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: brandingData, isLoading: isFetchingBranding } = useQuery(
    "branding",
    getBrandingData,
    {
      onSuccess: (data) => {
        const brandingData = data?.data?.branding;
        brandingData &&
          brandingData?.name !== "undefined" &&
          brandingData?.name !== null &&
          dispatch(setName(brandingData?.name));
        brandingData &&
          brandingData?.handle !== "undefined" &&
          brandingData?.handle !== null &&
          dispatch(setHandle(brandingData?.handle));
        brandingData &&
          brandingData?.headshot !== "undefined" &&
          brandingData?.headshot !== null &&
          dispatch(setHeadshot(brandingData?.headshot));
      },
      enabled: loggedin,
    }
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHandle(event.target.value));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      dispatch(setHeadshot(URL.createObjectURL(file)));
    }
  };

  const { mutate: saveBrandingData, isLoading: isSaving } = useMutation(
    async (brandingData: any) => {
      const formData = new FormData();
      formData.append("name", brandingData.name);
      formData.append("handle", brandingData.handle);

      if (imageFile) {
        formData.append("headshot", imageFile);
      }

      const response = await createOrUpdateBranding(formData);
      return response;
    },
    {
      onSuccess: (response: ApiResponse) => {
        processApiResponse(response);
        setImageFile(null);
      },
      onError: (error: Error) => {
        processApiResponse(error);
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loggedin) {
      saveBrandingData({ name, handle, headshot });
    } else {
      toast.error("You must be logged in to save branding data.");
    }
  };

  return {
    name,
    handle,
    headshot,
    handleNameChange,
    handleHandleChange,
    handleImageUpload,
    handleSubmit,
    loading: isFetchingBranding || isSaving,
    imageFile,
    previewImage,
    setPreviewImage,
    isAuthenticated: loggedin,
  };
};

export default useBranding;
