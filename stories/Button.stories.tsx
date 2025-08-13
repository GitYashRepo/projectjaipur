import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Button } from "@/components/ui/button"
import { Send, Save } from "lucide-react"

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Start New Session",
    className: "bg-cyan-600 hover:bg-cyan-700",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </>
    ),
    className: "bg-cyan-600 hover:bg-cyan-700",
  },
}

export const IconOnly: Story = {
  args: {
    variant: "ghost",
    size: "icon",
    children: <Save className="w-4 h-4" />,
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: "Loading...",
    className: "bg-cyan-600 opacity-50",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
    variant: "outline",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
    className: "bg-cyan-600 hover:bg-cyan-700",
  },
}
