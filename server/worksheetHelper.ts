/**
 * Server-side helper for sanitizing worksheets and managing assessment criteria
 */

import type { Worksheet, WorksheetTask } from "./schema";

export const DEFAULT_GROUP_ASSESSMENT_CRITERIA: string[] = [
  "Tham gia đầy đủ vào hoạt động nhóm",
  "Thực hiện đúng nhiệm vụ được phân công",
  "Chủ động trao đổi và đóng góp ý kiến",
  "Lắng nghe và tôn trọng ý kiến của thành viên khác",
  "Sử dụng bằng chứng để giải thích hoặc bảo vệ ý kiến",
  "Tham gia phản biện và điều chỉnh kết quả khi cần",
  "Hợp tác để hoàn thành sản phẩm đúng thời gian"
];

export function sanitizeWorksheetContent(content: string): string {
  if (!content) return "";

  let text = String(content);

  const solutionPatterns = [
    /\n*\s*(?:Hướng dẫn giải|Hướng dẫn thực hiện|Gợi ý giải|Đáp án gợi ý|Đáp án chi tiết|Đáp án|Lời giải|Gợi ý|Cách giải|Solution|Answer key|Key answer)\s*[:：\-–—][\s\S]*$/i,
    /\n*\s*\*{1,2}(?:Hướng dẫn giải|Gợi ý giải|Đáp án|Lời giải)\*{1,2}\s*[:：\-–—]?[\s\S]*$/i
  ];

  for (const pattern of solutionPatterns) {
    text = text.replace(pattern, "");
  }

  const lines = text.split("\n");
  const filteredLines: string[] = [];
  let skippingSolutionBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      /^(?:Hướng dẫn giải|Gợi ý giải|Đáp án gợi ý|Đáp án|Lời giải|Gợi ý|Cách giải)\s*[:：\-–—]/i.test(
        trimmed
      ) ||
      /^\*{1,2}(?:Hướng dẫn giải|Gợi ý giải|Đáp án|Lời giải)\*{1,2}/i.test(trimmed)
    ) {
      skippingSolutionBlock = true;
      continue;
    }

    if (skippingSolutionBlock) {
      if (/^(?:Nhiệm vụ|Câu \d+|Bài \d+|\d+\.)/i.test(trimmed)) {
        skippingSolutionBlock = false;
        filteredLines.push(line);
      }
      continue;
    }

    filteredLines.push(line);
  }

  return filteredLines.join("\n").trim();
}

export function sanitizeWorksheet(ws: Worksheet): Worksheet {
  const cleanWs: Worksheet = {
    id: ws.id,
    title: ws.title || "PHIẾU HỌC TẬP",
    activityName: ws.activityName,
    content: ws.content ? sanitizeWorksheetContent(ws.content) : undefined,
    teacherAnswerKey: ws.teacherAnswerKey || ws.keyAnswer,
  };

  if (Array.isArray(ws.tasks) && ws.tasks.length > 0) {
    cleanWs.tasks = ws.tasks.map((task) => ({
      title: task.title,
      instruction: task.instruction,
      questions: Array.isArray(task.questions)
        ? task.questions.map((q) => sanitizeWorksheetContent(q))
        : []
    }));
  }

  return cleanWs;
}
