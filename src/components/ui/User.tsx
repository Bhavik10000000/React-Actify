import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { UserSchema2 } from "@/types/schema";
import { z } from "zod";
// import type { SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// type UserValue = z.infer<typeof UserSchema2>;

// interface UserListItem extends UserValue {
//   id: number;
// }

const App = () => {
  const [id, setId] = useState(2);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (name && email && role) {
      setId((e) => e + 1);
      Users.push({ ...Users, id: id, name: name, email: email, role: role });
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-12 p-6">
      <div className="w-full max-w-xs">
        <FieldGroup>
          <h2>Create User</h2>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              id="fieldgroup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bhavik Sapat"
            />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="bhavik@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <FieldDescription>-</FieldDescription> */}
          </Field>
          <Field>
            <FieldLabel>Role</FieldLabel>
            <Input
              id="fieldgroup-role"
              placeholder="User"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </Field>
        </FieldGroup>
      </div>
      <br />
      <div className="w-full max-w-4xl px-4">
        <Data />
      </div>
    </div>
  );
};
export default App;

//
const Users = [
  {
    id: 1,
    name: "Bhavik",
    email: "sapatbhavik101@gmail.com",
    role: "Admin",
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
