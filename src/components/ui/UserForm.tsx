import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import "../../App.css";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/types/schema";
import { z } from "zod";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { MyContext } from "@/context/MyContext";
type FormValue = z.infer<typeof UserSchema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(UserSchema) });

  const [isClicked, setIsClicked] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  if (isClicked) {
    return (
      <MyContext.Provider value={{ name, email }}>
        <Dashboard />
      </MyContext.Provider>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <h2 className="text-2xl font-bold text-center">
              Create an Account
            </h2>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                {...register("username")}
                type="text"
                placeholder="Bhavik Sapat"
              />
              <FieldDescription>
                Choose a unique alphanumeric username.
              </FieldDescription>
              {errors.username && (
                <FieldDescription className="error-msg">
                  {errors.username.message}
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
              <FieldLabel>Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
              />
              {errors.password && (
                <FieldDescription className="error-msg">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <FieldDescription className="error-msg">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>
            <Button type="submit">Submit</Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
