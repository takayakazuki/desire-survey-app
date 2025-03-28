import React from 'react';

/**
 * 欲求プロファイルの活用プランを表示するコンポーネント
 * @param {Object} props
 * @param {Object} props.analysis - 分析結果オブジェクト
 */
const ActionPlan = ({ analysis }) => {
  // 最も強い欲求カテゴリーを取得
  const strongestCategory = analysis?.maxDesireSubCategory?.mainCategoryName || '';
  
  const businessTips = {
    '生存': [
      'チームの安全と安定を優先するプロジェクト管理手法の採用',
      '健康経営の推進（ウェルネスプログラム、健康管理支援など）',
      'リスク管理とコンティンジェンシープランの策定'
    ],
    '愛・所属': [
      'チームビルディング活動の定期的実施と参加',
      '社内コミュニケーションの活性化策の提案',
      'メンターシップやピアサポートプログラムの活用'
    ],
    '力': [
      'リーダーシップポジションの積極的獲得',
      '専門知識や技術の共有と教育機会の創出',
      '業務プロセス改善提案の積極的実施'
    ],
    '自由': [
      '柔軟な働き方の活用と提案',
      '創造性を発揮できるプロジェクトへの参加',
      '業務効率化による自由時間の創出'
    ],
    '楽しみ': [
      '学習と成長のための社内外研修への積極参加',
      'イノベーティブなアイデア創出セッションの主催',
      '職場環境改善のための創造的提案'
    ]
  };
  
  const lifeTips = {
    '生存': [
      '長期的な資産形成・貯蓄計画の策定',
      '健康習慣の体系的確立（運動、栄養、睡眠の質向上）',
      '住環境の安全・快適さの向上とメンテナンス'
    ],
    '愛・所属': [
      '重要な人間関係への定期的な時間投資（週1回の家族の時間など）',
      '地域コミュニティ活動への積極参加',
      '深い人間関係を育む傾聴スキルの向上'
    ],
    '力': [
      '1年・3年・5年の個人目標設定と進捗管理システムの構築',
      '専門性や才能を発揮できる活動への定期的参加',
      '自己効力感を高める小さな成功体験の意識的な創出'
    ],
    '自由': [
      '週に最低3時間の「自分だけの時間」の確保',
      '断捨離と物理的・デジタル環境の整理',
      '自己表現のための創造的活動の定期的実践'
    ],
    '楽しみ': [
      '月1回の新しい体験・場所への探索',
      '週に2時間の創造的活動または学習時間の確保',
      '日常への小さな遊び心や変化の意識的な導入'
    ]
  };
  
  // 基本カテゴリー別のデフォルト提案
  const defaultTips = {
    business: ['リーダーシップスキルの向上', 'チーム内コミュニケーションの改善', '効率的な業務プロセスの構築'],
    life: ['バランスの取れた生活習慣の確立', '意識的な自己成長活動の習慣化', '人間関係の質向上のための取り組み']
  };
  
  // 使用する提案（該当カテゴリーがない場合はデフォルトを使用）
  const businessSuggestions = businessTips[strongestCategory] || defaultTips.business;
  const lifeSuggestions = lifeTips[strongestCategory] || defaultTips.life;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">欲求プロファイルの活用プラン</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ビジネスでの活用 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border border-blue-100">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <h4 className="text-xl font-semibold text-blue-700">ビジネスでの活用</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">あなたの欲求プロファイルを活かした職場での取り組み</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {businessSuggestions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-blue-800 mb-2">コミュニケーション戦略</h5>
              <p className="text-gray-700">あなたの欲求プロファイルに基づくと、以下のコミュニケーションアプローチが効果的です:</p>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                <li>自分の欲求と価値観を明確に伝える</li>
                <li>チームメンバーの多様な欲求パターンを尊重する</li>
                <li>定期的なフィードバックを求め、提供する</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-blue-800 mb-2">リーダーシップ開発</h5>
              <p className="text-gray-700">あなたの欲求パターンを活かしたリーダーシップスタイルの構築:</p>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                <li>チームメンバーの多様な欲求を識別し対応する能力の開発</li>
                <li>自分の欲求パターンを意識した意思決定プロセスの構築</li>
                <li>ストレスや困難な状況下での自己管理能力の向上</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 私生活での活用 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-100">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-purple-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <h4 className="text-xl font-semibold text-purple-700">私生活での活用</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-purple-800 mb-2">あなたの欲求プロファイルを活かした日常習慣</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {lifeSuggestions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-purple-800 mb-2">人間関係の向上</h5>
              <p className="text-gray-700">あなたの欲求プロファイルに基づいた人間関係構築のポイント:</p>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                <li>自分の欲求パターンを意識した境界設定</li>
                <li>重要な関係への意識的な時間と注意の投資</li>
                <li>他者の欲求パターンを尊重した関わり方の工夫</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-medium text-purple-800 mb-2">セルフケアと充実感</h5>
              <p className="text-gray-700">欲求バランスを整えるためのセルフケア実践:</p>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                <li>「欲求ダイアリー」: 日々の活動とそれが満たす欲求を記録</li>
                <li>週に1回の「欲求バランス・チェックイン」の実施</li>
                <li>各欲求カテゴリーに対応した充実活動リストの作成と実践</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* 30日アクションプラン */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-100">
        <div className="flex items-center mb-3">
          <svg className="w-6 h-6 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <h4 className="text-xl font-semibold text-green-700">30日アクションプラン</h4>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h5 className="font-medium text-green-800 mb-2">あなたの欲求を満たす30日チャレンジ</h5>
          <p className="text-gray-700 mb-3">
            30日間の具体的な行動計画を通じて、欲求バランスを改善し、より充実した日々を実現しましょう。
          </p>
          <ul className="list-decimal pl-5 text-gray-700 space-y-2">
            <li><strong>第1週:</strong> 現状の認識とゴール設定</li>
            <li><strong>第2週:</strong> 新習慣の試行と実験</li>
            <li><strong>第3週:</strong> 振り返りと調整</li>
            <li><strong>第4週:</strong> 習慣の強化と持続可能な方法の確立</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-medium text-green-800 mb-2">ビジネス面でのアクションステップ</h5>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>毎日15分の「目標検討タイム」を設定</li>
              <li>週に1回の「スキル向上時間」を確保</li>
              <li>隔週で1つの改善提案を職場で行う</li>
              <li>月に1回の自己評価と軌道修正</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-medium text-green-800 mb-2">私生活でのアクションステップ</h5>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>毎日の「欲求充足の瞬間」を意識的に記録</li>
              <li>週末に1つの新しい体験を試す</li>
              <li>重要な人間関係に週に2時間以上投資</li>
              <li>月に1回の大きな自己投資活動を計画</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
