import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$/, "Username must start and end with alphanumeric characters")
  .regex(/^(?!.*__.*$)/, "Username must not contain consecutive underscores")
  .refine(
    (username) => !['admin', 'system', 'mod', 'moderator'].includes(username.toLowerCase()),
    "This username is reserved"
  );

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
