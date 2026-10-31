import { MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import readline from "node:readline/promises";
import { ChatGroq } from "@langchain/groq";
import {ToolNode} from "@langchain/langgraph/prebuilt"
import {TavilySearch} from "@langchain/tavily"

//checkpointer / memory
const checkpointer = new MemorySaver()

//Tavily search (web-browsing tool for LLM)
const tool = new TavilySearch({
  maxResults: 3,
  topic: 'general'
})

//Initialise the tool node
const tools = [tool]
const toolNode = new ToolNode(tools)

//Initialize the LLM/model
const model = new ChatGroq({
model: "openai/gpt-oss-20b",
temperature: 0 
}).bindTools(tools);

//Calling LLM
async function callModel(state) {
    // console.log("calling LLM..............."); 
    const response = await model.invoke(state.messages)
    return {messages: [response]};  //return {messages: [...state.messages, response]} (for history)
}

function shouldContinue(state){
  const lastMessage = state.messages[state.messages.length - 1]
  if(lastMessage.tool_calls.length > 0){
    return 'tools'
  }
  return" __end__"
}

//Build the Graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent") // new line
  .compile({checkpointer});

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("User : ");
    if (question == "done") break;

    const finalState = await workflow.invoke({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    }, 
    {configurable: {thread_id: "1"}}
  );

    //console.log("final ", finalState);
    const lastMessage = finalState.messages[finalState.messages.length - 1]
    console.log(lastMessage.content);
    console.log();
  }

  rl.close();
}

main();
