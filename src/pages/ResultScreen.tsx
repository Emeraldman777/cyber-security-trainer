import { ArrowLeft, ArrowRight, Gauge, UserRoundCheck } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { RiskFactors, RiskLevel, RiskProfile } from "../types";

type ResultScreenProps = {
  index: number;
  level: RiskLevel;
  profile: RiskProfile;
  factors: RiskFactors;
  onBack: () => void;
  onContinue: () => void;
};

const factorLabels: Record<keyof RiskFactors, string> = {
  RecognitionError: "Ошибка распознавания угрозы",
  Trust: "Избыточное доверие",
  Impulse: "Импульсивность",
  VerificationRisk: "Отсутствие проверки",
  Criticality: "Рискованность действий",
};

const factorHints: Record<keyof RiskFactors, string> = {
  RecognitionError: "Вы неверно оценили ситуацию.",
  Trust: "Вы слишком быстро поверили источнику.",
  Impulse: "Вы приняли решение под давлением срочности.",
  VerificationRisk: "Вы не проверили источник независимым способом.",
  Criticality: "Вы выбрали действие с высокой ценой ошибки.",
};

const getFactorTone = (value: number) => {
  if (value <= 30) {
    return "green";
  }

  if (value <= 60) {
    return "orange";
  }

  return "red";
};

export function ResultScreen({ index, level, profile, factors, onBack, onContinue }: ResultScreenProps) {
  const tone = index > 70 ? "red" : index > 45 ? "orange" : index > 20 ? "violet" : "green";

  return (
    <section className="screen-fade mx-auto grid w-full max-w-6xl gap-5 py-4 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="overflow-hidden">
        <Button className="mb-5" onClick={onBack} variant="ghost">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Назад
        </Button>
        <div className="flex items-center gap-3 text-sky-100">
          <Gauge className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-[0.24em]">Итог</span>
        </div>
        <div className="mt-7 flex items-end gap-3">
          <span className="text-7xl font-extrabold leading-none text-white">{index}</span>
          <span className="pb-2 text-xl font-bold text-slate-400">/ 100</span>
        </div>
        <ProgressBar value={index} tone={tone} />
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.06] p-4">
          <p className="text-2xl font-extrabold text-white">{level.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{level.description}</p>
        </div>
        <Button className="mt-6 w-full" onClick={onContinue}>
          Перейти к рекомендациям <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Card>

      <Card>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-400/15 text-violet-100">
            <UserRoundCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-200">Профиль</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">{profile.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-400">{profile.explanation}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {(Object.keys(factorLabels) as Array<keyof RiskFactors>).map((key) => (
            <div key={key}>
              <ProgressBar
                label={factorLabels[key]}
                value={factors[key]}
                tone={getFactorTone(factors[key])}
              />
              <p className="mt-1 text-xs leading-5 text-slate-500">{factorHints[key]}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
