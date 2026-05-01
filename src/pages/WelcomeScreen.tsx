import { ArrowRight, BrainCircuit, ChartNoAxesColumn, GraduationCap } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MetricCard } from "../components/MetricCard";

type WelcomeScreenProps = {
  onStart: () => void;
  onLearn: () => void;
  onTheory: () => void;
};

export function WelcomeScreen({ onStart, onLearn, onTheory }: WelcomeScreenProps) {
  return (
    <section className="screen-fade grid flex-1 items-center gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          CyberGuard
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-200 sm:text-2xl">
          Цифровой тренажёр против кибермошенников
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
          Реалистичные сценарии для детей, подростков и взрослых: распознавайте обман, выбирайте действие и получайте понятный профиль риска.
        </p>
        <div className="mt-8 grid gap-3 sm:flex">
          <Button onClick={onStart}>
            Начать тренировку <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button onClick={onLearn} variant="secondary">
            Обучение
          </Button>
          <Button onClick={onTheory} variant="ghost">
            Теория
          </Button>
        </div>
      </div>

      <Card className="relative overflow-hidden p-5 sm:p-6">
        <div className="relative">
          <div className="mb-5">
            <p className="text-sm font-bold text-slate-400">Тренировка цифровой защиты</p>
            <p className="text-3xl font-extrabold text-white">20 сценариев · ~20 минут</p>
          </div>
          <div className="grid gap-3">
            <MetricCard
              icon={<BrainCircuit className="h-5 w-5" aria-hidden="true" />}
              title="Симулятор"
              value="20 кейсов"
              caption="Банк, доставка, соцсети, инвестиции и фишинг."
            />
            <MetricCard
              icon={<ChartNoAxesColumn className="h-5 w-5" aria-hidden="true" />}
              title="Персональная оценка уязвимости"
              value="0-100"
              caption="Формула оценивает распознавание, доверие, импульсивность и проверку."
            />
            <MetricCard
              icon={<GraduationCap className="h-5 w-5" aria-hidden="true" />}
              title="Персональные рекомендации"
              value="Профиль"
              caption="Советы под главный риск, а не универсальная памятка."
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
