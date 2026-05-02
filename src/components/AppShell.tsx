import { ReactNode, useState } from "react";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "./Button";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-shield-ink bg-signal-grid text-slate-50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/25 bg-sky-300/10 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-sky-200" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-extrabold tracking-wide">CyberGuard</p>
              <p className="text-xs font-medium text-slate-400">Cyber awareness simulator</p>
            </div>
          </div>
          <button
            className="focus-ring flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-sky-300/45 hover:bg-white/10"
            onClick={() => setIsAboutOpen(true)}
            type="button"
          >
            <Sparkles className="h-4 w-4 text-orange-300" aria-hidden="true" />
            #КиберПраво
          </button>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>

      {isAboutOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg rounded-lg p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-200">
                  О проекте
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">CyberGuard MVP</h2>
              </div>
              <button
                className="focus-ring rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsAboutOpen(false)}
                type="button"
                aria-label="Закрыть окно"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              CyberGuard — конкурсный прототип тренажёра цифровой безопасности, созданный в 
              рамках проекта "#КиберПраво: твой щит в сети".
              Пользователь проходит реалистичные сценарии, учится отличать мошенничество
              от безопасных и спорных ситуаций, получает индекс уязвимости, профиль риска
              и персональные рекомендации.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-300">© Ivan Davydenkov</p>
            <Button className="mt-5 w-full" onClick={() => setIsAboutOpen(false)}>
              Понятно
            </Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
