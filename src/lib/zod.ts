// write types here then import them in controller:
import z from "zod";

const registrationSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8),
});

const loginSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8),
});

const contentSchema = z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()),
});

export { registrationSchema, loginSchema, contentSchema };
