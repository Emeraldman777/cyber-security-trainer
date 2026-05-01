import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { scenarioBank } from "./data/scenarioBank";
import { ActionScreen } from "./pages/ActionScreen";
import { CategorySelectionScreen } from "./pages/CategorySelectionScreen";
import { RecommendationsScreen } from "./pages/RecommendationsScreen";
import { ResultScreen } from "./pages/ResultScreen";
import { ScenarioScreen } from "./pages/ScenarioScreen";
import { TheoryScreen } from "./pages/TheoryScreen";
import { WelcomeScreen } from "./pages/WelcomeScreen";
import {
  calculateScenarioResult,
  getAverageFactors,
  getPersonalRecommendations,
  getRiskIndex,
  getRiskLevel,
  getRiskProfile,
} from "./utils/risk";
import {
  Category,
  ClassificationAnswer,
  FlowMode,
  Scenario,
  ScenarioResult,
  Screen,
} from "./types";

const TRAINING_SCENARIO_COUNT = 20;

const pickCategorySet = (category: Category): Scenario[] =>
  scenarioBank.filter((scenario) => scenario.category === category);

const shuffleScenarios = (items: Scenario[]) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const pickRandomScenarios = (items: Scenario[], count: number) =>
  shuffleScenarios(items).slice(0, Math.min(count, items.length));

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [flowMode, setFlowMode] = useState<FlowMode>("training");
  const [trainingSet, setTrainingSet] = useState<Scenario[]>(scenarioBank);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classification, setClassification] = useState<ClassificationAnswer | undefined>();
  const [choiceId, setChoiceId] = useState<string | undefined>();
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const currentScenario = trainingSet[currentIndex] ?? trainingSet[0];
  const averageFactors = useMemo(() => getAverageFactors(results), [results]);
  const riskIndex = useMemo(() => getRiskIndex(results), [results]);
  const riskLevel = useMemo(() => getRiskLevel(riskIndex), [riskIndex]);
  const riskProfile = useMemo(
    () => getRiskProfile(averageFactors, results),
    [averageFactors, results],
  );
  const recommendations = useMemo(() => {
    const scenarioTips = results
      .flatMap((result) => scenarioBank.find((scenario) => scenario.id === result.scenarioId)?.recommendations ?? [])
      .slice(0, 4);

    return Array.from(new Set([...getPersonalRecommendations(averageFactors), ...scenarioTips]));
  }, [averageFactors, results]);

  const resetProgress = (set: Scenario[]) => {
    setTrainingSet(set);
    setCurrentIndex(0);
    setClassification(undefined);
    setChoiceId(undefined);
    setResults([]);
  };

  const startTraining = () => {
    setFlowMode("training");
    resetProgress(pickRandomScenarios(scenarioBank, TRAINING_SCENARIO_COUNT));
    setScreen("scenario");
  };

  const startLearning = () => {
    setFlowMode("learning");
    setClassification(undefined);
    setChoiceId(undefined);
    setResults([]);
    setCurrentIndex(0);
    setScreen("category");
  };

  const startCategory = (category: Category) => {
    const selected = pickCategorySet(category);
    resetProgress(selected.length > 0 ? selected : scenarioBank);
    setScreen("scenario");
  };

  const continueFromAction = () => {
    if (!classification || !choiceId || !currentScenario) {
      return;
    }

    const result = calculateScenarioResult(currentScenario, classification, choiceId);
    const nextResults = [...results, result];
    setResults(nextResults);
    setClassification(undefined);
    setChoiceId(undefined);

    if (currentIndex + 1 >= trainingSet.length) {
      setScreen("result");
      return;
    }

    setCurrentIndex((value) => value + 1);
    setScreen("scenario");
  };

  const restart = () => {
    resetProgress(trainingSet);
    setScreen("scenario");
  };

  const home = () => {
    resetProgress(scenarioBank);
    setFlowMode("training");
    setScreen("welcome");
  };

  const backFromScenario = () => {
    setClassification(undefined);
    setChoiceId(undefined);
    setCurrentIndex(0);
    setResults([]);

    if (flowMode === "learning") {
      setScreen("category");
      return;
    }

    setScreen("welcome");
  };

  const backFromResult = () => {
    setResults((items) => items.slice(0, -1));
    setClassification(undefined);
    setChoiceId(undefined);
    setScreen("scenario");
  };

  return (
    <AppShell>
      {screen === "welcome" ? (
        <WelcomeScreen
          onStart={startTraining}
          onLearn={startLearning}
          onTheory={() => setScreen("theory")}
        />
      ) : null}
      {screen === "category" ? (
        <CategorySelectionScreen
          onSelect={startCategory}
          onBack={() => setScreen("welcome")}
          title="Выберите тему обучения"
          description="В обучении сценарии идут по выбранной теме и показывают подсказки после ответа."
        />
      ) : null}
      {screen === "theory" ? <TheoryScreen onBack={() => setScreen("welcome")} /> : null}
      {screen === "scenario" && currentScenario ? (
        <ScenarioScreen
          scenario={currentScenario}
          current={currentIndex}
          total={trainingSet.length}
          selected={classification}
          showHints={flowMode === "learning"}
          showAnswerFeedback={flowMode === "learning"}
          onBack={backFromScenario}
          onHome={flowMode === "learning" ? home : undefined}
          onSelect={setClassification}
          onContinue={() => setScreen("action")}
        />
      ) : null}
      {screen === "action" && currentScenario ? (
        <ActionScreen
          scenario={currentScenario}
          selectedChoice={choiceId}
          showActionFeedback={flowMode === "learning"}
          onBack={() => setScreen("scenario")}
          onHome={flowMode === "learning" ? home : undefined}
          onSelect={setChoiceId}
          onContinue={continueFromAction}
        />
      ) : null}
      {screen === "result" ? (
        <ResultScreen
          index={riskIndex}
          level={riskLevel}
          profile={riskProfile}
          factors={averageFactors}
          onBack={backFromResult}
          onContinue={() => setScreen("recommendations")}
        />
      ) : null}
      {screen === "recommendations" ? (
        <RecommendationsScreen
          recommendations={recommendations}
          onBack={() => setScreen("result")}
          onRestart={restart}
          onHome={home}
        />
      ) : null}
    </AppShell>
  );
}

export default App;
