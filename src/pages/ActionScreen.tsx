import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ChoiceButton } from "../components/ChoiceButton";
import { Choice, Scenario } from "../types";

type ActionScreenProps = {
  scenario: Scenario;
  selectedChoice?: string;
  showActionFeedback: boolean;
  onBack: () => void;
  onHome?: () => void;
  onSelect: (choiceId: string) => void;
  onContinue: () => void;
};

type ChoiceWithCorrectFlag = Choice & {
  isCorrect?: boolean;
};

const getChoiceRiskScore = (choice: Choice) =>
  choice.factors.Trust +
  choice.factors.Impulse +
  choice.factors.VerificationRisk +
  choice.factors.Criticality;

const getCorrectChoiceId = (choices: Choice[]) => {
  const explicitCorrect = choices.find((choice) => (choice as ChoiceWithCorrectFlag).isCorrect);

  if (explicitCorrect) {
    return explicitCorrect.id;
  }

  return choices.reduce((best, choice) =>
    getChoiceRiskScore(choice) < getChoiceRiskScore(best) ? choice : best,
  ).id;
};

export function ActionScreen({
  scenario,
  selectedChoice,
  showActionFeedback,
  onBack,
  onHome,
  onSelect,
  onContinue,
}: ActionScreenProps) {
  const choice = scenario.choices.find((item) => item.id === selectedChoice);
  const correctChoiceId = getCorrectChoiceId(scenario.choices);
  const isSelectionLocked = showActionFeedback && Boolean(selectedChoice);

  return (
    <section className="screen-fade mx-auto grid w-full max-w-6xl gap-5 py-4 lg:grid-cols-[1.05fr_0.95fr]">
      <Card>
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
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-200">Решение</p>
        <h2 className="mt-3 text-3xl font-extrabold text-white">Что вы сделаете?</h2>
        <p className="mt-4 text-base leading-7 text-slate-400">
          Выберите действие так, будто ситуация происходит прямо сейчас. Итоговая оценка учитывает и распознавание, и реакцию.
        </p>
        <div className="mt-6 grid gap-3">
          {scenario.choices.map((item) => {
            const isSelected = selectedChoice === item.id;
            const isCorrect = item.id === correctChoiceId;
            const selectedIsCorrect = selectedChoice === correctChoiceId;
            const state =
              showActionFeedback && selectedChoice
                ? isSelected && isCorrect
                  ? "correct"
                  : isSelected
                    ? "incorrect"
                    : !selectedIsCorrect && isCorrect
                      ? "correct"
                      : "locked"
                : isSelected
                  ? "selected"
                  : "neutral";

            return (
              <ChoiceButton
                key={item.id}
                disabled={isSelectionLocked}
                selected={isSelected}
                state={state}
                onClick={() => onSelect(item.id)}
              >
                {item.text}
              </ChoiceButton>
            );
          })}
        </div>
      </Card>

      <Card className="flex flex-col justify-between">
        {choice ? (
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-400/15 text-orange-200">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Последствие</p>
            <p className="mt-3 text-lg font-semibold leading-8 text-white">{choice.consequence}</p>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-sky-200">Вывод</p>
            <p className="mt-3 text-base leading-7 text-slate-300">{choice.lesson}</p>
          </div>
        ) : (
          <div className="flex min-h-72 flex-col justify-center rounded-lg border border-dashed border-white/15 p-6 text-slate-400">
            Выберите действие, и здесь появятся последствия и вывод.
          </div>
        )}
        <Button className="mt-6 w-full" disabled={!choice} onClick={onContinue}>
          Продолжить <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Card>
    </section>
  );
}
