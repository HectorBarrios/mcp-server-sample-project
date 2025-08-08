import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverCommand = "npx";
const serverArgs = ["tsx", "src/server.ts"];

async function main() {
  console.log("Starting MCP client...");

  const transport = new StdioClientTransport({
    command: serverCommand,
    args: serverArgs,
  });

  const client = new Client({
    name: "demo-client",
    version: "1.0.0",
  });

  console.log("Connecting to the MCP server...");
  await client.connect(transport);

  console.log("Connected! Calling the 'add' tool...");
  
  try {
    const result = await client.callTool({
      name: "add",
      arguments: {
        a: 5,
        b: 10
      }
    });

    if (result.content && result.content[0].type === "text") {
      console.log("Server response:", result.content[0].text);
    } else {
      console.log("Received a non-text response:", result);
    }

  } catch (error) {
    console.error("An error occurred during tool call:", error);
  } finally {
    await client.close();
    console.log("Disconnected from the server.");
  }
}

main();