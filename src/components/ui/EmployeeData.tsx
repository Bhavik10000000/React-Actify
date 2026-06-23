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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { createColumnHelper } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { fetchUser, createUser } from "@/features/EmpSlice";
import { useAppDispatch } from "@/store";
import type { RootState } from "@/store";
import { getPaginationRowModel } from "@tanstack/react-table";

type EmpValidation = z.infer<typeof EmpSchema>;
type EmpType = {
  id: string;
  name: string;
  email: string;
  phone: number;
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
  const dispatch = useAppDispatch();
  // removed loading,error
  const { data } = useSelector((state: RootState) => state.empSlice);
  useEffect(() => {
    toast.promise(dispatch(fetchUser()), {
      loading: "Data Loading.",
      error: "Error occcured.",
      success: "Data Loaded.",
    });
  }, [dispatch]);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Something went wrong...</div>;
  // }
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
  const count = data.length;
  const empId = `EMP-${count + 1}`;
  console.log(empId);
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpValidation>({ resolver: zodResolver(EmpSchema) as any });

  const onSubmit = (data: EmpValidation) => {
    const user = { ...data, id: empId };
    dispatch(createUser(user as any));
    setOpen(false);
    reset();
  };
  return (
    <>
      <div className="overflow-hidden w-full mh-[600px] m-5 pt-0 rounded-md border-2 align-center">
        <h2 className="pt-4  justify-left">EMPLOYEE DETAILS</h2>
        <div className="overflow-hidden m-5 mt-4 p-0 rounded-md border">
          <div className="w-[300px] justify-right p-2 ml-auto">
            <Field orientation="horizontal">
              <Input type="search" placeholder="Search..." />
              <Button onClick={() => setOpen(true)}>Add</Button>
            </Field>
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
                      >
                        Edit
                      </Button>
                      <ButtonGroupSeparator />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
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
          <Pagination className="mx-0 w-auto">
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
                <PaginationContent>5</PaginationContent>
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
        {open && (
          <div className="fixed inset-0 z-50 justify-center align-center pt-10 border ">
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
                    onClick={() => setOpen(false)}
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
