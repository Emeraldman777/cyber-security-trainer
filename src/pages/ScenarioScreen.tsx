import { ArrowLeft, ArrowRight, ListChecks } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ChoiceButton } from "../components/ChoiceButton";
import { ProgressBar } from "../components/ProgressBar";
import { ClassificationAnswer, Scenario, ScenarioType } from "../types";

type ScenarioScreenProps = {
  scenario: Scenario;
  current: number;
  total: number;
  selected?: ClassificationAnswer;
  showHints: boolean;
  showAnswerFeedback: boolean;
  onBack: () => void;
  onHome?: () => void;
  onSelect: (answer: ClassificationAnswer) => void;
  onContinue: () => void;
};

const correctAnswerByType: Record<ScenarioType, ClassificationAnswer> = {
  fraud: "fraud",
  safe: "safe",
  ambiguous: "unsure",
};

export function ScenarioScreen({
  scenario,
  current,
  total,
  selected,
  showHints,
  showAnswerFeedback,
  onBack,
  onHome,
  onSelect,
  onContinue,
}: ScenarioScreenProps) {
  const progress = Math.round(((current + 1) / total) * 100);
  const correctAnswer = correctAnswerByType[scenario.type];
  const shouldShowHints = showHints && Boolean(selected);

  return (
    <section className="screen-fade mx-auto grid w-full max-w-6xl gap-5 py-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="h-fit">
        <div className="mb-5 flex flex-wrap gap-3">
          <Button onClick={onBack} variant="ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Назад
          </Button>
          {onHome ? (
            <Button onClick={onHome} variant="secondary">
              Вернуться на главную
            </Button>
          ) : null}
        </div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-slate-300">
            Сценарий {current + 1} из {total}
          </span>
        </div>
        <ProgressBar value={progress} tone="violet" />
        <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white">{scenario.title}</h2>
        <p className="mt-2 text-sm font-bold text-sky-200">{scenario.category}</p>
        {shouldShowHints ? (
          <div className="animate-fade-soft mt-6 space-y-3">
            {scenario.steps.map((step) => (
              <div key={step.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-white">
                  <ListChecks className="h-4 w-4 text-orange-200" aria-hidden="true" />
                  {step.title}
                </div>
                <p className="text-sm leading-6 text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <Card>
        <p className="rounded-lg border border-sky-300/15 bg-sky-300/10 p-5 text-lg font-semibold leading-8 text-slate-100">
          {scenario.situation}
        </p>
        <h3 className="mt-7 text-2xl font-extrabold text-white">{scenario.classificationQuestion}</h3>
        <div className="mt-5 grid gap-3">
          {scenario.classificationOptions.map((option) => {
            const isCorrect = option.value === correctAnswer;
            const isSelected = selected === option.value;
            const selectedIsCorrect = selected === correctAnswer;
            const state =
              showAnswerFeedback && selected
                ? isSelected && isCorrect
                  ? "correct"
                  : isSelected
                    ? "incorrect"
                    : !selectedIsCorrect && isCorrect
                      ? "correct"
                      : "locked"
                : isSelected
                  ? "selected"
                  : selected
                    ? "locked"
                    : "neutral";

            return (
              <ChoiceButton
                key={option.value}
                disabled={Boolean(selected)}
                selected={isSelected}
                state={state}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </ChoiceButton>
            );
          })}
        </div>
        <Button className="mt-6 w-full sm:w-auto" disabled={!selected} onClick={onContinue}>
          Продолжить <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Card>
    </section>
  );
}
