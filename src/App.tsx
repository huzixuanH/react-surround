import { RouterProvider } from "react-router-dom";
import rootRouter from "@/router";
import { ConfigProvider } from "antd";
import "@/assets/style/index.less";
import { store } from "@/store";
import { Provider } from "react-redux";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#00b96b',
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={rootRouter} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
