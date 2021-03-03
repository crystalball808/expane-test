import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ClientsList from './component/ClientsList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-full">
        <ClientsList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
