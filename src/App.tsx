import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import CreateContact from "./pages/CreateContact";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UpdateContact from "./pages/UpdateContact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chart from "./pages/Chart";
import Navbar from "./components/Navbar";

function App() {
  const client = new QueryClient();
  return (
    <div className="h-screen relative">
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Router basename="/toolyt-assignment">
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-contact" element={<CreateContact />} />
              <Route path="/update-contact/:id" element={<UpdateContact />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </Router>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
