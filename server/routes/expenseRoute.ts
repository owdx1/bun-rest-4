import { Hono } from "hono";
import { fakeExpenses } from "../lib/constants";
import { zValidator } from "@hono/zod-validator";
import { createExpenseSchema } from "../lib/types";
export const expenseRoute = new Hono();


expenseRoute
.get("/", c => {
  return c.json(fakeExpenses)
})

.get("/:id{[0-9]+}", c => { 
  const id  = Number.parseInt(c.req.param('id'))

  const expense = fakeExpenses.find((expense) => expense.id === id);

  if(!expense) {
    return c.notFound();
  }

  return c.json(expense)

})

.get("/total-expense", c => { 
  const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
  return c.json({ total })
})


.post("/create", zValidator("json", createExpenseSchema), c => {
  const { title, amount } = c.req.valid("json");

  fakeExpenses.push({ 
    id: fakeExpenses.length + 1,
    title,
    amount
  })

  return c.json({ message: "Successfully created"},  201)

})