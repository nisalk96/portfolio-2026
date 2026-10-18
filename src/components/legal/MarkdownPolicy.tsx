import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function MarkdownPolicy({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-foreground",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground",
        "[&_em]:text-muted-foreground",
        "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground",
        "[&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground",
        "[&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_li]:my-1",
        "[&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5",
        "[&_p]:my-2",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        "[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
        className,
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
