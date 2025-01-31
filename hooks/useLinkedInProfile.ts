import { create } from "zustand";

interface LinkedInProfile {
  id: string;
  name: string;
}

interface LinkedInProfileStore {
  selectedProfile: LinkedInProfile | null;
  setSelectedProfile: (profile: LinkedInProfile | null) => void;
}

export const useLinkedInProfile = create<LinkedInProfileStore>((set) => ({
  selectedProfile: null,
  setSelectedProfile: (profile) => set({ selectedProfile: profile }),
}));
