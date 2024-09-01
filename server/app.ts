import { Hono } from "hono"
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenseRoute";
import { serveStatic } from "hono/bun"


const app = new Hono();
app.use(logger())


app.get("/", c => { 
  return c.body("Hey")
})


const expensesRoute = app.route("/api/expenses" , expenseRoute)

app.get("*", serveStatic({ root: "./frontend/dist" }))
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }))

export type ExpensesRoute = typeof expensesRoute
export default app;