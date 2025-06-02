/*Este MODULO contiene los "moldes" para las validaciones (como las Clases en POO) */
import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm';

/* schemas */
export const userSchema = z.object({
    name: z.string().trim().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Correo inválido"), /* email requerido*/
    password: z.string().min(12).max(20), /* max 20 min 12 ab[-_$*#.]*/
    phone: z
        .string()
        .regex(/^\d{10}$/, "Teléfono debe tener 10 dígitos")
        .optional()
        .or(z.literal("")), /* 10 digitos opcional*/
    nickname: z.string().min(3),
})

export const todoSchema = z.object({
    task: z
        .string()
        .trim()
        .min(1, "Obligatorio")
        .max(50, "Máx. 50 caracteres"),
    dueDate: z
        .string()
        .refine(
            (d) => {
                const today = new Date();
                const date = new Date(d);
                return !isNaN(date) && date >= today.setHours(0, 0, 0, 0);
            },
            { message: "Fecha inválida o en el pasado" }
        ),
});

// ---------- Helpers ----------
export function validate(schema, formData) {
    const result = schema.safeParse(formData);
    return result.success ? { data: result.data } : { errors: result.error.flatten().fieldErrors };
}