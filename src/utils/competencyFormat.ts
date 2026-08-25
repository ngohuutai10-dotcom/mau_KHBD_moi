/**
 * Helpers for formatting and deduplicating competency codes and descriptions
 * Adhering to CT GDPT 2018 & QD 2422/QD-BGDDT
 */

export function normalizeCompetencyCode(value: string): string {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/^(\d{1,2})\.([A-D]\d)\.(MR\d+|\d+)$/i, "$1$2.$3")
    .toUpperCase();
}

export function removeRepeatedCompetencyCode(
  code: string,
  description: string
): string {
  if (!description) return "";

  const cleanCode = String(code ?? "").trim();
  let cleanDescription = String(description).trim();

  if (!cleanCode) {
    return cleanDescription;
  }

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const escapedCode = escapeRegExp(cleanCode);

  // Xóa mã bị lặp ở đầu phần mô tả
  cleanDescription = cleanDescription.replace(
    new RegExp(`^\\s*${escapedCode}\\s*[:：\\-–—]?\\s*`, "i"),
    ""
  );

  return cleanDescription.trim();
}

export function cleanCompetencyDescription(
  code: string,
  description: string
): string {
  if (!description) return "";

  const normalizedCode = normalizeCompetencyCode(code);
  let text = String(description).trim();

  if (!normalizedCode) {
    return text;
  }

  // Loop up to 5 times to clean repeated codes (e.g., "1.2NC2a: 1.2NC2a Đánh giá..." or "12A2.1: 12.A2.1 Nội dung...")
  for (let i = 0; i < 5; i++) {
    // 1. Try matching standard code patterns at the beginning
    const match = text.match(
      /^([0-9]{1,2}(?:\.[0-9]+)?(?:NC[0-9]+[A-Za-z]?|\.?[A-D][0-9]+(?:\.(?:MR)?[0-9]+)?|[A-Za-z0-9_.-]+))\s*[:：\-–—]?\s*/i
    );

    if (match) {
      const leadingCode = match[1];
      if (normalizeCompetencyCode(leadingCode) === normalizedCode) {
        text = text.slice(match[0].length).trim();
        continue;
      }
    }

    // 2. Try matching any first non-whitespace token followed by optional punctuation
    const exactMatch = text.match(/^([^\s:：]+)\s*[:：\-–—]?\s*/);
    if (exactMatch) {
      if (normalizeCompetencyCode(exactMatch[1]) === normalizedCode) {
        text = text.slice(exactMatch[0].length).trim();
        continue;
      }
    }

    break;
  }

  // Remove leading leftover colons or dashes
  text = text.replace(/^[:：\-–—]\s*/, "").trim();

  return text;
}

export function cleanRepeatedCode(code: string, value: string): string {
  return cleanCompetencyDescription(code, value);
}

export function formatCompetencyLine(
  code: string,
  description: string
): string {
  const cleanCode = String(code ?? "").trim();
  const cleanDescription = cleanCompetencyDescription(
    cleanCode,
    description
  );

  if (!cleanCode) {
    return cleanDescription ? `- ${cleanDescription}` : "";
  }

  if (!cleanDescription) {
    return `- ${cleanCode}`;
  }

  return `- ${cleanCode}: ${cleanDescription}`;
}
