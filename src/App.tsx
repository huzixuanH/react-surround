import AppLayout from "@/components/layout";
import "@/assets/style/index.less";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // {
      //   path: "contacts/:contactId",
      //   element: <Contact />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
