import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import "../../App.css"
import "../../index.css"
import {useForm, type SubmitHandler} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormValues {
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export default function UserForm() {
    const{register,handleSubmit,formState:{errors},} = useForm<FormValues>();

    const onSubmit : SubmitHandler<FormValues> = (data)=>{
        alert(JSON.stringify(data,null,2));
    }
  return (
    <div  className="w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
            <h2>Create an Account </h2>
        <FieldGroup>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input {...register("username",{required:"Username is required."})} type="text" placeholder="Bhavik Sapat" />
          <FieldDescription>
            Choose a unique alphanumeric username for your account.
          </FieldDescription>
          {errors.username && <FieldDescription className="error-msg">{errors.username.message}</FieldDescription>}
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email",{required:"Email is required."})} type="email" placeholder="bhavik@gmail.com" />
          {errors.email && <FieldDescription className="error-msg">{errors.email.message}</FieldDescription>}
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          <Input {...register("password",{required:"Password is required."})} type="password" placeholder="••••••••" />
          {errors.password && <FieldDescription className="error-msg">{errors.password.message}</FieldDescription>}

        </Field>
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input {...register("confirmPassword",{required:"ConfirmPassword is required."})} type="password" placeholder="••••••••" />
          {errors.confirmPassword && <FieldDescription className="error-msg">{errors.confirmPassword.message}</FieldDescription>}

        </Field>
        </FieldGroup>
        <Button type="submit" >Submit</Button>
        </FieldSet>
        </form>
    </div>
  )
}
