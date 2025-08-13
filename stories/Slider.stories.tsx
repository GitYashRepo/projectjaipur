import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Slider } from "@/components/ui/slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: { onValueChange: fn() },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Temperature: Story = {
  args: {
    defaultValue: [0.7],
    min: 0,
    max: 2,
    step: 0.1,
  },
  render: (args: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Temperature: 0.7</label>
      <Slider {...args} />
      <p className="text-xs text-muted-foreground">Controls randomness in responses</p>
    </div>
  ),
}

export const MaxTokens: Story = {
  args: {
    defaultValue: [2048],
    min: 1,
    max: 4096,
    step: 1,
  },
  render: (args: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Max Tokens: 2048</label>
      <Slider {...args} />
      <p className="text-xs text-muted-foreground">Maximum length of response</p>
    </div>
  ),
}

export const TopP: Story = {
  args: {
    defaultValue: [1],
    min: 0,
    max: 1,
    step: 0.01,
  },
  render: (args: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Top P: 1.0</label>
      <Slider {...args} />
      <p className="text-xs text-muted-foreground">Controls diversity of responses</p>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: [0.5],
    min: 0,
    max: 1,
    step: 0.1,
    disabled: true,
  },
}

export const Range: Story = {
  args: {
    defaultValue: [0.2, 0.8],
    min: 0,
    max: 1,
    step: 0.1,
  },
  render: (args: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Range Slider</label>
      <Slider {...args} />
      <p className="text-xs text-muted-foreground">Select a range of values</p>
    </div>
  ),
}
