import React from "react";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import AppRouter from "./routes/AppRouter.jsx";

function App() {
  return (
    <AppProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </AppProvider>
  );
}

export default App;