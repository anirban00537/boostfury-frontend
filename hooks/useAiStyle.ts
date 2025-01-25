import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAiStyle,
  updateAiStyle,
  UpdateAiStyleDto,
} from "@/services/ai-content";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { toast } from "react-hot-toast";
import useLinkedIn from "./useLinkedIn";

export const useAiStyle = () => {
  const queryClient = useQueryClient();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const { refetchProfiles } = useLinkedIn();

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
        // Invalidate AI style query and refetch LinkedIn profile
        queryClient.invalidateQueries(["aiStyle"]);
        refetchProfiles();
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
