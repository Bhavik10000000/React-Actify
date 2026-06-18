import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./components/ui/UserForm";
import "./types/schema";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmptyCom from "./components/ui/EmptyCom.jsx";
import { Dashboard } from "./components/ui/Dashboard";
import User from "@/components/ui/User";
const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-slate-50 flex flex-col">
        <Tabs defaultValue="task2" className="w-full flex flex-col flex-1">
          <div className="sticky top-0 z-50 w-full h-auto bg-white p-3 shadow-sm flex justify-center border-b">
            <TabsList className="w-[400px]  grid grid-cols-4">
              <TabsTrigger value="task1">Task 1</TabsTrigger>
              <TabsTrigger value="task2">Task 2</TabsTrigger>
              <TabsTrigger value="task3">Task 3</TabsTrigger>
              <TabsTrigger value="task4">Task 4</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 w-full flex items-center justify-center">
            <TabsContent
              value="task1"
              className="w-full h-full m-0 outline-none"
            >
              {/* <Dashboard /> */}
              <UserForm />
            </TabsContent>
            <TabsContent
              value="task2"
              className="w-full flex justify-center m-0 outline-none"
            >
              <User />
            </TabsContent>
            <TabsContent
              value="task3"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task4"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
          </div>
        </Tabs>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
