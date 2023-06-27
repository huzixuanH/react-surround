import { RouterProvider } from "react-router-dom";
import rootRouter from "@/router";
import { ConfigProvider } from "antd";
import "@/assets/style/index.less";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: '#00b96b',
          },
        }}
      >
        <RouterProvider router={rootRouter} />
      </ConfigProvider>
    </>
  );
}

export default App;
