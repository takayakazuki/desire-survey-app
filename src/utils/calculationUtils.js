/**
 * 欲求サーベイの計算ユーティリティー関数
 */

/**
 * 特定のサブカテゴリーと測定視点に基づいて平均スコアを計算
 * @param {Array} answers - 回答データ配列 [question_id, score]
 * @param {Array} questions - すべての質問データ
 * @param {string} subCategory - サブカテゴリーID
 * @param {string} perspective - 測定視点ID
 * @returns {number} - 平均スコア (0-100スケール)
 */
export const calculateSubCategoryScore = (answers, questions, subCategory, perspective) => {
  const filteredQuestions = questions.filter(
    q => q.subCategory === subCategory && q.perspective === perspective
  );
  
  const scores = filteredQuestions.map(q => {
    const answer = answers.find(a => a.questionId === q.id);
    return answer ? answer.score : 0;
  });
  
  if (scores.length === 0) return 0;
  
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return average * 20; // 5段階評価を100点満点に変換
};

/**
 * メインカテゴリー (生存、愛・所属など) のスコアを計算
 * @param {Array} answers - 回答データ配列
 * @param {Array} questions - すべての質問データ
 * @param {Array} subCategories - サブカテゴリーデータ
 * @param {string} mainCategory - メインカテゴリーID
 * @param {string} perspective - 測定視点ID
 * @returns {number} - 平均スコア (0-100スケール)
 */
export const calculateMainCategoryScore = (answers, questions, subCategories, mainCategory, perspective) => {
  // このメインカテゴリーに属するサブカテゴリーを見つける
  const relatedSubCategories = subCategories.filter(sc => sc.mainCategory === mainCategory);
  
  if (relatedSubCategories.length === 0) return 0;
  
  // 各サブカテゴリーのスコアを計算
  const subCategoryScores = relatedSubCategories.map(sc => 
    calculateSubCategoryScore(answers, questions, sc.id, perspective)
  );
  
  // メインカテゴリーの平均スコアを計算
  return subCategoryScores.reduce((sum, score) => sum + score, 0) / subCategoryScores.length;
};

/**
 * 欲求と現実のギャップを計算
 * @param {number} desireScore - 欲求スコア
 * @param {number} realityScore - 現実スコア
 * @returns {number} - ギャップスコア
 */
export const calculateGap = (desireScore, realityScore) => {
  return desireScore - realityScore;
};

/**
 * 全体プロファイル分析
 * @param {Array} answers - 回答データ配列
 * @param {Object} surveyData - サーベイデータ
 * @returns {Object} - 分析結果オブジェクト
 */
export const analyzeProfile = (answers, surveyData) => {
  const { mainCategories, subCategories, questions } = surveyData;
  
  // メインカテゴリー分析
  const mainCategoryAnalysis = mainCategories.map(mc => {
    const desireScore = calculateMainCategoryScore(answers, questions, subCategories, mc.id, 'desire');
    const effortScore = calculateMainCategoryScore(answers, questions, subCategories, mc.id, 'effort');
    const realityScore = calculateMainCategoryScore(answers, questions, subCategories, mc.id, 'reality');
    const gap = calculateGap(desireScore, realityScore);
    
    return {
      id: mc.id,
      name: mc.name,
      desireScore,
      effortScore,
      realityScore,
      gap
    };
  });
  
  // サブカテゴリー分析
  const subCategoryAnalysis = subCategories.map(sc => {
    const desireScore = calculateSubCategoryScore(answers, questions, sc.id, 'desire');
    const effortScore = calculateSubCategoryScore(answers, questions, sc.id, 'effort');
    const realityScore = calculateSubCategoryScore(answers, questions, sc.id, 'reality');
    const gap = calculateGap(desireScore, realityScore);
    const mainCategory = mainCategories.find(mc => mc.id === sc.mainCategory);
    
    return {
      id: sc.id,
      name: sc.name,
      mainCategoryId: sc.mainCategory,
      mainCategoryName: mainCategory ? mainCategory.name : '',
      desireScore,
      effortScore,
      realityScore,
      gap
    };
  });
  
  // 最大欲求の特定
  const maxDesireSubCategory = [...subCategoryAnalysis].sort((a, b) => b.desireScore - a.desireScore)[0];
  
  // 最大ギャップの特定
  const maxGapSubCategory = [...subCategoryAnalysis].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))[0];
  
  // バランスが良い（欲求・注力・現実がほぼ一致）サブカテゴリー
  const balancedSubCategories = subCategoryAnalysis.filter(
    sc => Math.abs(sc.gap) < 10 && sc.desireScore > 60
  );
  
  // 改善の機会が大きいサブカテゴリー
  const improvementOpportunities = subCategoryAnalysis.filter(
    sc => sc.gap > 20 && sc.desireScore > 70
  );
  
  return {
    mainCategoryAnalysis,
    subCategoryAnalysis,
    maxDesireSubCategory,
    maxGapSubCategory,
    balancedSubCategories,
    improvementOpportunities
  };
};

/**
 * サーベイ結果に基づく推奨アクションの生成
 * @param {Object} analysis - 分析結果オブジェクト
 * @returns {Array} - 推奨アクションの配列
 */
export const generateRecommendations = (analysis) => {
  const { maxDesireSubCategory, maxGapSubCategory, improvementOpportunities } = analysis;
  const recommendations = [];
  
  // 最も強い欲求に関する推奨
  if (maxDesireSubCategory) {
    recommendations.push({
      category: maxDesireSubCategory.name,
      text: `${maxDesireSubCategory.name}の欲求が特に強いです。この欲求を日常的に満たす方法を見つけることがあなたの満足度を高める鍵となります。`
    });
  }
  
  // 最大ギャップに関する推奨
  if (maxGapSubCategory && maxGapSubCategory.gap > 10) {
    recommendations.push({
      category: maxGapSubCategory.name,
      text: `${maxGapSubCategory.name}の領域で、欲求と現実に${Math.abs(maxGapSubCategory.gap).toFixed(1)}点の差があります。この領域に注力することでバランスが改善される可能性があります。`
    });
  }
  
  // 改善機会に関する推奨
  improvementOpportunities.forEach(opportunity => {
    recommendations.push({
      category: opportunity.name,
      text: `${opportunity.name}の欲求は強いですが、現実とのギャップが大きいです。この領域での満足度を高める具体的な方法を探してみましょう。`
    });
  });
  
  // 一般的な推奨
  recommendations.push({
    category: '定期的な再評価',
    text: '欲求のバランスは時間とともに変化します。定期的に再評価して、変化に合わせた対応を検討しましょう。'
  });
  
  return recommendations;
};
