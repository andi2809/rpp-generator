import { NextRequest, NextResponse } from "next/server";
import { GroqApiError, GroqConfigError, generateRppWithGroq } from "@/lib/groq";
import { buildRppPrompt } from "@/lib/prompt-builder";
import { assertRateLimit, getClientKey } from "@/lib/rate-limit";
import { trimRecord } from "@/lib/utils";
import { generateRppSchema, type GenerateRppValues } from "@/schemas/generate-rpp";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const limit = assertRateLimit(getClientKey(request));

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi beberapa saat." },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfter),
          },
        },
      );
    }

    const payloadJson = (await request.json()) as GenerateRppValues;
    const validation = generateRppSchema.safeParse(trimRecord(payloadJson));

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validasi form gagal.",
          details: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { systemPrompt, userPrompt } = buildRppPrompt(validation.data);

    const content = await generateRppWithGroq([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    return NextResponse.json({ content });
  } catch (error) {
    if (error instanceof GroqConfigError) {
      return NextResponse.json(
        {
          error: error.message,
          code: "groq_config_error",
        },
        { status: 500 },
      );
    }

    if (error instanceof GroqApiError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.status === 429 ? "groq_rate_limited" : "groq_api_error",
        },
        { status: error.status ?? 502 },
      );
    }

    const message = error instanceof Error ? error.message : "Terjadi kesalahan tak terduga.";
    return NextResponse.json({ error: message, code: "unknown_error" }, { status: 500 });
  }
}
