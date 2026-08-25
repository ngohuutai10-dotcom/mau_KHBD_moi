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
import type { LessonPlan, LearningActivity } from "../types";

export async function exportLessonPlanToDocx(plan: LessonPlan): Promise<void> {
  const font = "Times New Roman";
  const primaryColor = "1E3A8A"; // Deep Blue

  // Helper for normal paragraph
  const p = (
    text: string,
    options?: {
      bold?: boolean;
      italic?: boolean;
      size?: number; // half-points (26 = 13pt)
      color?: string;
      align?: (typeof AlignmentType)[keyof typeof AlignmentType];
      spaceBefore?: number;
      spaceAfter?: number;
      bullet?: boolean;
    }
  ) => {
    return new Paragraph({
      alignment: options?.align || AlignmentType.LEFT,
      spacing: {
        before: options?.spaceBefore ?? 60,
        after: options?.spaceAfter ?? 60,
        line: 276 // ~1.15 line spacing
      },
      bullet: options?.bullet ? { level: 0 } : undefined,
      children: [
        new TextRun({
          text,
          font,
          size: options?.size || 26, // 13pt
          bold: options?.bold || false,
          italics: options?.italic || false,
          color: options?.color || "000000"
        })
      ]
    });
  };

  // Helper for mixed text paragraph
  const pMixed = (
    runs: Array<{ text: string; bold?: boolean; italic?: boolean; size?: number; color?: string }>,
    options?: {
      align?: (typeof AlignmentType)[keyof typeof AlignmentType];
      spaceBefore?: number;
      spaceAfter?: number;
      bullet?: boolean;
    }
  ) => {
    return new Paragraph({
      alignment: options?.align || AlignmentType.LEFT,
      spacing: {
        before: options?.spaceBefore ?? 60,
        after: options?.spaceAfter ?? 60,
        line: 276
      },
      bullet: options?.bullet ? { level: 0 } : undefined,
      children: runs.map(
        (r) =>
          new TextRun({
            text: r.text,
            font,
            size: r.size || 26,
            bold: r.bold || false,
            italics: r.italic || false,
            color: r.color || "000000"
          })
      )
    });
  };

  // Helper for Section Heading
  const sectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: title,
          font,
          size: 28, // 14pt
          bold: true,
          color: primaryColor
        })
      ]
    });
  };

  // Helper for Subsection Heading
  const subSectionHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({
          text: title,
          font,
          size: 26, // 13pt
          bold: true,
          color: "111827"
        })
      ]
    });
  };

  const docChildren: (Paragraph | Table)[] = [];

  // 1. Top Header Table (School, Dept, Teacher, Date)
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              p(plan.header.schoolName || "TRƯỜNG THPT ....................", { bold: true, align: AlignmentType.CENTER }),
              p(`TỔ CHUYÊN MÔN: ${plan.header.department || "HÓA HỌC"}`, { italic: true, align: AlignmentType.CENTER })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              p(`Họ và tên giáo viên: ${plan.header.teacherName || "................................"}`, { align: AlignmentType.LEFT }),
              p(`Môn học: ${plan.header.subject || "Hóa học"} - Lớp: ${plan.header.grade || "11"}`, { align: AlignmentType.LEFT }),
              p(`Bộ sách: ${plan.header.textbookSet || "Chương trình GDPT 2018"}`, { italic: true, align: AlignmentType.LEFT })
            ]
          })
        ]
      })
    ]
  });

  docChildren.push(headerTable);

  // Lesson Title Banner
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 60 },
      children: [
        new TextRun({
          text: "KẾ HOẠCH BÀI DẠY",
          font,
          size: 32, // 16pt
          bold: true,
          color: primaryColor
        })
      ]
    })
  );

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 120 },
      children: [
        new TextRun({
          text: `BÀI: ${plan.header.lessonTitle.toUpperCase()}`,
          font,
          size: 28, // 14pt
          bold: true,
          color: "000000"
        })
      ]
    })
  );

  docChildren.push(
    p(
      `Thời lượng: ${plan.header.numberOfPeriods} tiết (${plan.header.numberOfPeriods * (plan.header.periodDuration || 45)} phút) - Đối tượng: ${plan.header.targetAudience || "Học sinh THPT"}`,
      { italic: true, align: AlignmentType.CENTER, spaceAfter: 160 }
    )
  );

  // SECTION I: MỤC TIÊU
  docChildren.push(sectionHeading("I. MỤC TIÊU"));

  // 1. Kiến thức
  docChildren.push(subSectionHeading("1. Kiến thức:"));
  if (plan.objectives.knowledge && plan.objectives.knowledge.length > 0) {
    plan.objectives.knowledge.forEach((k) => {
      docChildren.push(p(`- ${k}`, { spaceBefore: 40, spaceAfter: 40 }));
    });
  } else {
    docChildren.push(p("- Học sinh nắm vững các kiến thức trọng tâm của bài học."));
  }

  // 2. Năng lực
  docChildren.push(subSectionHeading("2. Năng lực:"));

  // a) Năng lực chung
  docChildren.push(pMixed([{ text: "a) Năng lực chung:", bold: true }]));
  plan.objectives.competencies.generalCompetencies.forEach((gc) => {
    docChildren.push(
      pMixed([
        { text: `- ${gc.name} (${gc.code}): `, bold: true },
        { text: gc.specificBehaviors.join("; ") }
      ])
    );
  });

  // b) Năng lực hóa học
  docChildren.push(pMixed([{ text: "b) Năng lực hóa học (theo CT GDPT 2018):", bold: true }]));
  plan.objectives.competencies.chemistryCompetencies.forEach((cc) => {
    docChildren.push(
      pMixed([
        { text: `- ${cc.name} (${cc.component}): `, bold: true },
        { text: `${cc.description} Biểu hiện cụ thể: ${cc.specificBehaviors.join("; ")}` }
      ])
    );
  });

  // c) Năng lực số (nếu có)
  if (
    plan.objectives.competencies.digitalCompetencies &&
    plan.objectives.competencies.digitalCompetencies.length > 0
  ) {
    docChildren.push(pMixed([{ text: "c) Năng lực số (NLS):", bold: true }]));
    plan.objectives.competencies.digitalCompetencies.forEach((dc) => {
      docChildren.push(
        pMixed([
          { text: `- Mã ${dc.code} - ${dc.name}: `, bold: true },
          { text: dc.evidence }
        ])
      );
    });
  }

  // d) Năng lực AI (nếu có)
  if (
    plan.objectives.competencies.aiCompetencies &&
    plan.objectives.competencies.aiCompetencies.length > 0
  ) {
    docChildren.push(
      pMixed([{ text: "d) Năng lực Trí tuệ nhân tạo (AI theo QĐ 2422/QĐ-BGDĐT):", bold: true }])
    );
    plan.objectives.competencies.aiCompetencies.forEach((ai) => {
      docChildren.push(
        pMixed([
          { text: `- Mã ${ai.code} - ${ai.name}: `, bold: true },
          { text: ai.evidence }
        ])
      );
    });
  }

  // e) Năng lực tiếng Anh (nếu có)
  if (
    plan.objectives.competencies.englishCompetencies &&
    plan.objectives.competencies.englishCompetencies.length > 0
  ) {
    docChildren.push(pMixed([{ text: "e) Năng lực tiếng Anh / Danh pháp quốc tế IUPAC:", bold: true }]));
    plan.objectives.competencies.englishCompetencies.forEach((eng) => {
      docChildren.push(
        pMixed([
          { text: `- ${eng.aspect}: `, bold: true },
          { text: `${eng.evidence} (Thuật ngữ: ${eng.terminology.join(", ")})` }
        ])
      );
    });
  }

  // 3. Phẩm chất
  docChildren.push(subSectionHeading("3. Phẩm chất:"));
  plan.objectives.qualities.forEach((q) => {
    docChildren.push(
      pMixed([
        { text: `- ${q.name}: `, bold: true },
        { text: q.evidence }
      ])
    );
  });

  // SECTION II: THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
  docChildren.push(sectionHeading("II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU"));
  docChildren.push(
    pMixed([
      { text: "1. Giáo viên: ", bold: true },
      { text: plan.equipmentAndMaterials.teacher.join("; ") }
    ])
  );
  docChildren.push(
    pMixed([
      { text: "2. Học sinh: ", bold: true },
      { text: plan.equipmentAndMaterials.students.join("; ") }
    ])
  );

  // SECTION III: TIẾN TRÌNH DẠY HỌC
  docChildren.push(sectionHeading("III. TIẾN TRÌNG DẠY HỌC"));

  // Build each activity
  plan.learningActivities.forEach((activity: LearningActivity) => {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 60 },
        children: [
          new TextRun({
            text: `${activity.typeLabel || activity.title} (${activity.durationMinutes} phút - Tiết ${activity.period})`,
            font,
            size: 26,
            bold: true,
            color: "0F172A"
          })
        ]
      })
    );

    if (activity.bigQuestion) {
      docChildren.push(
        pMixed([
          { text: "★ Câu hỏi lớn / Vấn đề cốt lõi: ", bold: true, color: "B45309" },
          { text: activity.bigQuestion, italic: true }
        ])
      );
    }

    docChildren.push(
      pMixed([
        { text: "a) Mục tiêu: ", bold: true },
        { text: activity.objective }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "b) Nội dung: ", bold: true },
        { text: activity.content }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "c) Sản phẩm: ", bold: true },
        { text: activity.product }
      ])
    );

    docChildren.push(
      pMixed([
        { text: "d) Tổ chức thực hiện:", bold: true, spaceAfter: 60 }
      ])
    );

    // 2-Column Organization Table for Teacher and Student activities
    const tableRows: TableRow[] = [];

    // Header row
    tableRows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
            children: [p("HOẠT ĐỘNG CỦA GIÁO VIÊN", { bold: true, align: AlignmentType.CENTER })]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
            children: [p("HOẠT ĐỘNG CỦA HỌC SINH", { bold: true, align: AlignmentType.CENTER })]
          })
        ]
      })
    );

    const teacherPhases = activity.organization.teacherActivities || [];
    const studentPhases = activity.organization.studentActivities || [];
    const maxPhases = Math.max(teacherPhases.length, studentPhases.length);

    for (let i = 0; i < maxPhases; i++) {
      const tPhase = teacherPhases[i] || { phase: "", details: "" };
      const sPhase = studentPhases[i] || { phase: "", details: "" };

      const tCellChildren: Paragraph[] = [];
      if (tPhase.phase) {
        tCellChildren.push(pMixed([{ text: `• ${tPhase.phase}:`, bold: true }]));
      }
      if (tPhase.details) {
        tCellChildren.push(p(tPhase.details));
      }

      const sCellChildren: Paragraph[] = [];
      if (sPhase.phase) {
        sCellChildren.push(pMixed([{ text: `• ${sPhase.phase}:`, bold: true }]));
      }
      if (sPhase.details) {
        sCellChildren.push(p(sPhase.details));
      }

      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: tCellChildren.length > 0 ? tCellChildren : [p("")]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: sCellChildren.length > 0 ? sCellChildren : [p("")]
            })
          ]
        })
      );
    }

    const activityTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: "94A3B8" },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: "94A3B8" },
        left: { style: BorderStyle.SINGLE, size: 6, color: "94A3B8" },
        right: { style: BorderStyle.SINGLE, size: 6, color: "94A3B8" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" }
      },
      rows: tableRows
    });

    docChildren.push(activityTable);

    if (activity.assessment) {
      docChildren.push(
        pMixed([
          { text: "e) Đánh giá: ", bold: true, italic: true },
          { text: `Phương pháp: ${activity.assessment.method} - Tiêu chí: ${activity.assessment.criteria}` }
        ], { spaceBefore: 60, spaceAfter: 120 })
      );
    }
  });

  // SECTION IV: PHỤ LỤC
  if (plan.appendices && (plan.appendices.worksheets?.length || plan.appendices.rubrics?.length)) {
    docChildren.push(sectionHeading("IV. PHỤ LỤC"));

    // Worksheets
    if (plan.appendices.worksheets && plan.appendices.worksheets.length > 0) {
      docChildren.push(subSectionHeading("1. Phiếu học tập (Worksheets):"));
      plan.appendices.worksheets.forEach((ws, idx) => {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: `${ws.title || `PHIẾU HỌC TẬP SỐ ${idx + 1}`}`,
                font,
                size: 26,
                bold: true
              })
            ]
          })
        );
        docChildren.push(p(ws.content));
        if (ws.keyAnswer) {
          docChildren.push(
            pMixed([
              { text: "Hướng dẫn giải / Đáp án: ", bold: true, italic: true },
              { text: ws.keyAnswer }
            ])
          );
        }
      });
    }

    // Rubrics
    if (plan.appendices.rubrics && plan.appendices.rubrics.length > 0) {
      docChildren.push(subSectionHeading("2. Bảng kiểm đánh giá (Rubrics):"));
      plan.appendices.rubrics.forEach((rubric) => {
        docChildren.push(p(rubric.title, { bold: true }));
        rubric.criteria.forEach((crit) => {
          docChildren.push(
            pMixed([
              { text: `- Tiêu chí: ${crit.name}: `, bold: true },
              { text: crit.levels.join(" | ") }
            ])
          );
        });
      });
    }

    // Safety Notes
    if (plan.appendices.safetyNotes && plan.appendices.safetyNotes.length > 0) {
      docChildren.push(subSectionHeading("3. Lưu ý an toàn thí nghiệm / Hóa chất:"));
      plan.appendices.safetyNotes.forEach((note) => {
        docChildren.push(p(`⚠ ${note}`, { color: "B91C1C" }));
      });
    }
  }

  // Create docx Document with A4 setup and margins (top 20mm, bottom 20mm, left 25mm, right 20mm)
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // ~20mm in twips (1mm ≈ 56.7 twips)
              bottom: 1134,
              left: 1417, // ~25mm
              right: 1134
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
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
                children: [
                  new TextRun({
                    text: "Trang ",
                    font,
                    size: 20
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font,
                    size: 20
                  }),
                  new TextRun({
                    text: " / ",
                    font,
                    size: 20
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font,
                    size: 20
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
