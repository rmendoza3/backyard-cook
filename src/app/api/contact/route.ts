import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "60 s"), // 3 requests per minute per IP
});

const contactSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(200),
    event_date: z.string().optional(),
    headcount: z.string().optional(),
    fulfillment: z.string().optional(),
    message: z.string().max(2000).optional(),
    website: z.string().max(0).optional()
});

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
        return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
    }

    const origin = request.headers.get("origin");
    const allowedOrigin = process.env.NODE_ENV === "production"
        ? "https://your-vercel-url.vercel.app"
        : "http://localhost:3000";

    if (origin && origin !== allowedOrigin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
        }

        const { name, email, event_date, headcount, fulfillment, message, website } = parsed.data;

        if (website) {
            return NextResponse.json({ success: true }); // pretend success, silently drop
        }

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required." },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Backyard Cook Website <onboarding@resend.dev>",
            to: "bakersfieldbackyardcook@gmail.com",
            replyTo: email,
            subject: `New inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Date requested: ${event_date || "Not specified"}
Headcount: ${headcount || "Not specified"}
Pickup or delivery: ${fulfillment || "Not specified"}

Message:
${message || "No message provided"}
      `.trim(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}