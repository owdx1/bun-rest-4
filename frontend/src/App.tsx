import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function App() {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = () => {
      fetch("/api/expenses/total-expense")
      .then(async (resp) => {
        const body = await resp.json();
        setTotal(body.total)
      })
    }

    fetchTotal();
  }, [])

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-20 flex items-center justify-center hover:bg-lime-200 transition cursor-pointer border-b">
        <Button variant="outline">Click me biach.</Button>
      </div>
      <div className="w-full flex flex-col gap-2 p-4">
        <div className="w-full flex items-center">
          Here are your expenses.
        </div>
        <div>
          <p>Total Expense: <span>{total}</span></p>
        </div>
      </div>
    </div>
  )
}

export default App
