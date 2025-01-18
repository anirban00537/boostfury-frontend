import { Button } from "@/components/ui/button";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Post {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  editPath: string;
  showTime?: boolean;
}

export function PostCard({
  post,
  onDelete,
  editPath,
  showTime = true,
}: PostCardProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      {showTime && (
        <div className="w-20 text-sm text-gray-500">
          {new Date(post.updatedAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
      )}
      <div className="flex-1 flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm line-clamp-1">{post.content}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push(`${editPath}${post.id}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            onClick={() => onDelete(post.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
