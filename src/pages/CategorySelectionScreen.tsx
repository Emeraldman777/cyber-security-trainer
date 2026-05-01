import {
  ArrowLeft,
  Briefcase,
  Building2,
  Heart,
  MailWarning,
  MessageSquareWarning,
  PackageCheck,
  PhoneCall,
  ShieldAlert,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { ReactNode } from "react";
import { categories, scenarioBank } from "../data/scenarioBank";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Category } from "../types";

type CategorySelectionScreenProps = {
  onSelect: (category: Category) => void;
  onBack: () => void;
  title?: string;
  description?: string;
};

const iconClass = "h-5 w-5";

const icons: Record<string, ReactNode> = {
  "Банк и вишинг": <PhoneCall className={iconClass} aria-hidden="true" />,
  "Фишинг, SMS и QR": <MailWarning className={iconClass} aria-hidden="true" />,
  "Маркетплейсы и доставка": <PackageCheck className={iconClass} aria-hidden="true" />,
  "Соцсети и аккаунты": <MessageSquareWarning className={iconClass} aria-hidden="true" />,
  "Инвестиции и крипто": <TrendingUp className={iconClass} aria-hidden="true" />,
  "Работа, task scams и дропперство": <Briefcase className={iconClass} aria-hidden="true" />,
  "Fake Boss и BEC": <Building2 className={iconClass} aria-hidden="true" />,
  "Техподдержка, мобильные угрозы и карты": <Smartphone className={iconClass} aria-hidden="true" />,
  "Романтика и шантаж": <Heart className={iconClass} aria-hidden="true" />,
};

const getCategoryIcon = (category: Category) =>
  icons[category] ?? <ShieldAlert className={iconClass} aria-hidden="true" />;

const getCategoryCount = (category: Category) =>
  scenarioBank.filter((scenario) => scenario.category === category).length;

export function CategorySelectionScreen({
  onSelect,
  onBack,
  title = "Где тренируем защиту?",
  description = "Выберите область, в которой чаще всего появляются сомнения или реальные риски.",
}: CategorySelectionScreenProps) {
  return (
    <section className="screen-fade mx-auto w-full max-w-5xl py-6">
      <Button className="mb-6" onClick={onBack} variant="ghost">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Назад
      </Button>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-violet-200">Категории</p>
        <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((category) => (
          <button key={category} className="h-[232px] w-full text-left" onClick={() => onSelect(category)} type="button">
            <Card interactive className="flex h-full flex-col">
              <div className="mb-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-200">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-lg font-extrabold leading-6 text-white">{category}</h3>
              <p className="mt-auto pt-4 text-sm font-semibold text-slate-400">
                {getCategoryCount(category)} сценариев
              </p>
            </Card>
          </button>
        ))}
      </div>
    </section>
  );
}
