import { ArrowLeft, Home, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

type RecommendationsScreenProps = {
  recommendations: string[];
  onBack: () => void;
  onRestart: () => void;
  onHome: () => void;
};

export function RecommendationsScreen({
  recommendations,
  onBack,
  onRestart,
  onHome,
}: RecommendationsScreenProps) {
  return (
    <section className="screen-fade mx-auto w-full max-w-4xl py-6">
      <Button className="mb-6" onClick={onBack} variant="ghost">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Назад
      </Button>
      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-100">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-200">Защитный план</p>
        <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">Персональные рекомендации</h2>
        <div className="mt-8 grid gap-3">
          {recommendations.map((recommendation, index) => (
            <div key={recommendation} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
              <div className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-300/15 text-sm font-extrabold text-sky-100">
                  {index + 1}
                </span>
                <p className="text-base font-semibold leading-7 text-slate-200">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:flex">
          <Button onClick={onRestart}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Пройти ещё раз
          </Button>
          <Button onClick={onHome} variant="secondary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Вернуться на главную
          </Button>
        </div>
      </Card>
    </section>
  );
}
