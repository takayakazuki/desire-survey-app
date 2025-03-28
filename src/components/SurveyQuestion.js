import React from 'react';

/**
 * 単一の質問項目を表示するコンポーネント
 * @param {Object} props 
 * @param {Object} props.question - 質問データ
 * @param {number} props.currentAnswer - 現在の回答（1-5）
 * @param {Function} props.onChange - 回答変更時のコールバック
 */
const SurveyQuestion = ({ question, currentAnswer, onChange }) => {
  return (
    <div
      id={`question-${question.id}`}
      className={`border rounded-lg p-5 mb-6 bg-white shadow-md transition-all duration-300 ${!currentAnswer ? 'border-gray-200' : 'border-blue-300'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-base font-medium leading-relaxed flex-grow">{question.text}</div>
        <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full ml-2 whitespace-nowrap font-medium">
          質問 {question.id}/135
        </div>
      </div>
      
      <div className="flex items-center mt-4 bg-gray-50 p-3 rounded-lg">
        <div className="text-xs text-gray-600 mr-2 w-32 md:w-40">全く当てはまらない</div>
        <div className="flex-grow flex justify-between mx-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <label 
              key={value} 
              className={`flex flex-col items-center justify-center p-2 cursor-pointer rounded-lg transition-all duration-200 ${currentAnswer === value ? 'bg-blue-100 shadow-sm transform scale-105' : 'hover:bg-gray-100'}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={value}
                checked={currentAnswer === value}
                onChange={() => onChange(question.id, value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className={`text-sm mt-1 font-medium ${currentAnswer === value ? 'text-blue-700' : 'text-gray-700'}`}>{value}</span>
            </label>
          ))}
        </div>
        <div className="text-xs text-gray-600 ml-2 w-32 md:w-40 text-right">非常に当てはまる</div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-700">
        <div className="bg-blue-50 px-2 py-1 rounded-full">
          <span className="font-medium">カテゴリー: </span>
          <span className="text-blue-700 font-semibold">{question.mainCategory === 'survival' ? '生存' :
                 question.mainCategory === 'love' ? '愛・所属' :
                 question.mainCategory === 'power' ? '力' :
                 question.mainCategory === 'freedom' ? '自由' :
                 question.mainCategory === 'fun' ? '楽しみ' : ''}</span>
        </div>
        <div className="bg-purple-50 px-2 py-1 rounded-full">
          <span className="font-medium">サブカテゴリー: </span>
          <span className="text-purple-700 font-semibold">{
            question.subCategory === 'safety' ? '安全・安定' :
            question.subCategory === 'health' ? '健康' :
            question.subCategory === 'love' ? '愛' :
            question.subCategory === 'belonging' ? '所属' :
            question.subCategory === 'achievement' ? '達成' :
            question.subCategory === 'recognition' ? '承認' :
            question.subCategory === 'language' ? '言語' :
            question.subCategory === 'competition' ? '競争' :
            question.subCategory === 'release' ? '解放' :
            question.subCategory === 'change' ? '変化' :
            question.subCategory === 'preference' ? 'こだわり' :
            question.subCategory === 'humor' ? 'ユーモア' :
            question.subCategory === 'curiosity' ? '好奇心' :
            question.subCategory === 'learning' ? '学習・成長' :
            question.subCategory === 'creativity' ? '創造性' : ''
          }</span>
        </div>
        <div className="bg-green-50 px-2 py-1 rounded-full">
          <span className="font-medium">測定視点: </span>
          <span className="text-green-700 font-semibold">{
            question.perspective === 'desire' ? '欲求' :
            question.perspective === 'effort' ? '注力' :
            question.perspective === 'reality' ? '現実' : ''
          }</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;
