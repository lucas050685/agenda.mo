import { RouterProvider } from "react-router-dom"
import { router } from '@/frontend/providers/router';

function App() {
  return (
    <div className="font-sans">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
