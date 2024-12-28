import { ContentInput } from "@/components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";

interface ContentInputProps {
  contentSource: string;
  isGenerating: boolean;
  handleGenerate: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setContent: (content: string) => void;
  isGeneratingLinkedinPosts: boolean;
  handleGenerateLinkedIn: () => void;
  handleLinkedInTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  postTone: string;
  setPostTone: (tone: string) => void;
}

interface PreviewProps {
  isGenerating: boolean;
  generatedPost: string;
  title: string;
}

interface ViralPostGeneratorProps {
  contentInputProps: ContentInputProps;
  previewProps: PreviewProps;
}

export const ViralPostGenerator = ({ contentInputProps, previewProps }: ViralPostGeneratorProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ContentInput {...contentInputProps} />
      <AIWritingPreview {...previewProps} />
    </div>
  );
}; 