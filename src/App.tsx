import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Table from './component/Table';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-full">
      <Table />
      </div>
    </QueryClientProvider>
  );
}

export default App;
