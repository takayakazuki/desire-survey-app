import React from 'react';
import SurveyQuestion from './SurveyQuestion';

/**
 * サーベイの特定のセクション（メインカテゴリー、サブカテゴリー）を表示するコンポーネント
 * @param {Object} props
 * @param {Array} props.questions - 表示する質問の配列
 * @param {Object} props.answers - 現在の回答
 * @param {Function} props.onAnswerChange - 回答変更時のコールバック
 * @param {string} props.title - セクションのタイトル
 * @param {string} props.description - セクションの説明
 */
const SurveySection = ({ questions, answers, onAnswerChange, title, description }) => {
  return (
    <div className="mb-10">
      <div className="mb-6 border-l-4 border-blue-600 pl-4">
        <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      
      {questions.map(question => (
        <SurveyQuestion
          key={question.id}
          question={question}
          currentAnswer={answers[question.id] || 0}
          onChange={onAnswerChange}
        />
      ))}
    </div>
  );
};

export default SurveySection;
