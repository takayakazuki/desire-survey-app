import React from 'react';

/**
 * メインカテゴリーまたはサブカテゴリーの分析結果を表示するグラフコンポーネント
 * @param {Object} props
 * @param {Array} props.data - 表示するデータの配列
 * @param {string} props.title - グラフのタイトル
 * @param {boolean} props.isSubCategory - サブカテゴリーグラフかどうか
 */
const ResultsChart = ({ data, title, isSubCategory = false }) => {
  // 最大値は100
  const maxValue = 100;
  
  // 欲求スコアに応じた表情アイコンを返す関数
  const getEmotionIcon = (score) => {
    if (score >= 90) {
      return "😄"; // 非常に強い
    } else if (score >= 75) {
      return "🙂"; // 強い
    } else if (score >= 50) {
      return "😐"; // 普通
    } else if (score >= 25) {
      return "🙁"; // 弱い
    } else {
      return "😢"; // 非常に弱い
    }
  };
  
  // 欲求と現実の比較テキストを返す関数
  const getComparisonText = (desire, reality) => {
    const gap = desire - reality;
    const desirePercentage = desire.toFixed(0);
    const realityPercentage = reality.toFixed(0);
    
    if (gap > 20) {
      return `あなたは${desirePercentage}%の欲求を強く、理想以上の注力をしているようです。現在、理想に対して${realityPercentage}%満たされています。理想とする以上に欲求が高くなっている状態であると考えられます。もう少し力の関わり方を調整することで、より効果的に欲求を満たせることが出来るでしょう。`;
    } else if (gap > 10) {
      return `あなたは${desirePercentage}%の欲求を強く、理想に沿った注力をしているようです。現在、理想に対して${realityPercentage}%満たされています。ひとえに注力の関わり方といえるかもしれませんが、もう少し取り組んでいるものの以外にも目を向けてみるのも良いでしょう。`;
    } else if (gap > -10) {
      return `あなたは${desirePercentage}%の欲求を強く、理想に沿った注力をしているようです。現在、理想に対して${realityPercentage}%満たされています。欲求がとてもよく満たされている状態であると考えられます。現在の取り組みを続けていくと良いでしょう。`;
    } else if (gap > -20) {
      return `あなたは${desirePercentage}%の欲求を強く、理想以上の注力をしているようです。現在、理想に対して${realityPercentage}%満たされています。欲求がとてもよく満たされている状態であると考えられます。注力の仕方や方法を少し変えてみることで、より効果的に欲求を充足させることが出来るでしょう。`;
    } else {
      return `あなたは${desirePercentage}%の欲求を強く、理想を大きく上回る注力をしているようです。現在、理想に対して${realityPercentage}%満たされています。現実が欲求を大きく上回っている状態です。注力の仕方や方法を見直して、より効率的なバランスを見つけると良いでしょう。`;
    }
  };
  
  // サブカテゴリーの説明を返す関数
  const getSubCategoryDescription = (name) => {
    const descriptions = {
      '安全・安定': 'この項目は、進んで冒険をするようなことはせず、安定した生活を望む傾向についてみるものです。',
      '健康': 'この項目は、規則正しい生活を送り、日常的に健康にかかわるといった傾向についてみるものです。',
      '愛': 'この項目は、人とのかかわりを大切にし、交流の質はさほど気にせず、深いかかわりを望むといった傾向についてみるものです。',
      '所属': 'この項目は、たとえ深くなくても幅広く人とかかわることが好み、メンバーと共に何かをすることに喜びを感じるといった傾向についてみるものです。',
      '達成': 'この項目は、目標に向かって努力し自分の特性を発揮できるといった傾向についてみるものです。',
      '承認': 'この項目は、自分の実力や努力について人から認められたいといった傾向についてみるものです。',
      '真献': 'この項目は、人が詳しく取り組まないことにも取り組み、人をサポートする仕事に喜びを感じるといった傾向についてみるものです。',
      '競争': 'この項目は、他人にも勝ちたい、また自分自身にも打ち勝ちたいといった傾向についてみるものです。',
      '解放': 'この項目は、縛られたくないという思いの強さ、問題を解決されることを好まないといった傾向についてみるものです。',
      '変化': 'この項目は、現状維持に満足せず変化を志向していく傾向についてみるものです。',
      'こだわり': 'この項目は、人の意見に流されることなく、また自分らしさありたいという傾向についてみるものです。',
      'ユーモア': 'この項目は、ユーモアに富みいろいろなことを楽しみたいという傾向についてみるものです。',
      '好奇心': 'この項目は、幅広く興味・関心を持ち、新しいことに出会うことを楽しみたいといった傾向についてみるものです。',
      '学習・成長': 'この項目は、「学ぶ」ということに楽しみを見出し、自らの能力の向上といった傾向についてみるものです。',
      '創造性': 'この項目は、柔軟で新しい発想を生むことを楽しみたいといった傾向についてみるものです。'
    };
    
    return descriptions[name] || '説明がありません。';
  };

  // 実際の活用方法を提案する関数
  const getPracticalTips = (category, desireScore, realityScore) => {
    const gap = desireScore - realityScore;
    const tips = {
      '安全・安定': [
        '将来の安定のための資産形成計画を立てる',
        '定期的なスケジュールを作り、予測可能な環境を作る',
        'リスク管理のためのバックアッププランを準備する'
      ],
      '健康': [
        '毎日の運動習慣を確立する（短時間でも継続が大切）',
        '栄養バランスの良い食事計画を立てる',
        '定期的な健康診断と予防医療に注力する'
      ],
      '愛': [
        '大切な人との定期的な深い対話の時間を作る',
        '相手の話に集中して聴く積極的傾聴を実践する',
        '感謝や愛情を言葉や行動で表現する習慣をつける'
      ],
      '所属': [
        '趣味や関心に基づいたコミュニティに参加する',
        'チームプロジェクトで協力する機会を探す',
        '小さな社交の機会を定期的に設ける'
      ],
      '達成': [
        'SMART目標（具体的、測定可能、達成可能、関連性、期限）を設定する',
        '進捗を視覚化できるトラッキングシステムを使う',
        '小さな成功も祝う習慣をつける'
      ],
      '承認': [
        '自分の成果を適切にアピールする方法を学ぶ',
        'フィードバックを積極的に求める',
        '自己肯定感を高める自己承認の実践'
      ],
      '真献': [
        'ボランティア活動に参加する',
        '専門知識を生かした助言や支援を提供する',
        'メンターとして誰かの成長をサポートする'
      ],
      '競争': [
        '健全な競争環境がある活動に参加する',
        '自己記録更新のための個人目標を設定する',
        'ゲーミフィケーション要素を取り入れた自己改善'
      ],
      '解放': [
        '定期的に予定のない「自由時間」を確保する',
        '仕事とプライベートの境界を明確にする',
        '過度の責任や義務を見直し、必要なら「ノー」と言う'
      ],
      '変化': [
        '定期的に新しい経験やルーティンを試してみる',
        '異なる視点や意見を積極的に探る',
        '居住空間や作業環境を定期的に変える'
      ],
      'こだわり': [
        '自分の価値観や原則を明確にする時間を取る',
        '自分らしい選択をするための意思決定基準を作る',
        '自分のスタイルを表現できる創造的活動を行う'
      ],
      'ユーモア': [
        '日常に笑いを取り入れる意識的な瞬間を作る',
        'コメディやユーモラスなコンテンツを楽しむ時間を確保する',
        '失敗を恐れずに遊び心を大切にする'
      ],
      '好奇心': [
        '新しいトピックや分野について週に1つ学ぶ',
        '異なる文化や考え方に触れる機会を作る',
        '「なぜ？」「どうして？」という質問を意識的にする'
      ],
      '学習・成長': [
        'パーソナルラーニングプランを作成する',
        'オンラインコースや書籍による自己学習の習慣化',
        '学んだことを実践・教えることで定着させる'
      ],
      '創造性': [
        'アイデア生成のためのブレインストーミングセッションを定期的に行う',
        '異なる分野や概念を組み合わせた思考実験をする',
        '創造的な環境や刺激を意識的に取り入れる'
      ]
    };
    
    // ギャップに基づいて提案を調整
    if (gap > 15) {
      // 欲求が現実を大きく上回っている場合
      return tips[category] || ['具体的な活用法が見つかりませんでした。'];
    } else if (gap > 0) {
      // 欲求が現実をやや上回っている場合
      return tips[category] || ['具体的な活用法が見つかりませんでした。'];
    } else {
      // 現実が欲求と同等か上回っている場合
      return tips[category] || ['具体的な活用法が見つかりませんでした。'];
    }
  };
  
  // バーの色を決定する関数
  const getBarColor = (perspective, score) => {
    // パースペクティブに応じた基本色
    const baseColors = {
      desire: 'blue',
      effort: 'yellow',
      reality: 'purple'
    };
    
    // スコアに応じた強度（濃さ）
    let intensity = 500;
    if (score >= 90) {
      intensity = 700;
    } else if (score >= 75) {
      intensity = 600;
    } else if (score >= 50) {
      intensity = 500;
    } else if (score >= 25) {
      intensity = 400;
    } else {
      intensity = 300;
    }
    
    return `${baseColors[perspective]}-${intensity}`;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* チャート見出し */}
          <div className="flex mb-2">
            <div className="w-1/4 text-sm font-medium text-gray-700">カテゴリー</div>
            <div className="w-2/4 flex items-center">
              <div className="flex-1 text-center text-sm font-medium text-gray-700">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> 欲求
              </div>
              <div className="flex-1 text-center text-sm font-medium text-gray-700">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> 注力
              </div>
              <div className="flex-1 text-center text-sm font-medium text-gray-700">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-1"></span> 現実
              </div>
            </div>
            <div className="w-1/4 text-sm font-medium text-center text-gray-700">状態</div>
          </div>
          
          {/* データバー */}
          {data.map((item, index) => (
            <div key={index} className={`mb-8 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-4 rounded-lg border border-gray-200`}>
              <div className="flex items-center mb-3">
                <div className="text-lg font-bold text-gray-800 mr-2">
                  {isSubCategory && (
                    <span className="text-sm text-gray-500 mr-1">{item.mainCategoryName}:</span>
                  )}
                  {item.name}
                </div>
                <div className="ml-auto text-2xl">
                  {getEmotionIcon(item.realityScore)}
                </div>
              </div>
              
              {isSubCategory && (
                <div className="text-sm text-gray-600 mb-3">
                  {getSubCategoryDescription(item.name)}
                </div>
              )}
              
              <div className="mb-4">
                <div className="grid grid-cols-8 gap-2 mb-1 items-center">
                  <div className="col-span-1 text-sm font-medium text-gray-700">欲求</div>
                  <div className="col-span-5">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div
                        className={`bg-${getBarColor('desire', item.desireScore)} h-5 rounded-full`}
                        style={{ width: `${(item.desireScore / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium">
                    {item.desireScore.toFixed(0)}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="inline-block w-6 h-6 text-xs text-center leading-6 bg-blue-100 rounded-full">
                      {item.desireScore.toFixed(0)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-8 gap-2 mb-1 items-center">
                  <div className="col-span-1 text-sm font-medium text-gray-700">注力</div>
                  <div className="col-span-5">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div
                        className={`bg-${getBarColor('effort', item.effortScore)} h-5 rounded-full`}
                        style={{ width: `${(item.effortScore / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium">
                    {item.effortScore.toFixed(0)}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="inline-block w-6 h-6 text-xs text-center leading-6 bg-yellow-100 rounded-full">
                      {item.effortScore.toFixed(0)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-8 gap-2 items-center">
                  <div className="col-span-1 text-sm font-medium text-gray-700">現実</div>
                  <div className="col-span-5">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div
                        className={`bg-${getBarColor('reality', item.realityScore)} h-5 rounded-full`}
                        style={{ width: `${(item.realityScore / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium">
                    {item.realityScore.toFixed(0)}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="inline-block w-6 h-6 text-xs text-center leading-6 bg-purple-100 rounded-full">
                      {item.realityScore.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {isSubCategory && (
                <div className="mt-3 text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                  <p className="mb-2 font-medium">欲求傾向詳細:</p>
                  <p>{getComparisonText(item.desireScore, item.realityScore)}</p>
                  
                  {/* 実際の活用方法 */}
                  <div className="mt-3">
                    <p className="font-medium text-blue-700">日常生活・ビジネスでの活用方法:</p>
                    <ul className="list-disc pl-5 mt-1">
                      {getPracticalTips(item.name, item.desireScore, item.realityScore).map((tip, tipIndex) => (
                        <li key={tipIndex} className="mt-1">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* ギャップ表示 (オプション) */}
              {item.gap !== undefined && Math.abs(item.gap) > 10 && (
                <div className="mt-2 text-xs">
                  <span className={`font-medium ${item.gap > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    欲求と現実のギャップ: {item.gap > 0 ? '+' : ''}{item.gap.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;
