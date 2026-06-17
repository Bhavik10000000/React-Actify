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
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";

interface FormValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    alert(`New Entry : ${JSON.stringify(data, null, 2)}`);
  };

  const password = useWatch({ control, name: "password" });

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <h2>Create an Account</h2>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be minimum of 3 characters.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Username must contains letters and numbers only.",
                  },
                })}
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
                {...register("email", {
                  required: "Email is required",
                })}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be minimum of 6 characters.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/,
                    message:
                      "Password must contain at least 1 upercase letter, number and a special symbol.",
                  },
                })}
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
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (value) =>
                    value === password || "Password not matches.",
                })}
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
