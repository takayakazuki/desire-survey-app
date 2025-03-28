import React, { useState, useEffect } from 'react';
import SurveyNavigation from '../components/SurveyNavigation';
import SurveySection from '../components/SurveySection';
import { mainCategories, questions } from '../utils/surveyData';

/**
 * サーベイのメインページコンポーネント
 * @param {Object} props
 * @param {Function} props.onComplete - サーベイ完了時のコールバック
 */
const SurveyPage = ({ onComplete }) => {
  // ステート
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);

  // メインカテゴリーごとのセクションを作成
  const sections = mainCategories.map(mc => {
    return {
      id: mc.id,
      title: mc.name,
      description: `${mc.name}に関する質問 (${questions.filter(q => q.mainCategory === mc.id).length}問)`,
      questions: questions.filter(q => q.mainCategory === mc.id)
    };
  });

  // セクション変更のハンドラー
  const handleSectionChange = (newSectionIndex) => {
    // 現在のセクションと同じ場合は何もしない
    if (newSectionIndex === currentSection) return;
    
    // 現在のセクションの質問をチェック
    const currentQuestions = sections[currentSection].questions;
    const currentQuestionIds = currentQuestions.map(q => q.id);
    const answeredIds = Object.keys(answers).map(id => parseInt(id));
    const unansweredIds = currentQuestionIds.filter(id => !answeredIds.includes(id));
    
    // 未回答の質問がある場合は確認ダイアログ表示
    if (unansweredIds.length > 0) {
      const confirmDialog = window.confirm(
        `${unansweredIds.length}問の未回答の質問があります。すべての質問に回答することをお勧めします。このままセクションを移動しますか？`
      );
      
      if (!confirmDialog) {
        // 最初の未回答質問にスクロール
        const firstUnansweredId = `question-${unansweredIds[0]}`;
        const element = document.getElementById(firstUnansweredId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-question');
          setTimeout(() => {
            element.classList.remove('highlight-question');
          }, 2000);
        }
        return;
      }
    }
    
    // セクションを変更
    setCurrentSection(newSectionIndex);
    window.scrollTo(0, 0);
  };

  // 回答変更のハンドラー
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // 進捗率の計算
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const newProgress = (answeredCount / totalQuestions) * 100;
    setProgress(newProgress);
  }, [answers]);

  // 次のセクションに進む
  const goToNextSection = () => {
    // 最後のセクションかどうかをチェック
    const isLastSection = currentSection === sections.length - 1;
    
    // 最後のセクションの場合は何もしない（「結果を表示」ボタンを使用する）
    if (isLastSection) {
      return;
    }
    
    // 通常のバリデーション処理
    const currentQuestions = sections[currentSection].questions;
    const currentQuestionIds = currentQuestions.map(q => q.id);
    const answeredIds = Object.keys(answers).map(id => parseInt(id));
    const unansweredIds = currentQuestionIds.filter(id => !answeredIds.includes(id));
    
    if (unansweredIds.length > 0) {
      const confirmDialog = window.confirm(
        `${unansweredIds.length}問の未回答の質問があります。すべての質問に回答することをお勧めします。このまま次のセクションに進みますか？`
      );
      
      if (!confirmDialog) {
        // 未回答の質問までスクロール
        const firstUnansweredId = `question-${unansweredIds[0]}`;
        const element = document.getElementById(firstUnansweredId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-question');
          setTimeout(() => {
            element.classList.remove('highlight-question');
          }, 2000);
        }
        return;
      }
    }
  
    // 次のセクションに移動
    setCurrentSection(currentSection + 1);
    window.scrollTo(0, 0);
  };

  // 前のセクションに戻る
  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // サーベイ送信（結果ページへ移動）
  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // 現在のセクションの質問をチェック
    const currentQuestions = sections[currentSection].questions;
    const currentQuestionIds = currentQuestions.map(q => q.id);
    const answeredIds = Object.keys(answers).map(id => parseInt(id));
    const unansweredIds = currentQuestionIds.filter(id => !answeredIds.includes(id));
    
    // 未回答がある場合は確認ダイアログを表示
    if (unansweredIds.length > 0) {
      const confirmation = window.confirm(
        `${unansweredIds.length}問の未回答の質問があります。すべての質問に回答することをお勧めします。このまま結果を見ますか？`
      );
      
      if (!confirmation) {
        // 最初の未回答質問にスクロール
        const firstUnansweredId = `question-${unansweredIds[0]}`;
        const element = document.getElementById(firstUnansweredId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-question');
          setTimeout(() => {
            element.classList.remove('highlight-question');
          }, 2000);
        }
        return;
      }
    }
    
    // 回答データを整形して送信
    const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
      questionId: parseInt(questionId),
      score
    }));
    onComplete(formattedAnswers);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center relative py-4">
        <span className="inline-block text-yellow-600 text-2xl absolute top-0 left-1/2 transform -translate-x-1/2 font-bold drop-shadow-sm">
          5つの
        </span>
        <h1 className="text-4xl font-bold text-center mt-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">基本的欲求サーベイ</span>
          <span className="inline-block bg-blue-700 text-white text-sm py-1 px-3 rounded-md ml-2 align-middle">web版</span>
        </h1>
      </div>
      
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-lg mb-8 text-white shadow-lg">
        <h2 className="font-bold text-xl text-white mb-4">サーベイについて</h2>
        <p className="text-blue-100 mb-4 leading-relaxed">
          このサーベイは、選択理論心理学に基づく5つの基本的欲求をさらに15のサブカテゴリーに細分化し、
          「欲求」「注力」「現実」の3つの視点から測定するものです。
        </p>
        <p className="text-blue-100 leading-relaxed">
          各質問について、1（全く当てはまらない）～5（非常に当てはまる）の5段階で評価してください。
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <SurveyNavigation 
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          progress={progress}
        />
        
        <SurveySection 
          title={sections[currentSection].title}
          description={sections[currentSection].description}
          questions={sections[currentSection].questions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={goToPrevSection}
            disabled={currentSection === 0}
            className={`px-6 py-2 rounded-lg ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            前へ
          </button>
          
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={goToNextSection}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-300 transform hover:scale-105"
            >
              次へ
            </button>
          ) : (
            <button
              type="button" // フォーム送信ではなくボタンクリックとして処理
              onClick={handleSubmit} // handleSubmitを直接呼び出し
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-md transition-all duration-300 transform hover:scale-105 font-medium"
            >
              結果を表示
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;