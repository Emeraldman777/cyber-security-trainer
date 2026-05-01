import { ReactNode, useState } from "react";
import { ArrowLeft, CheckCircle2, ListChecks, SearchCheck, ShieldAlert, Siren } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { theoryBlocks } from "../data/theory";

type TheoryScreenProps = {
  onBack: () => void;
};

export function TheoryScreen({ onBack }: TheoryScreenProps) {
  const [activeId, setActiveId] = useState(theoryBlocks[0]?.id ?? "");
  const activeBlock = theoryBlocks.find((block) => block.id === activeId) ?? theoryBlocks[0];

  return (
    <section className="screen-fade mx-auto w-full max-w-6xl py-6">
      <Button className="mb-6" onClick={onBack} variant="ghost">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Назад
      </Button>

      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-200">Теория</p>
        <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">База знаний CyberGuard</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
          Темы можно расширять вместе с базой сценариев: правила, красные флаги, проверочные действия и короткие примеры.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="h-fit">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-sky-100">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Темы</p>
              <p className="text-sm font-semibold text-slate-300">{theoryBlocks.length} блоков</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {theoryBlocks.map((block) => {
              const isActive = block.id === activeBlock.id;

              return (
                <button
                  key={block.id}
                  className={`rounded-lg border p-4 text-left transition duration-300 ${
                    isActive
                      ? "border-sky-300/40 bg-sky-300/15 shadow-[0_0_24px_rgba(56,189,248,0.14)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                  onClick={() => setActiveId(block.id)}
                  type="button"
                >
                  <p className="text-base font-extrabold text-white">{block.title}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-400">{block.category}</p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="animate-fade-soft">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-400/15 text-violet-100">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-200">{activeBlock.category}</p>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white">{activeBlock.title}</h3>
          <p className="mt-4 text-base leading-7 text-slate-300">{activeBlock.summary}</p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <TheoryList
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-200" aria-hidden="true" />}
              title="Правила"
              items={activeBlock.rules}
            />
            <TheoryList
              icon={<Siren className="h-5 w-5 text-orange-200" aria-hidden="true" />}
              title="Красные флаги"
              items={activeBlock.redFlags}
            />
            <TheoryList
              icon={<SearchCheck className="h-5 w-5 text-sky-200" aria-hidden="true" />}
              title="Что проверить"
              items={activeBlock.whatToCheck}
            />
            <TheoryList
              icon={<ListChecks className="h-5 w-5 text-violet-200" aria-hidden="true" />}
              title="Примеры"
              items={activeBlock.examples}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

function TheoryList({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-300">
        {icon}
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-slate-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
