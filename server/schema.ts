import { Type, type Schema } from "@google/genai";

export interface KHBDHeader {
  lessonName?: string;
  lessonTitle: string;
  organizationType?: string;
  schoolName?: string;
  department?: string;
  teacherName?: string;
  subject?: string;
  grade: "10" | "11" | "12" | string;
  textbookSet?: string;
  numberOfPeriods: number;
  periodDuration?: number;
  targetAudience?: string;
}

export interface GeneralCompetency {
  code: string;
  name: string;
  specificBehaviors: string[];
}

export interface ChemistryCompetency {
  component: "NTHH" | "THTGTN" | "VDKN" | string;
  name: string;
  description: string;
  specificBehaviors: string[];
}

export interface DigitalCompetencyItem {
  code: string;
  name: string;
  evidence: string;
}

export interface AICompetencyItem {
  code: string;
  name: string;
  evidence: string;
}

export interface EnglishCompetencyItem {
  aspect: string;
  evidence: string;
  terminology: string[];
}

export interface QualityItem {
  name: "Yêu nước" | "Nhân ái" | "Chăm chỉ" | "Trung thực" | "Trách nhiệm" | string;
  evidence: string;
}

export interface KHBDObjectives {
  knowledge: string[];
  competencies: {
    generalCompetencies: GeneralCompetency[];
    chemistryCompetencies: ChemistryCompetency[];
    digitalCompetencies?: DigitalCompetencyItem[];
    aiCompetencies?: AICompetencyItem[];
    englishCompetencies?: EnglishCompetencyItem[];
  };
  qualities: QualityItem[];
}

export interface EquipmentAndMaterials {
  teacher: string[];
  students: string[];
}

export interface OrganizationPhase {
  phase:
    | "Chuyển giao nhiệm vụ học tập"
    | "Thực hiện nhiệm vụ"
    | "Báo cáo kết quả và thảo luận"
    | "Kết luận và nhận định";
  teacher: string[];
  student: string[];
  boardContent: string[];
}

export interface LearningActivity {
  id: string;
  activityNumber: number;
  period: number;
  title: string;
  type: "KHOI_DONG" | "HINH_THANH_KIEN_THUC" | "LUYEN_TAP" | "VAN_DUNG";
  typeLabel: string;
  durationMinutes: number;
  bigQuestion?: string;
  objective: string;
  content: string;
  product: string;
  organization: OrganizationPhase[];
  assessment: {
    method: string;
    criteria: string;
  };
}

export interface WorksheetTask {
  title?: string;
  instruction?: string;
  questions: string[];
}

export interface Worksheet {
  id?: string;
  title: string;
  activityName?: string;
  tasks?: WorksheetTask[];
  content?: string;
  teacherAnswerKey?: string;
  keyAnswer?: string;
}

export interface RubricCriterion {
  name: string;
  levels: string[];
}

export interface Rubric {
  title: string;
  criteria?: RubricCriterion[];
  checklistCriteria?: string[];
}

export interface KHBDAppendices {
  worksheets: Worksheet[];
  rubrics?: Rubric[];
  safetyNotes?: string[];
}

export interface LessonPlan {
  header: KHBDHeader;
  objectives: KHBDObjectives;
  equipmentAndMaterials: EquipmentAndMaterials;
  learningActivities: LearningActivity[];
  appendices: KHBDAppendices;
}

export const lessonPlanGeminiSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    header: {
      type: Type.OBJECT,
      properties: {
        schoolName: { type: Type.STRING },
        department: { type: Type.STRING },
        teacherName: { type: Type.STRING },
        subject: { type: Type.STRING },
        grade: { type: Type.STRING },
        lessonTitle: { type: Type.STRING },
        lessonName: { type: Type.STRING },
        organizationType: { type: Type.STRING },
        textbookSet: { type: Type.STRING },
        numberOfPeriods: { type: Type.NUMBER },
        periodDuration: { type: Type.NUMBER },
        targetAudience: { type: Type.STRING }
      },
      required: ["subject", "grade", "lessonTitle", "textbookSet", "numberOfPeriods", "periodDuration"]
    },
    objectives: {
      type: Type.OBJECT,
      properties: {
        knowledge: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        competencies: {
          type: Type.OBJECT,
          properties: {
            generalCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  specificBehaviors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["code", "name", "specificBehaviors"]
              }
            },
            chemistryCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  component: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  specificBehaviors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["component", "name", "description", "specificBehaviors"]
              }
            },
            digitalCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  evidence: { type: Type.STRING }
                },
                required: ["code", "name", "evidence"]
              }
            },
            aiCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  evidence: { type: Type.STRING }
                },
                required: ["code", "name", "evidence"]
              }
            },
            englishCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  aspect: { type: Type.STRING },
                  evidence: { type: Type.STRING },
                  terminology: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["aspect", "evidence", "terminology"]
              }
            }
          },
          required: ["generalCompetencies", "chemistryCompetencies"]
        },
        qualities: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              evidence: { type: Type.STRING }
            },
            required: ["name", "evidence"]
          }
        }
      },
      required: ["knowledge", "competencies", "qualities"]
    },
    equipmentAndMaterials: {
      type: Type.OBJECT,
      properties: {
        teacher: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        students: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["teacher", "students"]
    },
    learningActivities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          activityNumber: { type: Type.NUMBER },
          period: { type: Type.NUMBER },
          title: { type: Type.STRING },
          type: {
            type: Type.STRING,
            enum: ["KHOI_DONG", "HINH_THANH_KIEN_THUC", "LUYEN_TAP", "VAN_DUNG"]
          },
          typeLabel: { type: Type.STRING },
          durationMinutes: { type: Type.NUMBER },
          bigQuestion: { type: Type.STRING },
          objective: { type: Type.STRING },
          content: { type: Type.STRING },
          product: { type: Type.STRING },
          organization: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: {
                  type: Type.STRING,
                  enum: [
                    "Chuyển giao nhiệm vụ học tập",
                    "Thực hiện nhiệm vụ",
                    "Báo cáo kết quả và thảo luận",
                    "Kết luận và nhận định"
                  ]
                },
                teacher: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                student: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                boardContent: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["phase", "teacher", "student", "boardContent"]
            }
          },
          assessment: {
            type: Type.OBJECT,
            properties: {
              method: { type: Type.STRING },
              criteria: { type: Type.STRING }
            },
            required: ["method", "criteria"]
          }
        },
        required: [
          "id",
          "activityNumber",
          "period",
          "title",
          "type",
          "typeLabel",
          "durationMinutes",
          "objective",
          "content",
          "product",
          "organization",
          "assessment"
        ]
      }
    },
    appendices: {
      type: Type.OBJECT,
      properties: {
        worksheets: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              activityName: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    instruction: { type: Type.STRING },
                    questions: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["questions"]
                }
              },
              content: { type: Type.STRING },
              teacherAnswerKey: { type: Type.STRING }
            },
            required: ["title"]
          }
        },
        rubrics: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              criteria: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    levels: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["name", "levels"]
                }
              },
              checklistCriteria: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title"]
          }
        },
        safetyNotes: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["worksheets"]
    }
  },
  required: ["header", "objectives", "equipmentAndMaterials", "learningActivities", "appendices"]
};
