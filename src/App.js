import React, { useState, useEffect } from 'react';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';

/**
 * メインアプリケーションコンポーネント
 */
const App = () => {
  // 状態の定義
  const [page, setPage] = useState('home'); // 'home', 'survey', 'results'
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    age: '',
    date: new Date().toISOString().slice(0, 10)
  });

  // ローカルストレージからデータの読み込み
  useEffect(() => {
    const savedData = localStorage.getItem('surveyData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.answers) {
          setAnswers(parsedData.answers);
        }
        if (parsedData.userData) {
          setUserData(parsedData.userData);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  // サーベイ開始
  const handleStartSurvey = () => {
    setPage('survey');
  };

  // プロフィール情報の更新
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // サーベイ完了時の処理
  const handleSurveyComplete = (surveyAnswers) => {
    setAnswers(surveyAnswers);
    // ローカルストレージに保存
    localStorage.setItem('surveyData', JSON.stringify({
      answers: surveyAnswers,
      userData
    }));
    setPage('results');
  };

  // サーベイを再度行う
  const handleRetakeSurvey = () => {
    setPage('survey');
  };

  // ホームページの表示
  const renderHomePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center relative py-4 mb-8">
        <span className="inline-block text-yellow-600 text-2xl absolute top-0 left-1/2 transform -translate-x-1/2 font-bold drop-shadow-sm">
          5つの
        </span>
        <h1 className="text-4xl font-bold text-center mt-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">基本的欲求サーベイ</span>
          <span className="inline-block bg-blue-700 text-white text-sm py-1 px-3 rounded-md ml-2 align-middle">web版</span>
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          あなたの欲求バランスを詳しく分析し、より効果的な自己理解をサポートします。
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">サーベイについて</h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            このサーベイは、選択理論心理学に基づく5つの基本的欲求をさらに15のサブカテゴリーに細分化し、
            「欲求」「注力」「現実」の3つの視点から測定するものです。
          </p>
          <p>
            各質問は1～5の5段階で回答していただきます。質問数は合計135問で、所要時間は約15〜20分です。
          </p>
          <p>
            回答後は、あなたの欲求プロファイルを詳細に分析し、バランスの取れた充実した生活を送るための
            いくつかの提案を含むレポートが表示されます。
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">5つの基本的欲求とは？</h3>
          <ul>
            <li><strong>生存</strong>：安全・安定と健康に関する欲求</li>
            <li><strong>愛・所属</strong>：愛情と所属感に関する欲求</li>
            <li><strong>力</strong>：達成、承認、言語力、競争力に関する欲求</li>
            <li><strong>自由</strong>：解放、変化、こだわりに関する欲求</li>
            <li><strong>楽しみ</strong>：ユーモア、好奇心、学習・成長、創造性に関する欲求</li>
          </ul>
          
          <p className="text-sm text-gray-500 mt-4">
            ※ このサーベイの結果はあくまで参考情報です。専門的な診断や評価ではありません。
          </p>
        </div>
      </div>
      
      {/* ユーザー情報入力フォーム（オプション） */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">プロフィール情報（任意）</h2>
        <p className="text-gray-600 mb-4">
          以下の情報は任意です。サーベイ結果と共に保存されますが、送信されることはありません。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任意"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleUserDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任意"
              min="0"
              max="120"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleUserDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください（任意）</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
              <option value="no-answer">回答しない</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
            <input
              type="date"
              name="date"
              value={userData.date}
              onChange={handleUserDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* スタートボタン */}
      <div className="text-center">
        <button
          onClick={handleStartSurvey}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          サーベイを開始する
        </button>
        
        {answers.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setPage('results')}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              前回の結果を見る
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ページの切り替え
  switch (page) {
    case 'home':
      return renderHomePage();
    case 'survey':
      return <SurveyPage onComplete={handleSurveyComplete} />;
    case 'results':
      return <ResultsPage answers={answers} onRetake={handleRetakeSurvey} />;
    default:
      return renderHomePage();
  }
};

export default App;
