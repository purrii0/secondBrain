import z, { string } from "zod";

const registrationSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8),
});

export default registrationSchema;
