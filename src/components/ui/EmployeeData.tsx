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
import list from "./db.json";
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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmpSchema } from "@/utils/EmpValidation";
import { z } from "zod";

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

const data: EmpType[] = list as EmpType[];

const columnHelper = createColumnHelper<EmpType>();
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [open, setOpen] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpValidation>({ resolver: zodResolver(EmpSchema) });
  const onSubmit = (data: EmpValidation) => {
    console.log(data);
  };
  return (
    <>
      <div className="overflow-hidden rounded-md border">
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

      {open && (
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
                      placeholder="EMP-000"
                      required
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
                            <SelectItem value="FullStack">FullStack</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Emp Designation</FieldLabel>
                    <Input
                      {...register("designation")}
                      type="text"
                      placeholder="Inter"
                      required
                    />
                    {errors.designation && (
                      <FieldDescription className="text-red-500">
                        {errors.designation.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Emp DOJ</FieldLabel>
                    <Input
                      {...register("doj", { valueAsDate: true })}
                      type="date"
                      required
                    />
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
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeData;
