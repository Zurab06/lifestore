import * as z from "zod";

export const SignUpValidation = z.object({
  userName: z.string().min(2).max(50),
  name: z.string().min(2, { message: "name must be at least 2 characters" }),
  email: z.string().email({}),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email({}),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});

export const PostValidation = z.object({
caption : z.string().min(5).max(2200),
file: z.custom<File[]>(),
location: z.string().min(2).max(100),
tags: z.string()
});

