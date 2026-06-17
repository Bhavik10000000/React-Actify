import UserForm from "./components/ui/UserForm";
import "./types/schema";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen items-center justify-center">
        <UserForm />
      </div>
      <Routes>
        <Route path="/Dashboard.tsx" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
