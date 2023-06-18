import { RouterProvider } from "react-router-dom";
import rootRouter from "@/router";
import "@/assets/style/index.less";

function App() {
  return <RouterProvider router={rootRouter} />;
}

export default App;
