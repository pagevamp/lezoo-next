import { z } from "zod/v4";

export const serverEnvSchema = z.object({
  REALMS_API: z.string(),
});

export const serverEnv = {
  REALMS_API: process.env.NEXT_PUBLIC_REALMS_API
} as unknown as z.output<typeof serverEnvSchema>;
