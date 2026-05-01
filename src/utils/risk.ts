import {
  ClassificationAnswer,
  RiskFactors,
  RiskLevel,
  RiskProfile,
  Scenario,
  ScenarioResult,
  ScenarioType,
} from "../types";

export const getRecognitionError = (
  type: ScenarioType,
  answer: ClassificationAnswer,
) => {
  const table: Record<ScenarioType, Record<ClassificationAnswer, number>> = {
    fraud: { fraud: 0, unsure: 40, safe: 100 },
    safe: { safe: 0, unsure: 20, fraud: 60 },
    ambiguous: { unsure: 0, fraud: 50, safe: 50 },
  };

  return table[type][answer];
};

export const calculateIndex = (factors: RiskFactors) =>
  Math.round(
    factors.RecognitionError * 0.25 +
      factors.Trust * 0.25 +
      factors.Impulse * 0.2 +
      factors.VerificationRisk * 0.2 +
      factors.Criticality * 0.1,
  );

export const calculateScenarioResult = (
  scenario: Scenario,
  classification: ClassificationAnswer,
  choiceId: string,
): ScenarioResult => {
  const choice = scenario.choices.find((item) => item.id === choiceId);

  if (!choice) {
    throw new Error(`Choice "${choiceId}" was not found`);
  }

  const factors: RiskFactors = {
    RecognitionError: getRecognitionError(scenario.type, classification),
    ...choice.factors,
  };

  return {
    scenarioId: scenario.id,
    classification,
    choiceId,
    factors,
    index: calculateIndex(factors),
  };
};

export const getAverageFactors = (results: ScenarioResult[]): RiskFactors => {
  const empty: RiskFactors = {
    RecognitionError: 0,
    Trust: 0,
    Impulse: 0,
    VerificationRisk: 0,
    Criticality: 0,
  };

  if (results.length === 0) {
    return empty;
  }

  const totals = results.reduce<RiskFactors>(
    (acc, result) => ({
      RecognitionError: acc.RecognitionError + result.factors.RecognitionError,
      Trust: acc.Trust + result.factors.Trust,
      Impulse: acc.Impulse + result.factors.Impulse,
      VerificationRisk: acc.VerificationRisk + result.factors.VerificationRisk,
      Criticality: acc.Criticality + result.factors.Criticality,
    }),
    empty,
  );

  return {
    RecognitionError: Math.round(totals.RecognitionError / results.length),
    Trust: Math.round(totals.Trust / results.length),
    Impulse: Math.round(totals.Impulse / results.length),
    VerificationRisk: Math.round(totals.VerificationRisk / results.length),
    Criticality: Math.round(totals.Criticality / results.length),
  };
};

export const getRiskIndex = (results: ScenarioResult[]) =>
  calculateIndex(getAverageFactors(results));

export const getRiskLevel = (index: number): RiskLevel => {
  if (index <= 20) {
    return {
      title: "Низкий риск",
      tone: "low",
      description: "Вы хорошо распознаете угрозы и проверяете важные действия.",
    };
  }

  if (index <= 45) {
    return {
      title: "Умеренный риск",
      tone: "moderate",
      description: "База сильная, но отдельные привычки могут создавать уязвимости.",
    };
  }

  if (index <= 70) {
    return {
      title: "Повышенный риск",
      tone: "elevated",
      description: "Вас могут зацепить срочностью, доверием или недостатком проверки.",
    };
  }

  return {
    title: "Высокий риск",
    tone: "high",
    description: "Нужны более жесткие правила проверки до любых денег, кодов и ссылок.",
  };
};

export const getRiskProfile = (
  factors: RiskFactors,
  results: ScenarioResult[],
): RiskProfile => {
  if (results.some((result) => result.classification === "unsure") && factors.RecognitionError <= 25) {
    return {
      title: "Сомневающийся пользователь",
      explanation:
        "Вы умеете тормозить в неоднозначных ситуациях. Следующий шаг - превращать сомнение в быструю проверку по надежному каналу.",
    };
  }

  const entries = Object.entries(factors) as Array<[keyof RiskFactors, number]>;
  const [dominant] = entries.sort((a, b) => b[1] - a[1]);

  const profiles: Record<keyof RiskFactors, RiskProfile> = {
    RecognitionError: {
      title: "Рискованный пользователь",
      explanation:
        "Главная зона роста - распознавание признаков обмана. Вам помогут чек-листы: срочность, секретные коды, внешняя ссылка, перевод вне платформы.",
    },
    Trust: {
      title: "Доверчивый пользователь",
      explanation:
        "Вы склонны верить знакомым именам, уверенным голосам и красивым страницам. Защитное правило: доверие только после независимой проверки.",
    },
    Impulse: {
      title: "Импульсивный пользователь",
      explanation:
        "Срочность и выгода могут подталкивать к быстрым решениям. Пауза в 60 секунд перед оплатой или вводом данных резко снижает риск.",
    },
    VerificationRisk: {
      title: "Непроверяющий пользователь",
      explanation:
        "Вы иногда действуете без контрольной проверки. Самый сильный навык - открывать сервис вручную, а не идти по ссылке из сообщения.",
    },
    Criticality: {
      title: "Рискованный пользователь",
      explanation:
        "Ошибки могут затрагивать деньги, аккаунты и личные данные. Ограничивайте лимиты и выносите важные решения из режима спешки.",
    },
  };

  if (Math.max(...entries.map(([, value]) => value)) <= 20) {
    return {
      title: "Осторожный пользователь",
      explanation:
        "Вы не спешите, проверяете источник и отделяете настоящие сервисы от имитаций. Сохраните эту дисциплину в новых сценариях.",
    };
  }

  return profiles[dominant[0]];
};

export const getPersonalRecommendations = (factors: RiskFactors) => {
  const tips = [
    "Перед любым переводом, вводом пароля или кода делайте паузу и проверяйте источник.",
  ];

  if (factors.RecognitionError > 35) {
    tips.push("Тренируйте распознавание признаков: срочность, секретные коды, странный домен, оплата вне платформы.");
  }

  if (factors.Trust > 35) {
    tips.push("Не считайте знакомое имя доказательством безопасности: аккаунты взламывают, номера подменяют.");
  }

  if (factors.Impulse > 35) {
    tips.push("Уберите решения из режима спешки: 'скидка закончится' и 'деньги уйдут' часто нужны для давления.");
  }

  if (factors.VerificationRisk > 35) {
    tips.push("Проверяйте через официальный сайт, приложение, номер на карте или отдельный канал связи.");
  }

  if (factors.Criticality > 35) {
    tips.push("Настройте лимиты, отдельную карту для онлайн-платежей и двухфакторную защиту аккаунтов.");
  }

  return tips;
};
