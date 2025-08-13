import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Lightbulb } from "lucide-react"

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This is a basic card component with header and content.</p>
      </CardContent>
    </Card>
  ),
}

export const ParametersPanel: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Adjust Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Temperature: 0.7</label>
          <div className="mt-2 h-2 bg-secondary rounded-full">
            <div className="h-2 bg-primary rounded-full w-1/3"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Controls randomness in responses</p>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Export Conversation
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Clear Messages
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
}

export const ConversationHistory: Story = {
  render: () => (
    <Card className="cursor-pointer hover:bg-accent transition-colors">
      <CardContent className="p-3">
        <p className="text-sm font-medium truncate">How to implement authentication in Next.js...</p>
        <p className="text-xs text-muted-foreground">12/14/2024</p>
      </CardContent>
    </Card>
  ),
}

export const Template: Story = {
  render: () => (
    <Card className="cursor-pointer hover:bg-accent">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Code Review</p>
          <Badge variant="secondary" className="text-xs">
            Development
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          Please review this code and provide suggestions for improvement:
        </p>
        <Button size="sm" variant="outline" className="w-full bg-transparent">
          Load Template
        </Button>
      </CardContent>
    </Card>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card className="cursor-pointer hover:bg-accent hover:scale-[1.02] transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium">Interactive Card</h3>
            <p className="text-xs text-muted-foreground">Hover and click effects</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          This card demonstrates interactive states with hover and focus effects.
        </p>
      </CardContent>
    </Card>
  ),
}
