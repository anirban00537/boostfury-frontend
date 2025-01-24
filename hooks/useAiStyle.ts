import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAiStyle,
  updateAiStyle,
  UpdateAiStyleDto,
} from "@/services/ai-content";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { toast } from "react-hot-toast";

export const useAiStyle = () => {
  const queryClient = useQueryClient();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  const {
    data: aiStyle,
    isLoading,
    error,
  } = useQuery(
    ["aiStyle", linkedinProfile?.id],
    () => getAiStyle(linkedinProfile?.id!),
    {
      enabled: !!linkedinProfile?.id,
    }
  );

  const { mutate: updateStyle, isLoading: isUpdating } = useMutation(
    (data: UpdateAiStyleDto) => updateAiStyle(linkedinProfile?.id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["aiStyle"]);
        toast.success("AI style preferences updated successfully");
      },
      onError: () => {
        toast.error("Failed to update AI style preferences");
      },
    }
  );

  return {
    aiStyle,
    isLoading,
    error,
    updateStyle,
    isUpdating,
  };
};
