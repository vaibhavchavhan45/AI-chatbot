# Context-Aware AI Research Agent

An AI-powered research tool that finds relevant information on the web, answers user questions, and keeps track of the conversation across follow-ups. It runs in the terminal and is built with **JavaScript**, **LangChain**, and **LangGraph**.

When a question needs fresh information, the agent searches the web with Tavily and uses the results in its answer. When it doesn't, it responds directly. Checkpoint-based memory keeps earlier messages available, so follow-up questions work without repeating context.

## Features

- **Web Search:** Retrieves up-to-date information through Tavily search (top 3 results per query).
- **LLM Tool Calling:** The model decides on its own when a search is needed.
- **Conditional Workflow:** A LangGraph graph routes each step between the model and the search tool.
- **Session Memory:** A checkpointer keeps the full message history for the current session.
- **Terminal Interface:** A simple command-line chat built with Node's `readline`.

## How It Works

```text
User message → Agent (model) ──┬── needs a search? → Tools (Tavily Search) → back to Agent
                               └── no → final answer
```

1. The user's message is sent to the model through the LangGraph workflow.
2. If the model requests a search, the tool node runs Tavily and returns the results to the model.
3. This repeats until the model has no more tool calls, then the answer is printed.
4. A `MemorySaver` checkpointer stores the messages under a single thread, so the whole session shares one conversation.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript (ES Modules) | Application logic |
| Bun | Runtime and package manager |
| LangChain | Model and tool integration |
| LangGraph | Agent workflow and memory |
| Groq (`openai/gpt-oss-20b`) | Language model |
| Tavily | Real-time web search |
| Node `readline` | Terminal chat interface |

## Example

```text
User : What are the latest developments in electric vehicles?
(The agent searches the web and summarizes the results.)

User : Which of those is most relevant for India?
(The agent uses the earlier message as context for the follow-up.)
```

This example is illustrative. Actual responses depend on the model and the search results.

## Setup

**Prerequisites:**

- [Bun](https://bun.sh) installed.
- A [Groq](https://console.groq.com) API key.
- A [Tavily](https://tavily.com) API key.

**1. Clone the repository and move into the project folder**

```bash
git clone https://github.com/vaibhavchavhan45/AI-chatbot.git
cd AI-chatbot
```

**2. Install dependencies**

```bash
bun install
```

**3. Configure environment variables**

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## Run

```bash
bun run index.js
```

Type your questions in the terminal. Type `done` to exit.

## Notes

- Memory is held in RAM, so it is cleared when the application stops.
- All messages in a run share one conversation thread.

## Project Structure

```text
.
├── index.js        tool, model, graph, and terminal chat loop
├── package.json    dependencies
├── bun.lock        locked dependency versions
├── jsconfig.json   editor and language settings
└── .gitignore
```

## Project Goal

This project explores how LLM tool calling, conditional graph workflows, and checkpoint-based memory can be combined to build a research assistant that connects external knowledge with conversational continuity.

## Author

Built by **Vaibhav Chavhan**
- Email: [chavhanvaibhav708@gmail.com](mailto:chavhanvaibhav708@gmail.com)
- Portfolio: [vaibhav-chavhan.vercel.app](https://vaibhav-chavhan.vercel.app)
- LinkedIn: [vaibhavchavhan](https://www.linkedin.com/in/vaibhavchavhan/)
- GitHub: [vaibhavchavhan45](https://github.com/vaibhavchavhan45)
