import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import Database from "./db.json";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SidebarInset } from "@/components/ui/sidebar";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type Emp = {
  id: string;
  name: string;
  email: string;
  phone: number;
  department: string;
  designation: string;
  doj: string;
  salary: number;
  pass: string;
};

const data: Emp[] = Database as Emp[];
const columnHelper = createColumnHelper<Emp>();
const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("name", { header: "NAME" }),
  columnHelper.accessor("email", { header: "EMAIL" }),
  columnHelper.accessor("phone", { header: "PHONE" }),
  columnHelper.accessor("department", { header: "DEPARTMENT" }),
  columnHelper.accessor("designation", { header: "DESIGNATION" }),
  columnHelper.accessor("doj", { header: "DOJ" }),
  columnHelper.accessor("salary", { header: "SALARY" }),
];

const Task = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState();
  const [department, setDepartment] = useState("");
  const [designation, setdesignation] = useState("");
  const [doj, setDoj] = useState();
  const [salary, setSalary] = useState();
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");
  // const handleSubmit=(e)=>{}
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    setName(data.username);
    setEmail(data.email);
    console.log(`New Entry : ${JSON.stringify(data, null, 2)}`);
    setIsClicked(true);
    alert(
      `New account created\nUsername : ${data["username"]}\nEmail : ${data["email"]}`,
    );
    reset();
  };
  return (
    <>
      <SidebarInset>
        <div className="w-full p-10 items-center justify-center">
          <div className="flex flex-end ml-220 p-5">
            <Field orientation="horizontal">
              <Input
                {...register("id")}
                type="search"
                placeholder="Search..."
                className="w-[300px]"
              />
              <Button onClick={() => setOpen(true)}>Add Emp</Button>
              {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="w-full max-w-sm bg-white">
                    <CardHeader>
                      <CardTitle>Add new Employee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="flex flex-col gap-3 ">
                          <div className="grid gap-1">
                            <Label>Id</Label>
                            <Input
                              {...register("id")}
                              id="id"
                              type="text"
                              placeholder="EMP-000"
                              required
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Name</Label>
                            <Input
                              {...register("name")}
                              id="name"
                              type="text"
                              placeholder="Bhavik"
                              required
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Email</Label>
                            <Input
                              {...register("email")}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Phone</Label>
                            <Input
                              {...register("phone")}
                              id="phone"
                              type="number"
                              placeholder="1234567890"
                              required
                            />
                          </div>

                          <div className="grid gap-1">
                            <Label>Department</Label>
                            <DropdownMenu>
                              <select
                                className="p-2"
                                {...register("department")}
                              >
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>FullStack</option>
                              </select>
                            </DropdownMenu>
                          </div>
                          <div className="grid gap-1">
                            <Label>Designation</Label>
                            <Input
                              {...register("designation")}
                              id="designation"
                              type="text"
                              placeholder="HR"
                              required
                            />
                          </div>

                          <div className="grid gap-1">
                            <Label>Date of joining</Label>
                            <Input
                              {...register("doj")}
                              id="doj"
                              type="date"
                              required
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Salary</Label>
                            <Input
                              {...register("salary")}
                              id="salary"
                              type="number"
                              placeholder="000.00"
                              required
                            />
                          </div>
                          {/* <div className="grid gap-1">
                            <Label>Password</Label>
                            <Input
                              {...register("pass")}
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              required
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label>Confirm Password</Label>
                            <Input
                              {...register("conPass")}
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              required
                            /> */}
                          {/* </div> */}
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex-row gap-2 p-2 justify-center">
                      <Button type="submit">Add User</Button>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="secondary"
                      >
                        Close
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </Field>
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => table.previousPage()}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <Button disabled={true} variant="outline">
                    Pages : {table.getPageCount()}
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default Task;
