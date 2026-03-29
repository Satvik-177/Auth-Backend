import { z } from "zod"

export const userQuerySchema = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1).optional()
  ),

  limit: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1).max(100).optional()
  ),

  search: z.string().trim().min(1).optional()
})

export default userQuerySchema;
