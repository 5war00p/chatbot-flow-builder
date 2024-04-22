**Chatbot Flow Builder** is a [Next.js](https://nextjs.org/) App router project to build a flows using Drag and Drop. It uses [Reactflow](https://reactflow.dev/) and [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

Additionally this application is capable of auto-saving current flow state until session closes (tab closes) using browser's session-storage.

Application contains 2 specific actions:

- **Saving** using save button will validate and make any additional calls like storing in database or calling other APIs.

- **Resetting** using reset button will reset entire working flow that is not saved yet.

_Note: This is built as an assignment for [BiteSpeed](https://www.bitespeed.co/)_

## Run

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment and Demo Links

- [Vercel Deployment URL](https://chatbot-flow-builder-13js.vercel.app/)
- [Loom Video](https://www.loom.com/share/0e0d9a20896e4f5ab81018757f71f7b3?sid=6aab6b10-f1f6-4301-b6a3-3fbc71a40570)
