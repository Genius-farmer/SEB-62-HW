import React from "react";
import Display from "./components/Display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Display />
    </QueryClientProvider>
  );
}

export default App;
