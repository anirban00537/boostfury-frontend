import { cn } from "@/lib/utils";
import { FileText, Upload, X, Sparkles } from "lucide-react";
import { useState } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFFile {
  name: string;
  size: number;
  url: string;
  content?: string;
}

export const PDFToPost = () => {
  const {
    handleGenerateLinkedIn,
    isGeneratingLinkedinPosts,
    generatedPost,
    setContent
  } = useGenerateLinkedInPosts();

  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const extractPdfContent = async (file: File) => {
    setIsExtracting(true);
    try {
      // Load the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('Error extracting PDF content:', error);
      throw error;
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileProcess = async (file: File) => {
    try {
      const extractedContent = await extractPdfContent(file);
      setPdfFile({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        content: extractedContent
      });
      setExtractedText(extractedContent);
      setContent(extractedContent);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      await handleFileProcess(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileProcess(file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
  };

  const generateLinkedInPost = () => {
    if (!pdfFile?.content) return;
    handleGenerateLinkedIn();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">PDF to LinkedIn Post</h2>
          <p className="text-sm text-neutral-500 mt-1">Convert your PDF content into engaging LinkedIn posts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PDF Upload Section */}
        <div className="space-y-4">
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8",
              "transition-all duration-200",
              isDragging ? "border-blue-400 bg-blue-50" : "border-neutral-200",
              pdfFile ? "bg-neutral-50" : "hover:bg-neutral-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!pdfFile ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="size-16 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                  <Upload className="size-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Drop your PDF here
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  or click to browse from your computer
                </p>
                <label className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer">
                  <span>Choose File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-start space-x-4">
                <div className="size-12 flex items-center justify-center bg-blue-50 rounded-lg shrink-0">
                  <FileText className="size-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-neutral-900 truncate">
                    {pdfFile.name}
                  </h4>
                  <p className="text-sm text-neutral-500">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={removePdf}
                  className="shrink-0 size-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>

          {pdfFile && (
            <button
              onClick={generateLinkedInPost}
              disabled={isGeneratingLinkedinPosts}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg",
                "bg-white border border-neutral-200 text-neutral-900",
                "hover:border-neutral-300 transition-all duration-200",
                isGeneratingLinkedinPosts && "opacity-50 cursor-not-allowed"
              )}
            >
              {isGeneratingLinkedinPosts ? (
                <>
                  <div className="animate-spin">
                    <Sparkles className="size-4 text-blue-500" />
                  </div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-blue-500" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 flex items-center justify-center bg-blue-50 rounded-lg">
              <FileText className="size-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Generated Post</h3>
              <p className="text-sm text-neutral-500">
                {generatedPost ? 'Your LinkedIn post is ready' : 'Your post will appear here'}
              </p>
            </div>
          </div>

          {isExtracting ? (
            <div className="h-[400px] rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin">
                  <Sparkles className="size-6 text-blue-500" />
                </div>
                <p className="text-sm text-neutral-500">Extracting PDF content...</p>
              </div>
            </div>
          ) : isGeneratingLinkedinPosts ? (
            <div className="h-[400px] rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin">
                  <Sparkles className="size-6 text-blue-500" />
                </div>
                <p className="text-sm text-neutral-500">Generating LinkedIn post...</p>
              </div>
            </div>
          ) : !pdfFile ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="size-16 flex items-center justify-center bg-neutral-50 rounded-full mb-4">
                <Sparkles className="size-8 text-neutral-400" />
              </div>
              <h3 className="text-neutral-900 font-medium mb-1">Ready to Generate</h3>
              <p className="text-sm text-neutral-500">
                Upload a PDF to start generating AI-powered content
              </p>
            </div>
          ) : generatedPost ? (
            <div className="h-[400px] rounded-lg border border-neutral-200 bg-neutral-50 overflow-auto p-4">
              <div className="prose prose-sm max-w-none">
                {generatedPost}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="size-16 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                <Sparkles className="size-8 text-blue-500" />
              </div>
              <h3 className="text-neutral-900 font-medium mb-1">PDF Uploaded Successfully</h3>
              <p className="text-sm text-neutral-500">
                Click "Generate LinkedIn Post" to create your content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 