import * as z from "zod";

export const SignUpValidation = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2, { message: "name must be at least 2 characters" }),
  email: z.string().email({}),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});
