export interface KHBDHeader {
  schoolName: string;
  department: string;
  teacherName: string;
  subject: string;
  grade: "10" | "11" | "12" | string;
  lessonTitle: string;
  textbookSet: string;
  numberOfPeriods: number;
  periodDuration: number;
  targetAudience: string;
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

export interface ActivityPhase {
  phase: string;
  details: string;
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
  organization: {
    teacherActivities: ActivityPhase[];
    studentActivities: ActivityPhase[];
  };
  assessment: {
    method: string;
    criteria: string;
  };
}

export interface Worksheet {
  id: string;
  title: string;
  content: string;
  keyAnswer?: string;
}

export interface RubricCriterion {
  name: string;
  levels: string[];
}

export interface Rubric {
  title: string;
  criteria: RubricCriterion[];
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

export interface GenerateSettings {
  lessonTitle: string;
  grade: "10" | "11" | "12" | string;
  textbookSet: string;
  numberOfPeriods: number;
  periodDuration?: number;
  targetAudience?: string;
  teacherName?: string;
  schoolName?: string;
  department?: string;
  enableDigitalCompetency?: boolean;
  enableAICompetency?: boolean;
  enableEnglishCompetency?: boolean;
  model?: string;
  specialRequests?: string;
}
