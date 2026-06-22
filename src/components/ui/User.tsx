import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { PlusIcon } from "lucide-react";

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
      <div className="max-w-4xl px-4">
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
    email: "bhavik@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Pratham",
    email: "pratham@gmail.com",
    role: "User",
  },
  {
    id: 3,
    name: "Talha",
    email: "talha@gmail.com",
    role: "User",
  },
  {
    id: 4,
    name: "Sachin",
    email: "sachin@gmail.com",
    role: "User",
  },
  {
    id: 5,
    name: "Soham",
    email: "soham @gmail.com",
    role: "User",
  },
];

const Data = () => {
  const avatar = "https://github.com/shadcn.png";
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start gap-12 p-6">
        <ItemGroup>
          <h2>Users</h2>
          {Users.map((person) => (
            <Item key={person.id} variant="outline">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={avatar} className="grayscale" />
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{person.name}</ItemTitle>
              </ItemContent>
              <ItemDescription className="items-center">
                {person.email}
              </ItemDescription>
              <ItemDescription className="text-bold">
                {person.role}
              </ItemDescription>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </>
  );
};
