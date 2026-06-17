import { z } from "zod";

export const UserSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be atleast of 3 characters." })
      .regex(/^[A-Za-z0-9]+$/, {
        message: "Username must contain letters and numbers only.",
      }),
    email: z.string().email({ message: "Enter a valid Email Address." }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast of 6 characters." })
      .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/, {
        message:
          "Password must contain atleast a Uppercase letter, a number and a special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not matches.",
    path: ["confirmPassword"],
  });

// type User = z.infer<typeof UserSchema>;

// const user: User = {
//   username: "Bha123",
//   email: "bhavik@gmail.com",
//   password: "A123@B",
//   confirmPassword: "A123@B",
// };

// console.log("Suucess : " + UserSchema.safeParse(user).success);
// console.log("Error : " + UserSchema.safeParse(user).error);
