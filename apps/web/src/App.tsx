import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";
import { queryClient, trpc, trpcClient } from "./utils/trpc";

const App = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
