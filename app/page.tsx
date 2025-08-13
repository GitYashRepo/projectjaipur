"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Send,
  Copy,
  Download,
  Save,
  Trash2,
  Settings,
  MessageSquare,
  History,
  Sun,
  Moon,
  Lightbulb,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/useToast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
}

interface Template {
  id: string
  name: string
  content: string
  category: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

const mockModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
]

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Code Review",
    content: "Please review this code and provide suggestions for improvement:\n\n",
    category: "Development",
  },
  { id: "2", name: "Creative Writing", content: "Write a creative story about:", category: "Creative" },
  {
    id: "3",
    name: "Data Analysis",
    content: "Analyze the following data and provide insights:\n\n",
    category: "Analysis",
  },
  { id: "4", name: "Email Draft", content: "Help me write a professional email about:", category: "Communication" },
]

const mockSources = ["OpenAI Documentation", "Stack Overflow", "GitHub Repository", "Research Paper", "Technical Blog"]

export default function AIInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
  const [topP, setTopP] = useState([1])
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setError(null)
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 20
      })
    }, 200)

    try {
      // Simulate AI response with potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% chance of error for demonstration
          if (Math.random() < 0.1) {
            reject(new Error("API rate limit exceeded. Please try again in a moment."))
          } else {
            resolve(null)
          }
        }, 1500)
      })

      setProgress(100)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response from ${mockModels.find((m) => m.id === selectedModel)?.name}. In a real implementation, this would connect to the actual AI API.\n\nParameters used:\n- Temperature: ${temperature[0]}\n- Max Tokens: ${maxTokens[0]}\n- Top P: ${topP[0]}`,
        timestamp: new Date(),
        sources: mockSources.slice(0, Math.floor(Math.random() * 3) + 1),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
      setProgress(0)
      clearInterval(progressInterval)
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied.",
    })
  }

  const handleSaveTemplate = () => {
    if (!input.trim()) return

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: `Template ${templates.length + 1}`,
      content: input,
      category: "Custom",
    }

    setTemplates((prev) => [...prev, newTemplate])
    toast({
      title: "Template saved",
      description: "Your prompt has been saved as a template.",
    })
  }

  const handleLoadTemplate = (template: Template) => {
    setInput(template.content)
    inputRef.current?.focus()
    toast({
      title: "Template loaded",
      description: `"${template.name}" has been loaded into the editor.`,
    })
  }

  const handleNewConversation = () => {
    if (messages.length > 0) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: messages[0]?.content.slice(0, 50) + "..." || "New Conversation",
        messages: [...messages],
        timestamp: new Date(),
      }
      setConversations((prev) => [newConversation, ...prev])
    }
    setMessages([])
    setCurrentConversation(null)
    setError(null)
    inputRef.current?.focus()
  }

  const handleLoadConversation = (conversation: Conversation) => {
    setMessages(conversation.messages)
    setCurrentConversation(conversation.id)
    setError(null)
  }

  const handleClearMessages = () => {
    setMessages([])
    setError(null)
    inputRef.current?.focus()
    toast({
      title: "Messages cleared",
      description: "All messages have been cleared from the current conversation.",
    })
  }

  const handleExportConversation = () => {
    if (messages.length === 0) return

    const conversationData = {
      model: selectedModel,
      parameters: {
        temperature: temperature[0],
        maxTokens: maxTokens[0],
        topP: topP[0],
      },
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        sources: msg.sources,
      })),
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversation-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Conversation exported",
      description: "Your conversation has been downloaded as a JSON file.",
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "n":
            e.preventDefault()
            handleNewConversation()
            break
          case "s":
            e.preventDefault()
            if (input.trim()) handleSaveTemplate()
            break
          case "e":
            e.preventDefault()
            handleExportConversation()
            break
          case "/":
            e.preventDefault()
            inputRef.current?.focus()
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [input, messages])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-serif font-black text-cyan-600">AI Interface</h1>
          </div>
          <Button
            onClick={handleNewConversation}
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
            aria-label="Start a new conversation (Ctrl+N)"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start New Session
          </Button>
        </div>

        <Tabs defaultValue="history" className="flex-1 flex flex-col mr-8">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-2 mr-4">
            <TabsTrigger value="history" className="transition-all duration-200">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="templates" className="transition-all duration-200">
              <Lightbulb className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="flex-1 px-4">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className={`cursor-pointer transition-all duration-200 hover:bg-accent hover:scale-[1.02] focus-within:bg-accent focus-within:scale-[1.02] ${
                      currentConversation === conversation.id ? "bg-accent ring-2 ring-cyan-600" : ""
                    }`}
                    onClick={() => handleLoadConversation(conversation)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Load conversation: ${conversation.title}`}
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleLoadConversation(conversation)
                      }
                    }}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm font-medium truncate">{conversation.title}</p>
                      <p className="text-xs text-muted-foreground">{conversation.timestamp.toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
                {conversations.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 px-4">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:bg-accent transition-all duration-200 hover:scale-[1.02] focus-within:bg-accent focus-within:scale-[1.02]"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{template.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{template.content}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLoadTemplate(template)}
                        className="w-full transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
                        aria-label={`Load template: ${template.name}`}
                      >
                        Load Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          {isLoading && <Progress value={progress} className="mb-4" />}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-black">Empower Your Development with AI</h2>
              <p className="text-muted-foreground">Seamlessly interact, customize, and innovate.</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-48 transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex flex-col">
                        <span>{model.name}</span>
                        <span className="text-xs text-muted-foreground">{model.provider}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {error && (
                  <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card
                      className={`max-w-[80%] transition-all duration-200 hover:scale-[1.01] ${
                        message.role === "user" ? "bg-cyan-600 text-white" : "bg-card"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.sources && (
                              <div className="mt-3 pt-3 border-t border-border/20">
                                <p className="text-xs font-medium mb-2">Sources:</p>
                                <div className="flex flex-wrap gap-1">
                                  {message.sources.map((source, index) => (
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyMessage(message.content)}
                            className="h-6 w-6 transition-all duration-200 hover:scale-110 focus:scale-110"
                            aria-label="Copy message content"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <Card className="bg-card">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveTemplate}
                    disabled={!input.trim()}
                    className="transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02] bg-transparent"
                    aria-label="Save current input as template (Ctrl+S)"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                  <div className="text-xs text-muted-foreground flex items-center gap-4 ml-auto">
                    <span>Ctrl+N: New</span>
                    <span>Ctrl+S: Save</span>
                    <span>Ctrl+E: Export</span>
                    <span>Ctrl+/: Focus</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    placeholder="Enter your prompt here... (Press Enter to send, Shift+Enter for new line)"
                    className="flex-1 min-h-[60px] resize-none transition-all duration-200 focus:scale-[1.01]"
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    aria-label="Message input"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02] disabled:opacity-50"
                    aria-label="Send message"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters Panel */}
          <div className="w-80 border-l bg-card p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Adjust Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Temperature: {temperature[0]}</Label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={2}
                    min={0}
                    step={0.1}
                    className="mt-2"
                    aria-label="Temperature parameter"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Controls randomness in responses</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Max Tokens: {maxTokens[0]}</Label>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    max={4096}
                    min={1}
                    step={1}
                    className="mt-2"
                    aria-label="Maximum tokens parameter"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Maximum length of response</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Top P: {topP[0]}</Label>
                  <Slider
                    value={topP}
                    onValueChange={setTopP}
                    max={1}
                    min={0}
                    step={0.01}
                    className="mt-2"
                    aria-label="Top P parameter"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Controls diversity of responses</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Quick Actions</h4>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
                    onClick={handleExportConversation}
                    disabled={messages.length === 0}
                    aria-label="Export current conversation (Ctrl+E)"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Conversation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02]"
                    onClick={handleClearMessages}
                    disabled={messages.length === 0}
                    aria-label="Clear all messages"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
