import { z } from "zod";


export const expenseSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  amount: z.number().positive()
})

export const createExpenseSchema = expenseSchema.omit({ id: true })

export type Expense = z.infer<typeof expenseSchema>