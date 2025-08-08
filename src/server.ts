import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
})

const additionSchema = z.object({
  a: z.number(),
  b: z.number(),
})

server.tool(
  "add",
  "Adds two numbers together.",
  additionSchema.shape,
  async (args) => {
    const sum = args.a + args.b
    return {
      content: [
        { type: "text", text: `The sum of ${args.a} and ${args.b} is ${sum}.` }
      ]
    }
  }
)

const transport = new StdioServerTransport()
server.connect(transport)

console.log("MCP server started. Waiting for connections...")