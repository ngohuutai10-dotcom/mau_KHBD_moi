import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Header,
  Footer,
  PageNumber,
  ShadingType
} from "docx";
import saveAs from "file-saver";
import type { LessonPlan, LearningActivity, Worksheet, Rubric } from "../types";
import {
  formatAICode,
  formatDigitalCompetencyCode,
  removeLegacyCompetencyCode,
  removePhasePrefix,
  cleanBigQuestion,
  cleanCompetencyDescription
} from "./competencyHelper";
import {
  normalizeWorksheetTasks,
  sanitizeWorksheetContent,
  DEFAULT_GROUP_ASSESSMENT_CRITERIA
} from "./worksheetHelper";

export async function exportLessonPlanToDocx(plan: LessonPlan): Promise<void> {
  const font = "Times New Roman";
  const defaultSize = 24; // 12pt (docx uses half-points: 12 * 2 = 24)
  const defaultLineSpacing = 288; // 1.2 lines (1.0 line = 240 twips, 1.2 * 240 = 288)

  const TABLE_BORDER = {
    style: BorderStyle.SINGLE,
    size: 6, // 0.75 pt in eighths of a point
    color: "000000"
  };

  const TABLE_BORDERS = {
    top: TABLE_BORDER,
    bottom: TABLE_BORDER,
    left: TABLE_BORDER,
    right: TABLE_BORDER,
    insideHorizontal: TABLE_BORDER,
    insideVertical: TABLE_BORDER
  };

  const createBorderedCell = (
    children: Paragraph[],
    width?: number,
    align: AlignmentType = AlignmentType.LEFT
  ): TableCell => {
    return new TableCell({
      width: width
        ? {
            size: width,
            type: WidthType.PERCENTAGE
          }
        : undefined,
      borders: {
        top: TABLE_BORDER,
        bottom: TABLE_BORDER,
        left: TABLE_BORDER,
        right: TABLE_BORDER
      },
      shading: {
        type: ShadingType.CLEAR,
        fill: "FFFFFF",
        color: "auto"
      },
      children
    });
  };

  const createWorksheetTable = (worksheet: Worksheet, wsIdx: number): Table => {
    const rows: TableRow[] = [];

    // Row 1: Header / Title (căn giữa, in đậm)
    rows.push(
      new TableRow({
        children: [
          createBorderedCell([
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { line: defaultLineSpacing, before: 60, after: 60 },
              children: [
                new TextRun({
                  text: worksheet.title || `PHIẾU HỌC TẬP SỐ ${wsIdx + 1}`,
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          ])
        ]
      })
    );

    // Row 2: Tên hoạt động (nếu có)
    if (worksheet.activityName) {
      rows.push(
        new TableRow({
          children: [
            createBorderedCell([
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                children: [
                  new TextRun({
                    text: `Tên hoạt động: ${worksheet.activityName}`,
                    font,
                    size: defaultSize,
                    bold: true,
                    color: "000000"
                  })
                ]
              })
            ])
          ]
        })
      );
    }

    // Row 3: Nhóm & Lớp
    rows.push(
      new TableRow({
        children: [
          createBorderedCell([
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { line: defaultLineSpacing, before: 40, after: 20 },
              children: [
                new TextRun({
                  text: "Nhóm: ....................................",
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { line: defaultLineSpacing, before: 20, after: 40 },
              children: [
                new TextRun({
                  text: "Lớp: ....................................",
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          ])
        ]
      })
    );

    // Rows for Tasks:
    const tasks = normalizeWorksheetTasks(worksheet);
    if (tasks.length > 0) {
      tasks.forEach((task, tIdx) => {
        const paragraphs: Paragraph[] = [];

        if (task.title) {
          paragraphs.push(
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 40, after: 20 },
              children: [
                new TextRun({
                  text: task.title,
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          );
        } else if (tasks.length > 1) {
          paragraphs.push(
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 40, after: 20 },
              children: [
                new TextRun({
                  text: `Nhiệm vụ ${tIdx + 1}:`,
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          );
        }

        if (task.instruction) {
          paragraphs.push(
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 20, after: 20 },
              children: [
                new TextRun({
                  text: task.instruction,
                  font,
                  size: defaultSize,
                  color: "000000"
                })
              ]
            })
          );
        }

        if (Array.isArray(task.questions) && task.questions.length > 0) {
          task.questions.forEach((question, qIdx) => {
            const qText = question.trim();
            const formattedQ = /^Câu\s*\d+/i.test(qText) || /^\d+[\.:]/i.test(qText)
              ? qText
              : `Câu ${qIdx + 1}. ${qText}`;

            paragraphs.push(
              new Paragraph({
                spacing: { line: defaultLineSpacing, before: 30, after: 20 },
                children: [
                  new TextRun({
                    text: formattedQ,
                    font,
                    size: defaultSize,
                    color: "000000"
                  })
                ]
              })
            );

            // Answer space dotted lines
            paragraphs.push(
              new Paragraph({
                spacing: { line: defaultLineSpacing, before: 10, after: 10 },
                children: [
                  new TextRun({
                    text: "........................................................................................................................",
                    font,
                    size: defaultSize,
                    color: "000000"
                  })
                ]
              })
            );
            paragraphs.push(
              new Paragraph({
                spacing: { line: defaultLineSpacing, before: 10, after: 20 },
                children: [
                  new TextRun({
                    text: "........................................................................................................................",
                    font,
                    size: defaultSize,
                    color: "000000"
                  })
                ]
              })
            );
          });
        }

        rows.push(
          new TableRow({
            children: [createBorderedCell(paragraphs)]
          })
        );
      });
    }

    // Row for Kết luận của nhóm
    rows.push(
      new TableRow({
        children: [
          createBorderedCell([
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 40, after: 20 },
              children: [
                new TextRun({
                  text: "Kết luận của nhóm:",
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            }),
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 10, after: 10 },
              children: [
                new TextRun({
                  text: "........................................................................................................................",
                  font,
                  size: defaultSize,
                  color: "000000"
                })
              ]
            }),
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 10, after: 40 },
              children: [
                new TextRun({
                  text: "........................................................................................................................",
                  font,
                  size: defaultSize,
                  color: "000000"
                })
              ]
            })
          ])
        ]
      })
    );

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: TABLE_BORDERS,
      rows
    });
  };

  const createChecklistHeaderCell = (text: string, width: number): TableCell => {
    return new TableCell({
      width: { size: width, type: WidthType.PERCENTAGE },
      borders: {
        top: TABLE_BORDER,
        bottom: TABLE_BORDER,
        left: TABLE_BORDER,
        right: TABLE_BORDER
      },
      shading: {
        type: ShadingType.CLEAR,
        fill: "FFFFFF",
        color: "auto"
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: defaultLineSpacing, before: 60, after: 60 },
          children: [
            new TextRun({
              text,
              font,
              size: defaultSize,
              bold: true,
              color: "000000"
            })
          ]
        })
      ]
    });
  };

  const createGroupAssessmentChecklist = (criteria?: string[]): Table => {
    const actualCriteria = criteria && criteria.length > 0 ? criteria : DEFAULT_GROUP_ASSESSMENT_CRITERIA;

    const headerRow = new TableRow({
      children: [
        createChecklistHeaderCell("STT", 7),
        createChecklistHeaderCell("Tiêu chí đánh giá", 55),
        createChecklistHeaderCell("Đạt", 10),
        createChecklistHeaderCell("Chưa đạt", 14),
        createChecklistHeaderCell("Ghi chú", 14)
      ]
    });

    const rows = actualCriteria.map(
      (criterion, index) =>
        new TableRow({
          children: [
            createBorderedCell(
              [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: String(index + 1),
                      font,
                      size: defaultSize,
                      color: "000000"
                    })
                  ]
                })
              ],
              7
            ),
            createBorderedCell(
              [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: removeLegacyCompetencyCode(criterion),
                      font,
                      size: defaultSize,
                      color: "000000"
                    })
                  ]
                })
              ],
              55
            ),
            createBorderedCell(
              [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: "□",
                      font,
                      size: defaultSize,
                      color: "000000"
                    })
                  ]
                })
              ],
              10
            ),
            createBorderedCell(
              [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: "□",
                      font,
                      size: defaultSize,
                      color: "000000"
                    })
                  ]
                })
              ],
              14
            ),
            createBorderedCell(
              [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: "",
                      font,
                      size: defaultSize,
                      color: "000000"
                    })
                  ]
                })
              ],
              14
            )
          ]
        })
    );

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: TABLE_BORDERS,
      rows: [headerRow, ...rows]
    });
  };

  const createRubricTable = (rubric: Rubric): Table => {
    const headerRow = new TableRow({
      children: [
        createChecklistHeaderCell("STT", 7),
        createChecklistHeaderCell("Tiêu chí", 30),
        createChecklistHeaderCell("Mô tả các mức độ đạt được", 63)
      ]
    });

    const criteriaList = Array.isArray(rubric.criteria) ? rubric.criteria : [];
    const rows = criteriaList.map((crit, idx) => {
      const critName = typeof crit === "string" ? crit : crit.name;
      const levelsText = typeof crit === "string"
        ? ""
        : Array.isArray(crit.levels)
        ? crit.levels.map((l) => removeLegacyCompetencyCode(l)).join("\n• ")
        : "";

      const levelParagraphs: Paragraph[] = (typeof crit === "string" || !Array.isArray(crit.levels))
        ? [new Paragraph({ spacing: { line: defaultLineSpacing }, children: [new TextRun({ text: "", font, size: defaultSize })] })]
        : crit.levels.map((lvl) =>
            new Paragraph({
              spacing: { line: defaultLineSpacing, before: 20, after: 20 },
              children: [
                new TextRun({
                  text: `- ${removeLegacyCompetencyCode(lvl)}`,
                  font,
                  size: defaultSize,
                  color: "000000"
                })
              ]
            })
          );

      return new TableRow({
        children: [
          createBorderedCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                children: [
                  new TextRun({
                    text: String(idx + 1),
                    font,
                    size: defaultSize,
                    color: "000000"
                  })
                ]
              })
            ],
            7
          ),
          createBorderedCell(
            [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: defaultLineSpacing, before: 40, after: 40 },
                children: [
                  new TextRun({
                    text: removeLegacyCompetencyCode(critName),
                    font,
                    size: defaultSize,
                    bold: true,
                    color: "000000"
                  })
                ]
              })
            ],
            30
          ),
          createBorderedCell(levelParagraphs, 63)
        ]
      });
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: TABLE_BORDERS,
      rows: [headerRow, ...rows]
    });
  };

  const createTeacherCellParagraphs = (phaseName: string, items: string[]): Paragraph[] => {
    const paragraphs: Paragraph[] = [];

    if (phaseName?.trim()) {
      paragraphs.push(
        new Paragraph({
          spacing: {
            line: defaultLineSpacing,
            before: 40,
            after: 20
          },
          children: [
            new TextRun({
              text: `${phaseName.trim()}:`,
              font,
              size: defaultSize,
              bold: true,
              color: "000000"
            })
          ]
        })
      );
    }

    items.forEach((item) => {
      if (!item?.trim()) return;
      const cleanItem = removeLegacyCompetencyCode(item);
      if (!cleanItem) return;

      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: {
            line: defaultLineSpacing,
            before: 20,
            after: 20
          },
          children: [
            new TextRun({
              text: cleanItem,
              font,
              size: defaultSize,
              color: "000000"
            })
          ]
        })
      );
    });

    if (paragraphs.length === 0) {
      paragraphs.push(new Paragraph({ spacing: { line: defaultLineSpacing }, children: [new TextRun({ text: "", font, size: defaultSize })] }));
    }

    return paragraphs;
  };

  const createPlainCellParagraphs = (items: string[]): Paragraph[] => {
    const validItems = Array.isArray(items)
      ? items
          .map((item) => removePhasePrefix(removeLegacyCompetencyCode(item)))
          .filter((item) => typeof item === "string" && item.trim() !== "")
      : [];

    if (validItems.length === 0) {
      return [
        new Paragraph({
          spacing: { line: defaultLineSpacing },
          children: [
            new TextRun({
              text: "",
              font,
              size: defaultSize
            })
          ]
        })
      ];
    }

    return validItems.map(
      (item) =>
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: {
            line: defaultLineSpacing,
            before: 20,
            after: 20
          },
          children: [
            new TextRun({
              text: item.trim(),
              font,
              size: defaultSize,
              color: "000000"
            })
          ]
        })
    );
  };

  // Helper for normal paragraph without bullets
  const p = (
    text: string,
    options?: {
      bold?: boolean;
      italic?: boolean;
      size?: number;
      color?: string;
      align?: (typeof AlignmentType)[keyof typeof AlignmentType];
      spaceBefore?: number;
      spaceAfter?: number;
    }
  ) => {
    const sanitizedText = removeLegacyCompetencyCode(text);
    return new Paragraph({
      alignment: options?.align || AlignmentType.LEFT,
      spacing: {
        before: options?.spaceBefore ?? 40,
        after: options?.spaceAfter ?? 40,
        line: defaultLineSpacing
      },
      children: [
        new TextRun({
          text: sanitizedText,
          font,
          size: options?.size || defaultSize,
          bold: options?.bold || false,
          italics: options?.italic || false,
          color: options?.color || "000000"
        })
      ]
    });
  };

  // Helper for mixed text paragraph without bullets
  const pMixed = (
    runs: Array<{ text: string; bold?: boolean; italic?: boolean; size?: number; color?: string }>,
    options?: {
      align?: (typeof AlignmentType)[keyof typeof AlignmentType];
      spaceBefore?: number;
      spaceAfter?: number;
    }
  ) => {
    return new Paragraph({
      alignment: options?.align || AlignmentType.LEFT,
      spacing: {
        before: options?.spaceBefore ?? 40,
        after: options?.spaceAfter ?? 40,
        line: defaultLineSpacing
      },
      children: runs.map(
        (r, idx) =>
          new TextRun({
            text: idx === 0 ? removeLegacyCompetencyCode(r.text) : r.text,
            font,
            size: r.size || defaultSize,
            bold: r.bold || false,
            italics: r.italic || false,
            color: r.color || "000000"
          })
      )
    });
  };

  // Helper to create a single-dash paragraph
  const createDashParagraph = (text: string): Paragraph => {
    const clean = removeLegacyCompetencyCode(text);
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 30, after: 30, line: defaultLineSpacing },
      children: [
        new TextRun({
          text: `- ${clean}`,
          font,
          size: defaultSize,
          color: "000000"
        })
      ]
    });
  };

  // Helper for general/chemistry/quality competency paragraph
  const createGeneralCompetencyParagraph = (title: string, description: string): Paragraph => {
    const cleanTitle = removeLegacyCompetencyCode(title);
    const cleanDesc = removeLegacyCompetencyCode(description);
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 30, after: 30, line: defaultLineSpacing },
      children: [
        new TextRun({
          text: `- ${cleanTitle}: `,
          bold: true,
          font,
          size: defaultSize,
          color: "000000"
        }),
        new TextRun({
          text: cleanDesc,
          font,
          size: defaultSize,
          color: "000000"
        })
      ]
    });
  };

  // Helper for digital competency paragraph
  const createDigitalCompetencyParagraph = (code: string, description: string): Paragraph => {
    const displayCode = formatDigitalCompetencyCode(code);
    const rawDesc = removeLegacyCompetencyCode(description);
    const cleanDescription = cleanCompetencyDescription(displayCode, rawDesc);
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { line: defaultLineSpacing, before: 0, after: 0 },
      children: [
        new TextRun({
          text: `- ${displayCode}: `,
          font,
          size: defaultSize,
          bold: true,
          color: "000000"
        }),
        new TextRun({
          text: cleanDescription,
          font,
          size: defaultSize,
          color: "000000"
        })
      ]
    });
  };

  // Helper for AI competency paragraph
  const createAICompetencyParagraph = (code: string, description: string): Paragraph => {
    const displayCode = formatAICode(code);
    const rawDesc = removeLegacyCompetencyCode(description);
    const cleanDescription = cleanCompetencyDescription(displayCode, rawDesc);
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { line: defaultLineSpacing, before: 0, after: 0 },
      children: [
        new TextRun({
          text: `- ${displayCode}: `,
          font,
          size: defaultSize,
          bold: true,
          color: "000000"
        }),
        new TextRun({
          text: cleanDescription,
          font,
          size: defaultSize,
          color: "000000"
        })
      ]
    });
  };

  // Helper for Section Heading (I. MỤC TIÊU, II. THIẾT BỊ..., etc.)
  const sectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 160, after: 80, line: defaultLineSpacing },
      children: [
        new TextRun({
          text: title,
          font,
          size: 26, // 13pt bold for main section heading
          bold: true,
          color: "000000"
        })
      ]
    });
  };

  // Helper for Subsection Heading (1. Kiến thức, 2. Năng lực, etc.)
  const subSectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 100, after: 40, line: defaultLineSpacing },
      children: [
        new TextRun({
          text: title,
          font,
          size: defaultSize, // 12pt bold
          bold: true,
          color: "000000"
        })
      ]
    });
  };

  const FONT_NAME = "Times New Roman";
  const FONT_SIZE = 24; // 24 half-point = 12 pt
  const LINE_SPACING = 288; // 1.2 lines

  const normalSpacing = {
    line: LINE_SPACING,
    before: 0,
    after: 0,
  };

  const createKHBDMainTitle = (): Paragraph => {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        line: LINE_SPACING,
        before: 0,
        after: 120,
      },
      children: [
        new TextRun({
          text: "KẾ HOẠCH BÀI DẠY MÔN HOÁ HỌC",
          font: FONT_NAME,
          size: FONT_SIZE,
          bold: true,
        }),
      ],
    });
  };

  const createInfoParagraph = (
    label: string,
    value: string
  ): Paragraph => {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: normalSpacing,
      children: [
        new TextRun({
          text: label,
          font: FONT_NAME,
          size: FONT_SIZE,
          bold: true,
        }),
        new TextRun({
          text: value,
          font: FONT_NAME,
          size: FONT_SIZE,
        }),
      ],
    });
  };

  const valueOrDots = (
    value: unknown,
    dots: string
  ): string => {
    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {
      return dots;
    }
    return String(value);
  };

  const createKHBDHeader = (
    data: any
  ): Paragraph[] => {
    const lessonName = data?.lessonName || data?.lessonTitle;
    const periods = data?.numberOfPeriods || data?.periods;
    return [
      createKHBDMainTitle(),
      createInfoParagraph(
        "Tên Bài học/Chủ đề: ",
        valueOrDots(
          lessonName,
          "........................................................................"
        )
      ),
      createInfoParagraph(
        "Loại hình tổ chức: ",
        valueOrDots(
          data?.organizationType,
          "......................................................................"
        )
      ),
      createInfoParagraph(
        "Lớp: ",
        valueOrDots(
          data?.grade,
          "..............."
        )
      ),
      createInfoParagraph(
        "Thời gian thực hiện: ",
        periods
          ? `${periods} tiết`
          : ".......... tiết"
      ),
    ];
  };

  const docChildren: (Paragraph | Table)[] = [];

  // 1. KẾ HOẠCH BÀI DẠY MÔN HOÁ HỌC Header (Standardised according to official format)
  docChildren.push(...createKHBDHeader(plan.header));

  // Spacing before Section I
  docChildren.push(
    new Paragraph({
      spacing: { before: 80, after: 0, line: defaultLineSpacing },
      children: []
    })
  );

  // SECTION I: MỤC TIÊU
  docChildren.push(sectionHeading("I. MỤC TIÊU"));

  // 1. Kiến thức
  docChildren.push(subSectionHeading("1. Kiến thức:"));
  if (plan.objectives.knowledge && plan.objectives.knowledge.length > 0) {
    plan.objectives.knowledge.forEach((k) => {
      docChildren.push(createDashParagraph(k));
    });
  } else {
    docChildren.push(createDashParagraph("Học sinh nắm vững các kiến thức trọng tâm của bài học."));
  }

  // 2. Năng lực
  docChildren.push(subSectionHeading("2. Năng lực:"));

  // a) Năng lực chung
  docChildren.push(p("a) Năng lực chung:", { bold: true }));
  plan.objectives.competencies.generalCompetencies.forEach((gc) => {
    const cleanBehaviors = gc.specificBehaviors
      .map((b) => removeLegacyCompetencyCode(b))
      .filter(Boolean)
      .join("; ");
    docChildren.push(createGeneralCompetencyParagraph(gc.name, cleanBehaviors));
  });

  // b) Năng lực hóa học
  docChildren.push(p("b) Năng lực hóa học (theo CT GDPT 2018):", { bold: true }));
  plan.objectives.competencies.chemistryCompetencies.forEach((cc) => {
    const cleanDesc = removeLegacyCompetencyCode(cc.description);
    const cleanBehaviors = cc.specificBehaviors
      .map((b) => removeLegacyCompetencyCode(b))
      .filter(Boolean)
      .join("; ");
    const fullDesc = cleanDesc && cleanBehaviors ? `${cleanDesc} (Biểu hiện: ${cleanBehaviors})` : cleanDesc || cleanBehaviors;
    docChildren.push(createGeneralCompetencyParagraph(cc.name, fullDesc));
  });

  // c) Năng lực số (nếu có)
  if (
    plan.objectives.competencies.digitalCompetencies &&
    plan.objectives.competencies.digitalCompetencies.length > 0
  ) {
    docChildren.push(p("c) Năng lực số (lồng ghép nếu có):", { bold: true }));
    plan.objectives.competencies.digitalCompetencies.forEach((dc) => {
      const desc = dc.evidence || dc.name;
      docChildren.push(createDigitalCompetencyParagraph(dc.code, desc));
    });
  }

  // d) Năng lực AI (nếu có)
  if (
    plan.objectives.competencies.aiCompetencies &&
    plan.objectives.competencies.aiCompetencies.length > 0
  ) {
    docChildren.push(
      p("d) Năng lực AI (theo QĐ 2422/QĐ-BGDĐT):", { bold: true })
    );
    plan.objectives.competencies.aiCompetencies.forEach((ai) => {
      const desc = ai.evidence || ai.name;
      docChildren.push(createAICompetencyParagraph(ai.code, desc));
    });
  }

  // e) Năng lực tiếng Anh (nếu có)
  if (
    plan.objectives.competencies.englishCompetencies &&
    plan.objectives.competencies.englishCompetencies.length > 0
  ) {
    docChildren.push(p("e) Năng lực tiếng Anh / Danh pháp quốc tế IUPAC:", { bold: true }));
    plan.objectives.competencies.englishCompetencies.forEach((eng) => {
      const aspect = removeLegacyCompetencyCode(eng.aspect);
      const evidence = removeLegacyCompetencyCode(eng.evidence);
      const terms = eng.terminology?.length ? ` (Thuật ngữ: ${eng.terminology.join(", ")})` : "";
      docChildren.push(createGeneralCompetencyParagraph(aspect, `${evidence}${terms}`));
    });
  }

  // 3. Phẩm chất
  docChildren.push(subSectionHeading("3. Phẩm chất:"));
  plan.objectives.qualities.forEach((q) => {
    docChildren.push(createGeneralCompetencyParagraph(q.name, q.evidence));
  });

  // SECTION II: THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
  docChildren.push(sectionHeading("II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU"));
  docChildren.push(
    pMixed([
      { text: "- Giáo viên: ", bold: true },
      { text: removeLegacyCompetencyCode(plan.equipmentAndMaterials.teacher.join("; ")) }
    ])
  );
  docChildren.push(
    pMixed([
      { text: "- Học sinh: ", bold: true },
      { text: removeLegacyCompetencyCode(plan.equipmentAndMaterials.students.join("; ")) }
    ])
  );

  // SECTION IV: TIẾN TRÌNG DẠY HỌC
  docChildren.push(sectionHeading("IV. TIẾN TRÌNG DẠY HỌC"));

  // Build each activity
  plan.learningActivities.forEach((activity: LearningActivity) => {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 140, after: 40, line: defaultLineSpacing },
        children: [
          new TextRun({
            text: `${activity.typeLabel || activity.title} (${activity.durationMinutes} phút - Tiết ${activity.period})`,
            font,
            size: defaultSize, // 12pt bold
            bold: true,
            color: "000000"
          })
        ]
      })
    );

    if (activity.bigQuestion && cleanBigQuestion(activity.bigQuestion)) {
      docChildren.push(
        pMixed([
          { text: "Câu hỏi lớn: ", bold: true },
          { text: cleanBigQuestion(activity.bigQuestion), italic: true }
        ])
      );
    }

    docChildren.push(
      pMixed([
        { text: "a) Mục tiêu: ", bold: true },
        { text: removeLegacyCompetencyCode(activity.objective) }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "b) Nội dung: ", bold: true },
        { text: removeLegacyCompetencyCode(activity.content) }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "c) Sản phẩm: ", bold: true },
        { text: removeLegacyCompetencyCode(activity.product) }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "d) Tổ chức thực hiện:", bold: true, spaceAfter: 40 }
      ])
    );

    // 3-Column Organization Table for Teacher, Student and Board Content (36% / 36% / 28%)
    const tableRows: TableRow[] = [];

    // Header row with white fill, black bold text, black borders
    tableRows.push(
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("HOẠT ĐỘNG CỦA GV", 36),
          createHeaderCell("HOẠT ĐỘNG CỦA HS", 36),
          createHeaderCell("NỘI DUNG GHI BẢNG", 28)
        ]
      })
    );

    // Normalize organization phases
    interface DocxPhase {
      phase: string;
      teacher: string[];
      student: string[];
      boardContent: string[];
    }

    let phasesList: DocxPhase[] = [];
    if (Array.isArray(activity.organization)) {
      phasesList = activity.organization.map((p) => ({
        phase: p.phase || "",
        teacher: Array.isArray(p.teacher) ? p.teacher : p.teacher ? [p.teacher] : [],
        student: Array.isArray(p.student) ? p.student : p.student ? [p.student] : [],
        boardContent: Array.isArray(p.boardContent) ? p.boardContent : p.boardContent ? [p.boardContent] : []
      }));
    } else if (activity.organization && (activity.organization as any).teacherActivities) {
      const legacyOrg = activity.organization as any;
      const maxP = Math.max(legacyOrg.teacherActivities?.length || 0, legacyOrg.studentActivities?.length || 0);
      for (let i = 0; i < maxP; i++) {
        const t = legacyOrg.teacherActivities?.[i] || {};
        const s = legacyOrg.studentActivities?.[i] || {};
        phasesList.push({
          phase: t.phase || s.phase || `Pha ${i + 1}`,
          teacher: t.details ? [t.details] : [],
          student: s.details ? [s.details] : [],
          boardContent: []
        });
      }
    }

    for (const phaseItem of phasesList) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 36, type: WidthType.PERCENTAGE },
              borders: {
                top: TABLE_BORDER,
                bottom: TABLE_BORDER,
                left: TABLE_BORDER,
                right: TABLE_BORDER
              },
              children: createTeacherCellParagraphs(phaseItem.phase, phaseItem.teacher)
            }),
            new TableCell({
              width: { size: 36, type: WidthType.PERCENTAGE },
              borders: {
                top: TABLE_BORDER,
                bottom: TABLE_BORDER,
                left: TABLE_BORDER,
                right: TABLE_BORDER
              },
              children: createPlainCellParagraphs(phaseItem.student)
            }),
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              borders: {
                top: TABLE_BORDER,
                bottom: TABLE_BORDER,
                left: TABLE_BORDER,
                right: TABLE_BORDER
              },
              children: createPlainCellParagraphs(phaseItem.boardContent)
            })
          ]
        })
      );
    }

    const activityTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: TABLE_BORDERS,
      rows: tableRows
    });

    docChildren.push(activityTable);
  });

  // SECTION V: PHỤ LỤC
  if (plan.appendices && (plan.appendices.worksheets?.length || plan.appendices.rubrics?.length || plan.appendices.safetyNotes?.length)) {
    docChildren.push(sectionHeading("V. PHỤ LỤC"));

    // Worksheets (Phiếu học tập)
    if (plan.appendices.worksheets && plan.appendices.worksheets.length > 0) {
      docChildren.push(subSectionHeading("1. Phiếu học tập (Worksheets):"));
      plan.appendices.worksheets.forEach((ws, idx) => {
        // Spacing before worksheet
        docChildren.push(
          new Paragraph({
            spacing: { before: 80, after: 40, line: defaultLineSpacing },
            children: []
          })
        );
        docChildren.push(createWorksheetTable(ws, idx));
      });
    }

    // Rubrics & Checklists
    docChildren.push(
      new Paragraph({
        spacing: { before: 120, after: 40, line: defaultLineSpacing },
        children: []
      })
    );
    docChildren.push(subSectionHeading("2. Bảng kiểm đánh giá hoạt động và thảo luận nhóm:"));

    let hasRenderedChecklist = false;

    if (plan.appendices.rubrics && plan.appendices.rubrics.length > 0) {
      plan.appendices.rubrics.forEach((rubric) => {
        const titleUpper = (rubric.title || "").toUpperCase();
        if (titleUpper.includes("BẢNG KIỂM") || rubric.checklistCriteria?.length) {
          docChildren.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40, line: defaultLineSpacing },
              children: [
                new TextRun({
                  text: rubric.title || "BẢNG KIỂM ĐÁNH GIÁ HOẠT ĐỘNG VÀ THẢO LUẬN NHÓM",
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          );
          docChildren.push(createGroupAssessmentChecklist(rubric.checklistCriteria));
          hasRenderedChecklist = true;
        } else {
          docChildren.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40, line: defaultLineSpacing },
              children: [
                new TextRun({
                  text: rubric.title || "RUBRIC ĐÁNH GIÁ",
                  font,
                  size: defaultSize,
                  bold: true,
                  color: "000000"
                })
              ]
            })
          );
          docChildren.push(createRubricTable(rubric));
        }
      });
    }

    if (!hasRenderedChecklist) {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 40, line: defaultLineSpacing },
          children: [
            new TextRun({
              text: "BẢNG KIỂM ĐÁNH GIÁ HOẠT ĐỘNG VÀ THẢO LUẬN NHÓM",
              font,
              size: defaultSize,
              bold: true,
              color: "000000"
            })
          ]
        })
      );
      docChildren.push(createGroupAssessmentChecklist(DEFAULT_GROUP_ASSESSMENT_CRITERIA));
    }

    // Safety Notes
    if (plan.appendices.safetyNotes && plan.appendices.safetyNotes.length > 0) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 120, after: 40, line: defaultLineSpacing },
          children: []
        })
      );
      docChildren.push(subSectionHeading("3. Lưu ý an toàn thí nghiệm / Hóa chất:"));
      plan.appendices.safetyNotes.forEach((note) => {
        docChildren.push(createDashParagraph(note));
      });
    }
  }

  // Create docx Document with A4 setup and margins:
  // Top: 1.5 cm = 851 twips
  // Bottom: 1.5 cm = 851 twips
  // Left: 2.0 cm = 1134 twips
  // Right: 1.0 cm = 567 twips
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 851,    // 1.5 cm
              bottom: 851, // 1.5 cm
              left: 1134,  // 2.0 cm
              right: 567   // 1.0 cm
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { line: defaultLineSpacing },
                children: [
                  new TextRun({
                    text: `KHBD: ${plan.header.lessonTitle} - Môn Hóa học`,
                    font,
                    size: 18,
                    italics: true,
                    color: "64748B"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: defaultLineSpacing },
                children: [
                  new TextRun({
                    text: "Trang ",
                    font,
                    size: defaultSize
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font,
                    size: defaultSize
                  }),
                  new TextRun({
                    text: " / ",
                    font,
                    size: defaultSize
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font,
                    size: defaultSize
                  })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const cleanTitle = (plan.header.lessonTitle || "KHBD_Hoa_Hoc")
    .replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")
    .substring(0, 50);
  const fileName = `KHBD_${cleanTitle}_Lop${plan.header.grade}.docx`;
  saveAs(blob, fileName);
}
