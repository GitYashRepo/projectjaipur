"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
  sources?: string[]
  onCopy?: () => void
  className?: string
}

export function ChatBubble({ role, content, timestamp, sources, onCopy, className }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex animate-in slide-in-from-bottom-2 duration-300",
        role === "user" ? "justify-end" : "justify-start",
        className,
      )}
    >
      <Card
        className={cn(
          "max-w-[80%] transition-all duration-200 hover:scale-[1.01]",
          role === "user" ? "bg-cyan-600 text-white" : "bg-card",
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm whitespace-pre-wrap">{content}</p>
              {timestamp && <p className="text-xs opacity-70 mt-2">{timestamp.toLocaleTimeString()}</p>}
              {sources && sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/20">
                  <p className="text-xs font-medium mb-2">Sources:</p>
                  <div className="flex flex-wrap gap-1">
                    {sources.map((source, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs transition-all duration-200 hover:scale-105"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {onCopy && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                className="h-6 w-6 transition-all duration-200 hover:scale-110 focus:scale-110"
                aria-label="Copy message content"
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
