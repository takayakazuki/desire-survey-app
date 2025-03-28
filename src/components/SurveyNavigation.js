import React from 'react';

/**
 * サーベイのナビゲーションコンポーネント
 * @param {Object} props
 * @param {Array} props.sections - セクション情報の配列
 * @param {number} props.currentSection - 現在のセクションインデックス
 * @param {Function} props.onSectionChange - セクション変更時のコールバック
 * @param {number} props.progress - 全体の進捗率（0-100）
 */
const SurveyNavigation = ({ sections, currentSection, onSectionChange, progress }) => {
  return (
    <div className="mb-10">
      {/* 進捗バー */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-500 relative"
          style={{ width: `${progress}%` }}
        >
          {progress > 5 && (
            <div className="absolute inset-0 bg-opacity-30 bg-white overflow-hidden">
              <div className="h-full w-1/5 bg-white opacity-30 transform -skew-x-30 animate-shimmer"></div>
            </div>
          )}
        </div>
      </div>
      <div className="text-right text-sm font-medium text-blue-700 mb-4">
        進捗状況: {Math.round(progress)}%
      </div>
      
      {/* セクションナビゲーション */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm
              ${currentSection === index 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'}`}
            onClick={() => onSectionChange(index)}
          >
            {section.title}
          </button>
        ))}
      </div>
      
      {/* セクション説明 */}
      {sections[currentSection] && (
        <div className="text-sm bg-blue-50 border border-blue-100 text-blue-800 p-3 rounded-lg mb-6 font-medium">
          {sections[currentSection].description}
        </div>
      )}
    </div>
  );
};

export default SurveyNavigation;
