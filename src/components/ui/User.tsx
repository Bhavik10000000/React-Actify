import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import "../../App.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema2 } from "@/types/schema";
import { z } from "zod";

type FormValue = z.infer<typeof UserSchema2>;

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(UserSchema2) });

  const [id, setId] = useState(6);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    setName(data.name);
    setEmail(data.email);
    setRole(data.role);
    if (name && email && role) {
      setId((e) => e + 1);
      Users.push({ ...Users, id: id, name: name, email: email, role: role });
      alert(
        `New account created\nname : ${data["name"]}\nEmail : ${data["email"]}\nRole : ${data["role"]}`,
      );
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-12 p-6">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <h2 className="text-2xl font-bold text-center">Create an User</h2>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Bhavik Sapat"
                />
                {errors.name && (
                  <FieldDescription className="error-msg">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="bhavik@gmail.com"
                />
                {errors.email && (
                  <FieldDescription className="error-msg">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Role</FieldLabel>
                <Input {...register("role")} type="text" placeholder="User" />
                {errors.role && (
                  <FieldDescription className="error-msg">
                    {errors.role.message}
                  </FieldDescription>
                )}
              </Field>

              <Button type="submit">Submit</Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
      <br />
      <div className="w-full max-w-4xl px-4">
        <Data />
      </div>
    </div>
  );
};
export default App;

const Users = [
  {
    id: 1,
    name: "Bhavik",
    email: "sapatbhavik101@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Pratham",
    email: "prathampatil@gmail.com",
    role: "User",
  },
  {
    id: 3,
    name: "Talha",
    email: "khantalha@gmail.com",
    role: "User",
  },
  {
    id: 4,
    name: "Sachin",
    email: "guptasachin@gmail.com",
    role: "User",
  },
  {
    id: 5,
    name: "Soham",
    email: "galandesoham@gmail.com",
    role: "User",
  },
];

const Data = () => {
  return (
    <Table>
      <TableCaption>A list of recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Id</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Users.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="text-center">{invoice.id}</TableCell>
            <TableCell className="font-medium text-center">
              {invoice.name}
            </TableCell>
            <TableCell className="text-center">{invoice.email}</TableCell>
            <TableCell className="text-center">{invoice.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
