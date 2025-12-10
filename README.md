# AI-Powered Chatbot Agent (Terminal-Based)

This project is a lightweight **AI-powered chatbot agent** built using **LangChain** and **LangGraph**, running entirely in the **terminal** with the help of the `readline` library.  
It focuses on three core capabilities:

---

## Features

### **1. Text-based AI Responses**
The chatbot can generate high-quality text responses similar to standard conversational AI models.

### **2. Web Search Integration**
It includes a built-in **web search** feature powered by **TavilySearch**, allowing the agent to retrieve real-time information from the internet.

### **3. Memory Management**
Each conversation maintains its own **context and memory**, ensuring the chatbot does not forget previous messages during a session.

These three features combine to create a powerful, intelligent, context-aware AI agent.

---

## Tech Stack

- **Bun** – for fast, modern JavaScript runtime  
- **LangChain** – for orchestrating LLM tools and logic  
- **LangGraph** – to structure the conversational workflow  
- **TavilySearch** – for web search capability  
- **Readline** – for creating the terminal chat interface  

---
  
The chatbot runs completely in the **terminal** with a smooth command-line experience.

---

## How to Run

```bash
bun install
bun run index.ts
