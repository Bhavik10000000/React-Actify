import { z } from "zod";

export const EmpSchema = z
  .object({
    id: z.string().min(3),
    //   .regex(/^(?=.*[EMP](?=.*[0-9])[-EMP0-9])+$/, {
    //     message: "Invalid ID format.",
    //   }),
    name: z
      .string()
      .min(3)
      .regex(/^[a-zA-Z ]+$/, { message: "Name only contains letters.." }),
    email: z.email(),
    phone: z
      .string()
      .length(10, { message: "Phone no must contain exaclty 10 numbers." }),
    department: z.string(),
    designation: z.string(),
    doj: z.coerce
      .date()
      .max(new Date(), { message: "Joining date must be before tomorrow." })
      .transform((dateObj) => dateObj.toISOString().split("T")[0]),
    salary: z.number().min(0),
    password: z
      .string()
      .min(5)
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]+$/,
        {
          message:
            "Passwod must contains at least a number, uppercase letter, uppercase letter and a special character..",
        },
      ),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password not matches.",
    path: ["confirmPassword"],
  });
