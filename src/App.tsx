import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./components/ui/UserForm";
import "./types/schema";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmptyCom from "./components/ui/EmptyCom.jsx";
import { Dashboard } from "./components/ui/Dashboard";
import User from "@/components/ui/User";
import Task3 from "./components/ui/Task3.js";
import { Toaster } from "./components/ui/sonner";
const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-slate-50 flex flex-col">
        <Tabs defaultValue="task4" className="w-full flex flex-col flex-1">
          <div className="sticky top-0 z-50 w-full h-auto bg-white p-3 shadow-sm flex justify-center border-b">
            <TabsList className="w-full max-w-3xl h-auto flex flex-wrap justify-center gap-1 p-1 bg-slate-100 rounded-x">
              <TabsTrigger value="task1">Task 1</TabsTrigger>
              <TabsTrigger value="task2">Task 2</TabsTrigger>
              <TabsTrigger value="task3">Task 3</TabsTrigger>
              <TabsTrigger value="task4-5">Task 4-5</TabsTrigger>
              <TabsTrigger value="task6">Task 6</TabsTrigger>
              <TabsTrigger value="task7">Task 7</TabsTrigger>
              <TabsTrigger value="task8">Task 8</TabsTrigger>
              <TabsTrigger value="task9">Task 9</TabsTrigger>
              <TabsTrigger value="task10">Task 10</TabsTrigger>
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
              <Task3 />
            </TabsContent>
            <TabsContent
              value="task4-5"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task6"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task7"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task8"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task9"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
            <TabsContent
              value="task10"
              className="w-full flex justify-center m-0 outline-none"
            >
              <EmptyCom />
            </TabsContent>
          </div>
        </Tabs>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
};

export default App;
