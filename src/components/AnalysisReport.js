import React from 'react';

/**
 * サーベイ分析のテキストレポートを表示するコンポーネント
 * @param {Object} props
 * @param {Object} props.analysis - 分析結果オブジェクト
 * @param {Array} props.recommendations - 推奨アクション配列
 */
const AnalysisReport = ({ analysis, recommendations }) => {
  const { maxDesireSubCategory, maxGapSubCategory, balancedSubCategories, improvementOpportunities } = analysis;
  
  // ビジネスでの活用方法の提案
  const getBusinessApplications = (categoryName) => {
    const applications = {
      '生存': [
        '安定した職場環境づくりへの注力（リモートワークポリシー、福利厚生の充実など）',
        '健康経営の推進（ウェルネスプログラム、健康管理支援など）',
        'ワークライフバランスを尊重する企業文化の醸成'
      ],
      '愛・所属': [
        'チームビルディング活動の定期的実施',
        '仕事の意義や目的を共有する機会の創出',
        '包摂的でサポーティブな職場文化の構築'
      ],
      '力': [
        '明確なキャリアパスと成長機会の提供',
        '成果を可視化し称える仕組みの導入',
        '権限委譲と意思決定への参加機会の増加'
      ],
      '自由': [
        '柔軟な働き方や自主性を重んじるプロジェクト管理',
        '創造性を発揮できる環境づくり',
        '個性や多様性を尊重する職場文化の構築'
      ],
      '楽しみ': [
        '学習と創造を推奨する職場環境の構築',
        'イノベーションを促進するブレインストーミングセッションの実施',
        '好奇心や探求心を刺激する継続的な学習機会の提供'
      ]
    };
    
    return applications[categoryName] || [
      'チームの多様なニーズに配慮したマネジメントスタイルの採用',
      '個々の強みを活かしたプロジェクト配置の工夫',
      '組織全体の健全な文化構築に向けた取り組み'
    ];
  };
  
  // 私生活での活用方法の提案
  const getPersonalLifeApplications = (categoryName) => {
    const applications = {
      '生存': [
        '長期的な資産形成・貯蓄計画の策定',
        '健康習慣の確立（運動、栄養、睡眠の質向上）',
        '住環境の安全・快適さの向上'
      ],
      '愛・所属': [
        '重要な人間関係への意識的な時間投資',
        'コミュニティ活動への参加',
        '家族との質の高い時間の確保'
      ],
      '力': [
        '個人の目標設定と達成のための行動計画作成',
        '専門性や才能を発揮できる活動への参加',
        '自己効力感を高める小さな成功体験の積み重ね'
      ],
      '自由': [
        '自分のための「自由時間」の確保と優先順位付け',
        '過度の義務や責任の見直し',
        '自己表現の機会を増やす'
      ],
      '楽しみ': [
        '好奇心を満たす趣味や学習活動の追求',
        '創造的な活動への定期的な時間確保',
        'ユーモアや遊び心を日常に取り入れる'
      ]
    };
    
    return applications[categoryName] || [
      '自分の欲求パターンを意識した日常習慣の構築',
      '自己理解に基づく境界設定と自己主張',
      'バランスの取れたライフスタイルへの意識的な取り組み'
    ];
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">欲求プロファイル分析</h3>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          あなたの欲求プロファイルから、以下の特徴が読み取れます。このプロファイルは、
          選択理論心理学に基づく5つの基本的欲求を15のサブカテゴリーに細分化し、
          「欲求」「注力」「現実」の3つの視点から測定したものです。
        </p>
        
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 border-gray-200">主要な特徴</h4>
          
          {maxDesireSubCategory && (
            <div className="mb-4 bg-blue-50 p-4 rounded-lg">
              <h5 className="text-lg font-medium mb-2 text-blue-700">
                最も強い欲求: {maxDesireSubCategory.mainCategoryName} - {maxDesireSubCategory.name} ({maxDesireSubCategory.desireScore.toFixed(1)}点)
              </h5>
              <p className="text-gray-700">
                この欲求が満たされることがあなたの満足感に大きく影響します。
                この欲求領域に意識的に時間とエネルギーを投資することで、全体的な充実感が高まる可能性があります。
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <h6 className="font-medium text-blue-800 mb-2">ビジネスでの活用方法</h6>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {getBusinessApplications(maxDesireSubCategory.mainCategoryName).map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <h6 className="font-medium text-blue-800 mb-2">私生活での活用方法</h6>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {getPersonalLifeApplications(maxDesireSubCategory.mainCategoryName).map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {maxGapSubCategory && Math.abs(maxGapSubCategory.gap) > 10 && (
            <div className="mb-4 bg-purple-50 p-4 rounded-lg">
              <h5 className="text-lg font-medium mb-2 text-purple-700">
                欲求と現実のギャップが大きい領域: {maxGapSubCategory.mainCategoryName} - {maxGapSubCategory.name} 
                (差: {maxGapSubCategory.gap.toFixed(1)}点)
              </h5>
              <p className="text-gray-700">
                {maxGapSubCategory.gap > 0 
                  ? 'この領域では、欲求が現実を上回っています。このギャップに注目することで、満足度を高める機会があります。'
                  : 'この領域では、現実が欲求を上回っています。他の領域に注力するとより充実感が高まるかもしれません。'}
              </p>
              <div className="mt-3">
                <h6 className="font-medium text-purple-800 mb-2">改善のためのアクションプラン</h6>
                <div className="bg-white p-3 rounded-lg border border-purple-100">
                  <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                    <li>現状の<strong>評価</strong>: ギャップの原因を特定するため、この領域での現在の取り組みを客観的に評価する</li>
                    <li><strong>目標設定</strong>: 現実のスコアを徐々に向上させるための具体的で達成可能な目標を設定する</li>
                    <li><strong>リソース特定</strong>: この欲求を満たすために利用できるリソースや機会を特定する</li>
                    <li><strong>行動計画</strong>: 日常生活やビジネスシーンでこの欲求を満たすための具体的な行動計画を立てる</li>
                    <li><strong>進捗追跡</strong>: 定期的に進捗を評価し、必要に応じて計画を調整する</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <h5 className="text-lg font-medium mb-3 text-green-700">
              欲求、注力、現実のバランス
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {balancedSubCategories.length > 0 ? (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h6 className="font-medium text-green-800 mb-2">バランスの取れている領域:</h6>
                  <ul className="list-disc pl-5 space-y-1">
                    {balancedSubCategories.map((sc, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium">{sc.mainCategoryName} - {sc.name}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          (欲求: {sc.desireScore.toFixed(1)}, 現実: {sc.realityScore.toFixed(1)})
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-medium">これらの領域では理想的なバランスが取れています。この状態を維持するために:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>現在の取り組みや習慣を継続する</li>
                      <li>定期的に自己評価を行い、バランスが崩れていないか確認する</li>
                      <li>バランスの取れた領域から得た洞察を、他の領域にも応用する</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h6 className="font-medium text-yellow-800 mb-2">バランスの取れた領域:</h6>
                  <p className="text-gray-700">
                    現在、欲求と現実のバランスが十分に取れている領域は見られません。
                    各領域での取り組みを見直し、欲求と現実のギャップを縮める努力が推奨されます。
                  </p>
                </div>
              )}
              
              {improvementOpportunities.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h6 className="font-medium text-red-800 mb-2">改善の機会がある領域:</h6>
                  <ul className="list-disc pl-5 space-y-1">
                    {improvementOpportunities.map((sc, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium">{sc.mainCategoryName} - {sc.name}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          (ギャップ: {sc.gap.toFixed(1)})
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-medium">これらの領域では改善の余地があります。検討すべき点:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>現在の注力方法や取り組みが効果的かどうか見直す</li>
                      <li>欲求と現実のギャップを埋めるための新しいアプローチを試す</li>
                      <li>小さな目標から始め、徐々に改善していく段階的なアプローチを取る</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {recommendations && recommendations.length > 0 && (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 border-gray-200">推奨アクションプラン</h4>
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-800 mb-2">{rec.category}</h5>
                  <p className="text-gray-700 mb-3">{rec.text}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h6 className="font-medium text-blue-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        ビジネスでの実践
                      </h6>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>会議やプロジェクトでの積極的な役割取得</li>
                        <li>チーム内での専門性の共有と発揮</li>
                        <li>業務プロセスの改善提案</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h6 className="font-medium text-purple-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        私生活での実践
                      </h6>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>趣味や関心事への定期的な時間確保</li>
                        <li>家族や友人との質の高い交流機会の創出</li>
                        <li>自己成長のための学習習慣の確立</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-blue-100 p-3 rounded-lg">
                    <h6 className="font-medium text-blue-800 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      すぐに始められるアクション
                    </h6>
                    <p className="text-sm text-gray-700">
                      今週から取り組める具体的なステップ: 毎日15分の専念時間を確保し、この領域に関連する小さな目標に取り組む。
                      進捗を記録し、1週間後に振り返りを行う。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisReport;
