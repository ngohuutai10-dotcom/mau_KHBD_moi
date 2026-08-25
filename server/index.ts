import express from "express";
import path from "path";
import multer from "multer";
import mammoth from "mammoth";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { lessonPlanGeminiSchema, type LessonPlan } from "./schema";
import { buildSystemInstruction, buildUserPrompt, type GenerateSettings } from "./prompt";
import {
  CHEMISTRY_COMPETENCY_FRAMEWORK,
  GENERAL_COMPETENCIES,
  DIGITAL_COMPETENCY_FRAMEWORK,
  AI_COMPETENCY_FRAMEWORK_2422,
  CORE_QUALITIES
} from "./reference";

dotenv.config();

const app = express();
const PORT = 3000;

// Configure multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
    files: 8
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
      "text/csv",
      "image/png",
      "image/jpeg",
      "image/webp"
    ];
    const allowedExtensions = [".pdf", ".docx", ".txt", ".md", ".csv", ".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Định dạng tệp ${file.originalname} không được hỗ trợ. Chỉ hỗ trợ PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP.`));
    }
  }
});

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Reference Framework API
app.get("/api/reference", (_req, res) => {
  res.json({
    chemistryCompetencies: CHEMISTRY_COMPETENCY_FRAMEWORK,
    generalCompetencies: GENERAL_COMPETENCIES,
    digitalCompetencies: DIGITAL_COMPETENCY_FRAMEWORK,
    aiCompetencies: AI_COMPETENCY_FRAMEWORK_2422,
    coreQualities: CORE_QUALITIES
  });
});

// Generate Lesson Plan API
app.post("/api/generate", upload.array("files", 8), async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Chưa cấu hình GEMINI_API_KEY trong biến môi trường hoặc Secrets. Vui lòng thiết lập GEMINI_API_KEY để tiếp tục."
      });
    }

    let settings: GenerateSettings;
    try {
      settings = typeof req.body.settings === "string" ? JSON.parse(req.body.settings) : req.body.settings;
    } catch {
      return res.status(400).json({ error: "Dữ liệu settings JSON không hợp lệ." });
    }

    if (!settings || !settings.lessonTitle) {
      return res.status(400).json({ error: "Tên bài dạy không được để trống." });
    }

    const files = (req.files as Express.Multer.File[]) || [];
    let extractedTextFromDocs = "";
    const inlineGeminiParts: Array<{ inlineData: { data: string; mimeType: string } }> = [];

    for (const file of files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const mime = file.mimetype;

      if (mime === "application/pdf" || ext === ".pdf") {
        inlineGeminiParts.push({
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: "application/pdf"
          }
        });
      } else if (
        mime.startsWith("image/") ||
        [".png", ".jpg", ".jpeg", ".webp"].includes(ext)
      ) {
        let imageMime = mime;
        if (!imageMime || imageMime === "application/octet-stream") {
          if (ext === ".png") imageMime = "image/png";
          else if (ext === ".webp") imageMime = "image/webp";
          else imageMime = "image/jpeg";
        }
        inlineGeminiParts.push({
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: imageMime
          }
        });
      } else if (
        ext === ".docx" ||
        mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        try {
          const result = await mammoth.extractRawText({ buffer: file.buffer });
          extractedTextFromDocs += `\n--- NỘI DUNG TỆP DOCX: ${file.originalname} ---\n${result.value}\n`;
        } catch (docxErr) {
          console.warn(`Lỗi khi đọc file DOCX ${file.originalname}:`, docxErr);
        }
      } else {
        // TXT, MD, CSV, etc.
        const textContent = file.buffer.toString("utf-8");
        extractedTextFromDocs += `\n--- NỘI DUNG TỆP VĂN BẢN: ${file.originalname} ---\n${textContent}\n`;
      }
    }

    const ai = new GoogleGenAI({ apiKey });
    const selectedModel = settings.model || "gemini-3.7-flash";
    const systemInstruction = buildSystemInstruction();
    const userPromptText = buildUserPrompt(settings, extractedTextFromDocs);

    const contents: any[] = [];
    
    // Add inline files first if any
    for (const inlinePart of inlineGeminiParts) {
      contents.push(inlinePart);
    }
    
    // Add text prompt
    contents.push({ text: userPromptText });

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: lessonPlanGeminiSchema,
        temperature: 0.3
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Không nhận được nội dung phản hồi từ mô hình Gemini.");
    }

    let lessonPlan: LessonPlan;
    try {
      lessonPlan = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Lỗi parse JSON từ Gemini:", responseText);
      return res.status(500).json({
        error: "Không thể phân tích dữ liệu JSON từ mô hình. Vui lòng thử lại.",
        rawText: responseText
      });
    }

    return res.json({
      success: true,
      lessonPlan,
      modelUsed: selectedModel
    });
  } catch (error: any) {
    console.error("Lỗi khi tạo KHBD:", error);
    return res.status(500).json({
      error: error.message || "Đã xảy ra lỗi khi tạo Kế hoạch bài dạy.",
      details: error.toString()
    });
  }
});

// Setup Vite / Static handling
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Kế hoạch bài dạy Hóa học THPT đang chạy trên port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Không thể khởi động server:", err);
  process.exit(1);
});
