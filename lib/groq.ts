const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export class GroqConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GroqConfigError";
  }
}

export class GroqApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "GroqApiError";
    this.status = status;
  }
}

type GroqMessage = {
  role: "system" | "user";
  content: string;
};

type GroqResponse = {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function generateRppWithGroq(messages: GroqMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  if (!apiKey) {
    throw new GroqConfigError("GROQ_API_KEY belum diatur di environment server.");
  }

  if (!model) {
    throw new GroqConfigError("GROQ_MODEL belum diatur di environment server.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 2200,
      }),
      signal: controller.signal,
    });

    const rawText = await response.text();
    const data = rawText ? (JSON.parse(rawText) as GroqResponse) : undefined;

    if (!response.ok) {
      const providerMessage = data?.error?.message?.trim();

      if (response.status === 401) {
        throw new GroqConfigError("GROQ_API_KEY tidak valid atau sudah tidak aktif.");
      }

      if (response.status === 429) {
        throw new GroqApiError("Groq sedang membatasi permintaan. Coba lagi beberapa saat.", 429);
      }

      if (response.status === 400 && providerMessage?.toLowerCase().includes("model")) {
        throw new GroqConfigError(`GROQ_MODEL tidak valid atau tidak tersedia: ${model}.`);
      }

      throw new GroqApiError(providerMessage || `Groq API error ${response.status}.`, response.status);
    }

    const content = data?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new GroqApiError("Groq tidak mengembalikan konten draft RPP.", response.status);
    }

    return content;
  } catch (error) {
    if (error instanceof GroqConfigError || error instanceof GroqApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new GroqApiError("Permintaan ke Groq melebihi batas waktu. Coba lagi beberapa saat.");
    }

    throw new GroqApiError(error instanceof Error ? error.message : "Terjadi kesalahan saat menghubungi Groq.");
  } finally {
    clearTimeout(timeout);
  }
}
