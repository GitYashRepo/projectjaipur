import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { ChatBubble } from "@/components/chat-bubble"

const meta = {
  title: "AI Interface/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["user", "assistant"],
    },
  },
  args: { onCopy: fn() },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatBubble>

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Can you help me implement authentication in my Next.js application?",
    timestamp: new Date(),
  },
}

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content: `I'd be happy to help you implement authentication in your Next.js application! Here are several approaches you can take:

1. **NextAuth.js** - The most popular solution
2. **Supabase Auth** - Full-stack solution with database
3. **Auth0** - Enterprise-grade authentication service
4. **Custom JWT implementation** - For more control

Which approach interests you most?`,
    timestamp: new Date(),
  },
}

export const WithSources: Story = {
  args: {
    role: "assistant",
    content: `Based on the latest documentation, here's how to set up NextAuth.js in your Next.js 13+ application with the app router:

1. Install the required packages
2. Configure your authentication providers
3. Set up the API route
4. Add session provider to your layout

This approach provides excellent TypeScript support and works seamlessly with React Server Components.`,
    timestamp: new Date(),
    sources: ["NextAuth.js Documentation", "Next.js Official Guide", "GitHub Repository"],
  },
}

export const LongMessage: Story = {
  args: {
    role: "assistant",
    content: `Here's a comprehensive guide to implementing authentication in Next.js:

## Installation
First, install NextAuth.js and any required adapters:

\`\`\`bash
npm install next-auth
npm install @next-auth/prisma-adapter prisma @prisma/client
\`\`\`

## Configuration
Create a \`[...nextauth].ts\` file in your \`pages/api/auth\` directory:

\`\`\`typescript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Additional configuration...
})
\`\`\`

## Environment Variables
Add the following to your \`.env.local\` file:

\`\`\`
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
\`\`\`

This setup provides a solid foundation for authentication in your Next.js application.`,
    timestamp: new Date(),
    sources: ["NextAuth.js Documentation", "Next.js Authentication Guide"],
  },
}

export const CodeExample: Story = {
  args: {
    role: "user",
    content: `Here's my current authentication setup:

\`\`\`typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})
\`\`\`

Can you help me add database persistence?`,
    timestamp: new Date(),
  },
}

export const WithoutCopy: Story = {
  args: {
    role: "assistant",
    content: "This message bubble does not have a copy button.",
    timestamp: new Date(),
  },
}
