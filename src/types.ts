export type ScenarioType = "fraud" | "safe" | "ambiguous";

export type Category = string;

export type ClassificationAnswer = "fraud" | "safe" | "unsure";

export type RiskFactors = {
  RecognitionError: number;
  Trust: number;
  Impulse: number;
  VerificationRisk: number;
  Criticality: number;
};

export type Choice = {
  id: string;
  text: string;
  consequence: string;
  lesson: string;
  isCorrect?: boolean;
  factors: Omit<RiskFactors, "RecognitionError">;
};

export type ScenarioStep = {
  title: string;
  detail: string;
};

export type Scenario = {
  id: string;
  type: ScenarioType;
  title: string;
  category: Category;
  pattern?: string;
  channel?: string;
  manipulation?: string;
  targetAudience?: string;
  situation: string;
  classificationQuestion: string;
  classificationOptions: Array<{
    value: ClassificationAnswer;
    label: string;
  }>;
  steps: ScenarioStep[];
  choices: Choice[];
  recommendations: string[];
  sourceRefs?: string[];
};

export type ScenarioBankItem = Scenario & {
  pattern: string;
  channel: string;
  manipulation: string;
  targetAudience: string;
  sourceRefs: string[];
};

export type ScenarioResult = {
  scenarioId: string;
  classification: ClassificationAnswer;
  choiceId: string;
  factors: RiskFactors;
  index: number;
};

export type RiskLevel = {
  title: string;
  tone: "low" | "moderate" | "elevated" | "high";
  description: string;
};

export type RiskProfile = {
  title: string;
  explanation: string;
};

export type FlowMode = "training" | "learning";

export type Screen =
  | "welcome"
  | "category"
  | "theory"
  | "scenario"
  | "action"
  | "result"
  | "recommendations";
