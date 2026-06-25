import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { createColumnHelper } from "@tanstack/react-table";
import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { VisibilityState } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmpSchema } from "@/utils/EmpValidation";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  fetchUser,
  createUser,
  deleteUser,
  updateUser,
} from "@/features/EmpSlice";
import { useAppDispatch } from "@/store";
import type { RootState } from "@/store";
import { getPaginationRowModel } from "@tanstack/react-table";

type EmpValidation = z.infer<typeof EmpSchema>;
type EmpType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  doj: string;
  salary: number;
  password: string;
  confirmPassword: string;
};

type EmpRow = Omit<EmpType, "password" | "confirmPassword">;

const columnHelper = createColumnHelper<EmpRow>();
const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("phone", { header: "Phone" }),
  columnHelper.accessor("department", { header: "Department" }),
  columnHelper.accessor("designation", { header: "Designation" }),
  columnHelper.accessor("doj", { header: "DOJ" }),
  columnHelper.accessor("salary", { header: "Salary" }),
];

const EmployeeData = () => {
  const [roww, setRow] = useState(5);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.empSlice,
  );
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: roww,
      },
    },
  });
  const dispatch = useAppDispatch();
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const maxId = data
    ? Math.max(...data.map((emp) => parseInt(emp.id.replace("EMP-", ""))))
    : 0;
  const empId = `EMP-${maxId + 1}`;
  console.log(empId);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpValidation>({ resolver: zodResolver(EmpSchema) as any });

  const onSubmit = (data: EmpValidation) => {
    if (add) {
      const user = { ...data, id: empId };
      dispatch(createUser(user as any));
      setAdd(false);
    } else if (edit) {
      dispatch(updateUser(data as any));
      reset();
    }
  };
  useEffect(() => {
    table.setPageSize(roww);
  }, [roww, table]);
  useEffect(() => {
    toast.promise(dispatch(fetchUser()).unwrap(), {
      loading: "Data Loading.",
      success: "Data Loaded.",
      error: "Error occcured.",
    });
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500">
        Something went wrong...
        <br />
        {error}
      </div>
    );
  }
  const handleDelete = (id: string) => {
    const is = confirm(`Confirm to delete the user with ID : ${id} `);
    if (is) {
      dispatch(deleteUser(id as any));
    }
  };
  const handleEdit = (emp: Partial<EmpValidation>) => {
    setEdit(true);
    reset(emp as any);
  };
  return (
    <>
      <div className="overflow-hidden w-full mh-[800px] m-5 pt-0 rounded-md border-2 align-center">
        <h2 className="pt-4  justify-left">EMPLOYEE DETAILS</h2>
        <div className="overflow-hidden m-5 mt-4 p-0 rounded-md border">
          <div className="w-[400px] justify-right p-2 ml-auto">
            <Field orientation="horizontal">
              <Input
                type="search"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                }}
              />
              <Button onClick={() => setAdd(true)} variant="outline">
                Add
              </Button>
            </Field>
          </div>
          <div className="w-auto justify-left p-2 gap-2 flex ">
            <FieldLabel className="pr-5">Filter</FieldLabel>
            <Input
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              className="w-[150px]"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
            />
            <Select
              name={department}
              onValueChange={(value) => {
                setDepartment(value as any);
                table.getColumn("department")?.setFilterValue(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="FullStack">FullStack</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name={designation}
              onValueChange={(value) => {
                setDesignation(value as any);
                table.getColumn("designation")?.setFilterValue(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Intern">Intern</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setColumnFilters([]);
                setGlobalFilter("");
                setDepartment("");
                setDesignation("");
              }}
              variant="outline"
            >
              Clear Filter
            </Button>{" "}
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="ml-auto">
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                    <ButtonGroup className="w-[82px]">
                      <ButtonGroupSeparator />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500"
                        onClick={() => {
                          handleEdit(row.original);
                        }}
                      >
                        Edit
                      </Button>
                      <ButtonGroupSeparator />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => {
                          handleDelete(row.original.id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="justify-center pb-2">
          {" "}
          <Pagination className="mx-0 w-auto">
            <FieldLabel>Rows per page</FieldLabel>
            <Select
              defaultValue="5"
              name="roww"
              onValueChange={(value) => {
                setRow(value as any);
              }}
            >
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "pointer-cursor"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationContent>
                  <p> Pages : {table.getPageCount()}</p>
                </PaginationContent>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "pointer-cursor"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {add && (
          <div className="fixed inset-0 z-50 justify-center align-center pt-20 border ">
            <div className="w-[700px] max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldLegend className="flex">Employee Details</FieldLegend>
                <FieldDescription className="flex pb-5 pt-0 ">
                  Enter employee's appropriate information.
                </FieldDescription>
                <FieldSet>
                  <FieldGroup className=" grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Emp ID</FieldLabel>
                      <Input
                        {...register("id")}
                        type="text"
                        value={empId}
                        readOnly
                      />
                      {errors.id && (
                        <FieldDescription className="text-red-500">
                          {errors.id.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Name</FieldLabel>
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder="Bhavik Sapat"
                        required
                      />
                      {errors.name && (
                        <FieldDescription className="text-red-500">
                          {errors.name.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Email</FieldLabel>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="bhavik@gmail.com"
                        required
                      />
                      {errors.email && (
                        <FieldDescription className="text-red-500">
                          {errors.email.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Phone</FieldLabel>
                      <Input
                        {...register("phone")}
                        type="number"
                        placeholder="1234567890"
                        required
                      />
                      {errors.phone && (
                        <FieldDescription className="text-red-500">
                          {errors.phone.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Departent</FieldLabel>
                      <Controller
                        name="department"
                        control={control}
                        rules={{ required: "Department is required." }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Frontend">Frontend</SelectItem>
                              <SelectItem value="Backend">Backend</SelectItem>
                              <SelectItem value="FullStack">
                                FullStack
                              </SelectItem>
                              <SelectItem value="Database">Database</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Emp Designation</FieldLabel>
                      <Controller
                        name="designation"
                        control={control}
                        rules={{ required: "Designation is required." }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Employee">Employee</SelectItem>
                              <SelectItem value="Intern">Intern</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Emp DOJ</FieldLabel>
                      <Input {...register("doj")} type="date" required />
                      {errors.doj && (
                        <FieldDescription className="text-red-500">
                          {errors.doj.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Salary</FieldLabel>
                      <Input
                        {...register("salary", { valueAsNumber: true })}
                        type="number"
                        placeholder="000.00"
                        required
                      />
                      {errors.salary && (
                        <FieldDescription className="text-red-500">
                          {errors.salary.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        {...register("password")}
                        type="text"
                        placeholder="Example@123"
                        required
                      />
                      {errors.password && (
                        <FieldDescription className="text-red-500">
                          {errors.password.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Confirm Password</FieldLabel>
                      <Input
                        {...register("confirmPassword")}
                        type="text"
                        placeholder="Example@123"
                        required
                      />
                      {errors.confirmPassword && (
                        <FieldDescription className="text-red-500">
                          {errors.confirmPassword.message}
                        </FieldDescription>
                      )}
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal" className="justify-center pt-2">
                  <Button type="submit">Submit</Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setAdd(false)}
                  >
                    Cancel
                  </Button>
                </Field>
              </form>
            </div>
          </div>
        )}
        {edit && (
          <div className="fixed inset-0 z-50 justify-center align-center pt-20 border ">
            <div className="w-[700px] max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldLegend className="flex">Employee Details</FieldLegend>
                <FieldDescription className="flex pb-5 pt-0 ">
                  Enter employee's appropriate information.
                </FieldDescription>
                <FieldSet>
                  <FieldGroup className=" grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Emp ID</FieldLabel>
                      <Input {...register("id")} type="text" readOnly />
                      {errors.id && (
                        <FieldDescription className="text-red-500">
                          {errors.id.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Name</FieldLabel>
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder="Bhavik Sapat"
                        required
                      />
                      {errors.name && (
                        <FieldDescription className="text-red-500">
                          {errors.name.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Email</FieldLabel>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="bhavik@gmail.com"
                        required
                      />
                      {errors.email && (
                        <FieldDescription className="text-red-500">
                          {errors.email.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Phone</FieldLabel>
                      <Input
                        {...register("phone")}
                        type="number"
                        placeholder="1234567890"
                        required
                      />
                      {errors.phone && (
                        <FieldDescription className="text-red-500">
                          {errors.phone.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Departent</FieldLabel>
                      <Controller
                        name="department"
                        control={control}
                        rules={{ required: "Department is required." }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Frontend">Frontend</SelectItem>
                              <SelectItem value="Backend">Backend</SelectItem>
                              <SelectItem value="FullStack">
                                FullStack
                              </SelectItem>
                              <SelectItem value="Database">Database</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Emp Designation</FieldLabel>
                      <Controller
                        name="designation"
                        control={control}
                        rules={{ required: "Designation is required." }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Employee">Employee</SelectItem>
                              <SelectItem value="Intern">Intern</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Emp DOJ</FieldLabel>
                      <Input {...register("doj")} type="date" required />
                      {errors.doj && (
                        <FieldDescription className="text-red-500">
                          {errors.doj.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Emp Salary</FieldLabel>
                      <Input
                        {...register("salary", { valueAsNumber: true })}
                        type="number"
                        placeholder="000.00"
                        required
                      />
                      {errors.salary && (
                        <FieldDescription className="text-red-500">
                          {errors.salary.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        {...register("password")}
                        type="text"
                        placeholder="Example@123"
                        required
                      />
                      {errors.password && (
                        <FieldDescription className="text-red-500">
                          {errors.password.message}
                        </FieldDescription>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Confirm Password</FieldLabel>
                      <Input
                        {...register("confirmPassword")}
                        type="text"
                        placeholder="Example@123"
                        required
                      />
                      {errors.confirmPassword && (
                        <FieldDescription className="text-red-500">
                          {errors.confirmPassword.message}
                        </FieldDescription>
                      )}
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal" className="justify-center pt-2">
                  <Button type="submit">Submit</Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </Field>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeData;
