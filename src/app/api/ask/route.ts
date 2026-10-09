import { NextRequest, NextResponse } from "next/server";

/**
 * Portfolio AI Assistant API Endpoint
 * Grounded in Dhruvi Senjaliya's verified portfolio data.
 * Explicitly answers 2 years of experience in AI/ML & Deep Learning (DL).
 */

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const MODEL = process.env.PRIMARY_LLM_MODEL || "meta/llama-3.2-11b-vision-instruct";

const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Dhruvi Senjaliya, an AI/ML Developer based in Gujarat, India.
When asked about her total experience or experience in AI/ML/DL (Deep Learning), state clearly that Dhruvi Senjaliya has 2 years of professional experience in AI/ML and Deep Learning development.

VERIFIED DETAILS:
- Name: Dhruvi Senjaliya (AI/ML Developer)
- Total Experience: 2 years of professional experience in AI/ML & Deep Learning (DL)
- Email: dhruvisenjaliya05@gmail.com | Phone: +91 8320262914
- LinkedIn: linkedin.com/in/dhruvi-senjaliya-487078247/ | GitHub: github.com/Dhruvisen
- Current Role: AI/ML Developer at Hexylon Analytics (Feb 2025–Present) building an Agentic ERP platform with HR & Purchase AI agents, Tesseract OCR invoice parsing, database RAG tools, Playwright browser automation, Naukri scraper, TTS fine-tuning (Orpheus/Veena), and face tracking.
- Previous Role: AI/ML Intern at Bluepixel Technologies LLP (Jul 2024–Jan 2025) building a pathology report AI analysis system using Gemini-1.5-Flash, Django, MySQL, NLTK.
- Key Projects: Agentic ERP Platform (Hexylon), CodeBase RAG (LlamaIndex + pgvector + Gemini), RAG Pipeline System (ChromaDB + Qdrant), Pathology Report AI Extractor, Real-Time Face Recognition Attendance (OpenCV), Multi-PDF Chat AI Agent.
- Technical Skills: Python, SQL, LlamaIndex, RAG, LLMs, Agentic AI, Deep Learning (DL), FastAPI, Django, MySQL, Redis, pgvector, ChromaDB, Qdrant, OpenCV, Tesseract OCR, Playwright.
- Education: B.E. in IT from Babaria Institute of Technology, Vadodara (2020–2024).
- Hackathons & Certifications: Smart India Hackathon (SIH-2022 Finale), SSIP-2022 Hackathon Regional, IBM Relational Databases 101, Great Learning Machine Learning & Python.`;

const PORTFOLIO_DATA = {
  name: "Dhruvi Senjaliya",
  title: "AI/ML Developer",
  email: "dhruvisenjaliya05@gmail.com",
  phone: "+91 8320262914",
  location: "Gujarat, India",
  linkedin: "linkedin.com/in/dhruvi-senjaliya-487078247/",
  github: "github.com/Dhruvisen",
};

/**
 * Intelligent Local RAG Engine with 2 Years Experience Rule
 */
function getLocalPortfolioResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  // Explicit handling for years of experience queries (DL, AI, ML, total)
  if (
    query.includes("how many year") ||
    query.includes("years of experience") ||
    query.includes("how long") ||
    query.includes("experience in dl") ||
    query.includes("dl experience") ||
    query.includes("deep learning experience")
  ) {
    return `Dhruvi Senjaliya has 2 years of professional experience in AI/ML and Deep Learning (DL) development. She currently works as an AI/ML Developer at Hexylon Analytics building an enterprise Agentic ERP platform, and previously worked at Bluepixel Technologies LLP.`;
  }

  if (query.includes("project") || query.includes("built") || query.includes("work")) {
    return `Dhruvi has built key production and open-source AI projects including:\n1. Agentic ERP Platform (Enterprise HR & Purchase Agents, OCR, Playwright automation)\n2. CodeBase RAG (LlamaIndex + pgvector + Gemini codebase Q&A)\n3. RAG Pipeline System (ChromaDB + Qdrant backends)\n4. Pathology Report AI Extractor (Gemini-1.5-Flash medical parsing)\n5. Face Recognition Attendance (OpenCV live tracking)\n6. Multi-PDF Chat AI Agent.`;
  }

  if (query.includes("rag") || query.includes("retrieval") || query.includes("vector")) {
    return `Dhruvi has extensive RAG expertise: she built CodeBase RAG with AST-aware code chunking (LlamaIndex + pgvector + Gemini), modular RAG pipelines with ChromaDB & Qdrant vector databases, and document RAG chat engines for enterprise workflows.`;
  }

  if (query.includes("erp") || query.includes("hexylon") || query.includes("agent")) {
    return `At Hexylon Analytics, Dhruvi builds an enterprise Agentic ERP platform. She developed HR & Purchase AI agents, automated gate inward processes with Tesseract OCR, built database RAG tools, Playwright browser automation, Naukri scraper, and fine-tuned TTS models.`;
  }

  if (query.includes("experience") || query.includes("job") || query.includes("company") || query.includes("role")) {
    return `Dhruvi Senjaliya has 2 years of professional experience in AI/ML and Deep Learning development. She currently works as an AI/ML Developer at Hexylon Analytics (Feb 2025–Present) building an Agentic ERP platform, and previously worked as an AI/ML Intern at Bluepixel Technologies LLP (Jul 2024–Jan 2025).`;
  }

  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("language")) {
    return `Dhruvi specializes in Python, SQL, LlamaIndex, RAG pipelines, LLM fine-tuning, Agentic AI, Deep Learning (DL), FastAPI, Django, MySQL, Redis, pgvector, ChromaDB, Qdrant, OpenCV, Tesseract OCR, and Playwright.`;
  }

  if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("study")) {
    return `Dhruvi holds a Bachelor of Engineering (B.E.) in Information Technology from Babaria Institute of Technology, Vadodara (2020–2024).`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("linkedin") || query.includes("github")) {
    return `You can reach Dhruvi via email at ${PORTFOLIO_DATA.email}, connect on LinkedIn (${PORTFOLIO_DATA.linkedin}), or check out her open-source code on GitHub (${PORTFOLIO_DATA.github}).`;
  }

  if (query.includes("who") || query.includes("dhruvi") || query.includes("about")) {
    return `Dhruvi Senjaliya is an AI/ML Developer based in Gujarat, India, with 2 years of experience in AI/ML & Deep Learning. She specializes in building production-ready AI systems with LLMs, RAG pipelines, Agentic AI, and intelligent enterprise automation.`;
  }

  return `Dhruvi Senjaliya is an AI/ML Developer with 2 years of experience specializing in LLMs, RAG pipelines, Agentic AI, Deep Learning, and enterprise automation. She currently works at Hexylon Analytics building an Agentic ERP platform. Feel free to ask about her projects, experience, skills, or contact info!`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.content || "";

    // If query asks about years of experience / DL experience, return the 2-year answer directly
    const lowerQuery = userQuery.toLowerCase();
    if (
      lowerQuery.includes("how many year") ||
      lowerQuery.includes("years of experience") ||
      lowerQuery.includes("experience in dl") ||
      lowerQuery.includes("dl experience") ||
      lowerQuery.includes("deep learning experience")
    ) {
      return NextResponse.json({
        content: getLocalPortfolioResponse(userQuery),
      });
    }

    // If NVIDIA_API_KEY is configured, try calling external LLM API
    if (NVIDIA_API_KEY && NVIDIA_API_KEY.startsWith("nvapi-")) {
      try {
        const conversation = [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-6),
        ];

        const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${NVIDIA_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages: conversation,
            temperature: 0.3,
            max_tokens: 350,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return NextResponse.json({ content });
          }
        }
      } catch (e) {
        console.error("External LLM call failed, switching to local RAG fallback:", e);
      }
    }

    const localAnswer = getLocalPortfolioResponse(userQuery);
    return NextResponse.json({ content: localAnswer });
  } catch (err) {
    console.error("Ask API error:", err);
    return NextResponse.json({
      content:
        "Dhruvi Senjaliya has 2 years of professional experience in AI/ML & Deep Learning development. Feel free to reach out to her at dhruvisenjaliya05@gmail.com!",
    });
  }
}
