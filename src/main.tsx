import { createRoot } from "react-dom/client";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
