import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Display from "./components/Display";

// Desmond's comments
// Good

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Display />
    </QueryClientProvider>
  );
}

export default App;
