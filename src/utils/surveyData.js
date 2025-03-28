/**
 * 選択理論心理学 15サブカテゴリー欲求サーベイのデータモデル
 */

// メインカテゴリーの定義
const mainCategories = [
  { id: 'survival', name: '生存' },
  { id: 'love', name: '愛・所属' },
  { id: 'power', name: '力' },
  { id: 'freedom', name: '自由' },
  { id: 'fun', name: '楽しみ' }
];

// サブカテゴリーの定義
const subCategories = [
  { id: 'safety', name: '安全・安定', mainCategory: 'survival' },
  { id: 'health', name: '健康', mainCategory: 'survival' },
  { id: 'love', name: '愛', mainCategory: 'love' },
  { id: 'belonging', name: '所属', mainCategory: 'love' },
  { id: 'achievement', name: '達成', mainCategory: 'power' },
  { id: 'recognition', name: '承認', mainCategory: 'power' },
  { id: 'language', name: '言語', mainCategory: 'power' },
  { id: 'competition', name: '競争', mainCategory: 'power' },
  { id: 'release', name: '解放', mainCategory: 'freedom' },
  { id: 'change', name: '変化', mainCategory: 'freedom' },
  { id: 'preference', name: 'こだわり', mainCategory: 'freedom' },
  { id: 'humor', name: 'ユーモア', mainCategory: 'fun' },
  { id: 'curiosity', name: '好奇心', mainCategory: 'fun' },
  { id: 'learning', name: '学習・成長', mainCategory: 'fun' },
  { id: 'creativity', name: '創造性', mainCategory: 'fun' }
];

// 測定視点の定義
const perspectives = [
  { id: 'desire', name: '欲求' },
  { id: 'effort', name: '注力' },
  { id: 'reality', name: '現実' }
];

// 質問項目の定義
const questions = [
  // 1. 生存 - 安全・安定
  // 欲求
  {
    id: 1,
    text: '私にとって、安全で予測可能な環境で生活することは非常に重要だ。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'desire'
  },
  {
    id: 2,
    text: '経済的な安定は私の人生において最優先事項の一つだ。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'desire'
  },
  {
    id: 3,
    text: '日常生活におけるリスクや危険を最小限に抑えたいと思う。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'desire'
  },
  // 注力
  {
    id: 4,
    text: '私は将来の安全と安定のために時間とエネルギーを費やしている。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'effort'
  },
  {
    id: 5,
    text: '予期せぬ事態に備えて、定期的に準備や対策を行っている。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'effort'
  },
  {
    id: 6,
    text: '経済的な安定を確保するために努力している。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'effort'
  },
  // 現実
  {
    id: 7,
    text: '現在の私の生活環境は十分に安全で安定していると感じる。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'reality'
  },
  {
    id: 8,
    text: '私の経済状況は安定しており、将来に対する不安は少ない。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'reality'
  },
  {
    id: 9,
    text: '予測できない状況や変化に対して、十分な備えができていると感じる。',
    mainCategory: 'survival',
    subCategory: 'safety',
    perspective: 'reality'
  },

 // 2. 生存 - 健康
  // 欲求
  {
    id: 10,
    text: '健康であることは私にとって最も重要な価値の一つだ。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'desire'
  },
  {
    id: 11,
    text: '心身の健康状態を維持・向上させたいという強い願望がある。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'desire'
  },
  {
    id: 12,
    text: '体調不良や病気にならないよう、予防したいと常に考えている。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'desire'
  },
  // 注力
  {
    id: 13,
    text: '健康を維持するために、規則正しい生活習慣を意識している。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'effort'
  },
  {
    id: 14,
    text: '栄養バランスの取れた食事を心がけている。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'effort'
  },
  {
    id: 15,
    text: '適度な運動や体を動かす機会を取り入れるよう努力している。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'effort'
  },
  // 現実
  {
    id: 16,
    text: '現在の自分の健康状態に満足している。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'reality'
  },
  {
    id: 17,
    text: '必要な時に適切な医療やケアを受けられる環境にある。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'reality'
  },
  {
    id: 18,
    text: '自分の健康を管理するための知識と手段を十分に持っている。',
    mainCategory: 'survival',
    subCategory: 'health',
    perspective: 'reality'
  },
  
  // 3. 愛・所属 - 愛
  // 欲求
  {
    id: 19,
    text: '他者から愛され、大切にされることを強く望んでいる。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'desire'
  },
  {
    id: 20,
    text: '親密な関係や深い絆を持つことは私にとって非常に重要だ。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'desire'
  },
  {
    id: 21,
    text: '愛情表現を受けたり、与えたりすることへの欲求が強い。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'desire'
  },
  // 注力
  {
    id: 22,
    text: '大切な人との関係を育み、深めるために努力している。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'effort'
  },
  {
    id: 23,
    text: '愛情や感謝の気持ちを積極的に表現するようにしている。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'effort'
  },
  {
    id: 24,
    text: '親密な関係を維持するために、時間とエネルギーを投資している。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'effort'
  },
  // 現実
  {
    id: 25,
    text: '現在、十分に愛されていると感じている。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'reality'
  },
  {
    id: 26,
    text: '信頼できる親密な関係が一つ以上ある。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'reality'
  },
  {
    id: 27,
    text: '自分の愛情表現が相手に伝わり、受け入れられていると感じる。',
    mainCategory: 'love',
    subCategory: 'love',
    perspective: 'reality'
  },
  
  // 4. 愛・所属 - 所属
  // 欲求
  {
    id: 28,
    text: 'グループや集団に所属し、一員として認められたいという欲求が強い。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'desire'
  },
  {
    id: 29,
    text: '共通の興味や価値観を持つ人々とつながりたいと思う。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'desire'
  },
  {
    id: 30,
    text: '孤立や疎外感を避け、どこかに帰属していたいという気持ちが強い。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'desire'
  },
  // 注力
  {
    id: 31,
    text: '所属しているグループやコミュニティに積極的に参加している。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'effort'
  },
  {
    id: 32,
    text: '新しい人間関係やつながりを築くために行動している。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'effort'
  },
  {
    id: 33,
    text: '所属意識を高めるための活動や交流に時間を使っている。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'effort'
  },
  // 現実
  {
    id: 34,
    text: '自分の居場所だと感じられるコミュニティや集団に属している。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'reality'
  },
  {
    id: 35,
    text: '所属しているグループ内で受け入れられ、価値ある存在だと感じる。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'reality'
  },
  {
    id: 36,
    text: '必要なときにサポートを得られる人間関係のネットワークがある。',
    mainCategory: 'love',
    subCategory: 'belonging',
    perspective: 'reality'
  },
  
  // 5. 力 - 達成
  // 欲求
  {
    id: 37,
    text: '目標を達成し、成功を収めることへの欲求が強い。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'desire'
  },
  {
    id: 38,
    text: '自分の可能性を最大限に発揮したいという願望がある。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'desire'
  },
  {
    id: 39,
    text: '自分の能力や才能を活かして成果を出したいという意欲が強い。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'desire'
  },
  // 注力
  {
    id: 40,
    text: '明確な目標を設定し、その達成に向けて努力している。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'effort'
  },
  {
    id: 41,
    text: '自分の能力や専門性を高めるために継続的に取り組んでいる。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'effort'
  },
  {
    id: 42,
    text: '困難な課題にも粘り強く取り組み、諦めない姿勢を持っている。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'effort'
  },
  // 現実
  {
    id: 43,
    text: '自分の達成した成果や実績に満足している。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'reality'
  },
  {
    id: 44,
    text: '設定した目標に対して、着実に前進していると感じる。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'reality'
  },
  {
    id: 45,
    text: '自分の能力を十分に発揮できる機会や環境がある。',
    mainCategory: 'power',
    subCategory: 'achievement',
    perspective: 'reality'
  },
  
  // 6. 力 - 承認
  // 欲求
  {
    id: 46,
    text: '他者から認められ、評価されることを強く望んでいる。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'desire'
  },
  {
    id: 47,
    text: '自分の貢献や努力が周囲に認識されることは非常に重要だ。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'desire'
  },
  {
    id: 48,
    text: '社会的な地位や評判を気にする傾向がある。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'desire'
  },
  // 注力
  {
    id: 49,
    text: '他者からの良い評価を得るために行動や言動に気を配っている。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'effort'
  },
  {
    id: 50,
    text: '自分の成果や能力をアピールする機会を意識的に作っている。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'effort'
  },
  {
    id: 51,
    text: '社会的な評価や地位を高めるための努力をしている。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'effort'
  },
  // 現実
  {
    id: 52,
    text: '周囲の人から適切に評価され、認められていると感じる。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'reality'
  },
  {
    id: 53,
    text: '自分の意見や提案が尊重され、重視されていると実感できる。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'reality'
  },
  {
    id: 54,
    text: '社会的な立場や評価に満足している。',
    mainCategory: 'power',
    subCategory: 'recognition',
    perspective: 'reality'
  },
  
  // 7. 力 - 言語
  // 欲求
  {
    id: 55,
    text: '自分の考えや感情を言葉で適切に表現したいという欲求が強い。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'desire'
  },
  {
    id: 56,
    text: '話し言葉や書き言葉を通じて影響力を持ちたいと思う。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'desire'
  },
  {
    id: 57,
    text: '言語能力を高め、洗練された表現ができるようになりたい。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'desire'
  },
  // 注力
  {
    id: 58,
    text: '言語スキルを向上させるために読書や学習に取り組んでいる。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'effort'
  },
  {
    id: 59,
    text: '会話や文章で自分の意見を効果的に伝えるよう心がけている。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'effort'
  },
  {
    id: 60,
    text: '語彙力や表現力を高めるための活動に時間を費やしている。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'effort'
  },
  // 現実
  {
    id: 61,
    text: '自分の言語能力や表現力に満足している。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'reality'
  },
  {
    id: 62,
    text: '言葉を通じて自分の考えや感情を十分に伝えられていると感じる。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'reality'
  },
  {
    id: 63,
    text: '言語によるコミュニケーションで困難を感じることは少ない。',
    mainCategory: 'power',
    subCategory: 'language',
    perspective: 'reality'
  },
  
  // 8. 力 - 競争
  // 欲求
  {
    id: 64,
    text: '競争に勝ち、優位に立ちたいという欲求がある。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'desire'
  },
  {
    id: 65,
    text: '自分の能力や成果を他者と比較することがよくある。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'desire'
  },
  {
    id: 66,
    text: '競争的な状況に魅力を感じる。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'desire'
  },
  // 注力
  {
    id: 67,
    text: '競争で優位に立つために必要なスキルや知識を磨いている。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'effort'
  },
  {
    id: 68,
    text: '他者より優れた成果を出すために努力している。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'effort'
  },
  {
    id: 69,
    text: '競争的な場面で勝つための戦略や戦術を考えることがある。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'effort'
  },
  // 現実
  {
    id: 70,
    text: '競争的な状況で満足のいく結果を得ていると感じる。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'reality'
  },
  {
    id: 71,
    text: '他者と比較して、自分の立ち位置に満足している。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'reality'
  },
  {
    id: 72,
    text: '競争において自分の能力を発揮できる環境にある。',
    mainCategory: 'power',
    subCategory: 'competition',
    perspective: 'reality'
  },
  
  // 9. 自由 - 解放
  // 欲求
  {
    id: 73,
    text: '束縛や制約から解放されて自由に行動したいという欲求が強い。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'desire'
  },
  {
    id: 74,
    text: '自分のペースで物事を進めたいと強く思う。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'desire'
  },
  {
    id: 75,
    text: '過度な義務や責任から解放されたいと感じることがある。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'desire'
  },
  // 注力
  {
    id: 76,
    text: '自分の自由を確保するために境界線を設定している。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'effort'
  },
  {
    id: 77,
    text: '束縛を感じる状況や関係を避けるよう意識している。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'effort'
  },
  {
    id: 78,
    text: '自分の時間や空間を確保するための行動を取っている。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'effort'
  },
  // 現実
  {
    id: 79,
    text: '現在の生活において十分な自由を感じている。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'reality'
  },
  {
    id: 80,
    text: '不必要な束縛や制約から解放されていると感じる。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'reality'
  },
  {
    id: 81,
    text: '自分の意思で行動を選択できる環境にあると思う。',
    mainCategory: 'freedom',
    subCategory: 'release',
    perspective: 'reality'
  },
  
  // 10. 自由 - 変化
  // 欲求
  {
    id: 82,
    text: '新しい経験や変化を求める気持ちが強い。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'desire'
  },
  {
    id: 83,
    text: '日常の単調さを破り、刺激のある体験をしたいと思う。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'desire'
  },
  {
    id: 84,
    text: '新しい環境や状況に身を置きたいという欲求がある。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'desire'
  },
  // 注力
  {
    id: 85,
    text: '日常に変化や新しさを取り入れる工夫をしている。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'effort'
  },
  {
    id: 86,
    text: '新しい経験や挑戦の機会を積極的に探している。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'effort'
  },
  {
    id: 87,
    text: '自分の行動パターンや環境を意識的に変えるよう努力している。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'effort'
  },
  // 現実
  {
    id: 88,
    text: '現在の生活に十分な変化や刺激があると感じる。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'reality'
  },
  {
    id: 89,
    text: '新しい経験や挑戦をする機会が十分にある。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'reality'
  },
  {
    id: 90,
    text: '生活の中で多様性や変化を楽しめていると思う。',
    mainCategory: 'freedom',
    subCategory: 'change',
    perspective: 'reality'
  },
  
  // 11. 自由 - こだわり
  // 欲求
  {
    id: 91,
    text: '自分の価値観やこだわりに従って生きたいという欲求が強い。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'desire'
  },
  {
    id: 92,
    text: '自分らしさを表現することに高い価値を置いている。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'desire'
  },
  {
    id: 93,
    text: '他者の基準や期待に合わせるのではなく、自分の選択を優先したい。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'desire'
  },
  // 注力
  {
    id: 94,
    text: '自分の価値観や好みを明確にするよう心がけている。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'effort'
  },
  {
    id: 95,
    text: '自分らしさを表現するための方法や手段を探っている。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'effort'
  },
  {
    id: 96,
    text: '自分のこだわりを大切にするための選択や決断をしている。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'effort'
  },
  // 現実
  {
    id: 97,
    text: '現在、自分らしく生きられていると感じる。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'reality'
  },
  {
    id: 98,
    text: '自分のこだわりや好みを尊重できる環境にある。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'reality'
  },
  {
    id: 99,
    text: '自分の価値観に沿った選択や決断ができていると思う。',
    mainCategory: 'freedom',
    subCategory: 'preference',
    perspective: 'reality'
  },
  
  // 12. 楽しみ - ユーモア
  // 欲求
  {
    id: 100,
    text: '笑いや楽しさを日常的に感じたいという欲求が強い。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'desire'
  },
  {
    id: 101,
    text: 'ユーモアのセンスを持ち、それを表現したいと思う。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'desire'
  },
  {
    id: 102,
    text: '遊び心や楽しさを人生の中で重視している。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'desire'
  },
  // 注力
  {
    id: 103,
    text: '生活に笑いや楽しさをもたらすために意識的に行動している。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'effort'
  },
  {
    id: 104,
    text: 'ユーモアを理解し、表現する能力を高めるよう努めている。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'effort'
  },

    // 12. 楽しみ - ユ
  // ーモア (続き)
  {
    id: 105,
    text: '楽しい時間や経験を作り出すために工夫している。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'effort'
  },
  // 現実
  {
    id: 106,
    text: '現在の生活には十分な笑いや楽しさがあると感じる。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'reality'
  },
  {
    id: 107,
    text: '周りの人とユーモアを共有する機会が多くある。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'reality'
  },
  {
    id: 108,
    text: '楽しい瞬間を十分に味わえていると思う。',
    mainCategory: 'fun',
    subCategory: 'humor',
    perspective: 'reality'
  },

  // 13. 楽しみ - 好奇心
  // 欲求
  {
    id: 109,
    text: '新しいことや未知のものに対する強い好奇心がある。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'desire'
  },
  {
    id: 110,
    text: '様々な事柄について知りたい、理解したいという欲求が強い。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'desire'
  },
  {
    id: 111,
    text: '探求や発見の過程に喜びを感じる。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'desire'
  },
  // 注力
  {
    id: 112,
    text: '好奇心を満たすために積極的に情報を集めている。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'effort'
  },
  {
    id: 113,
    text: '興味のある分野について深く掘り下げるために時間を使っている。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'effort'
  },
  {
    id: 114,
    text: '新しい発見や理解を得るための活動に取り組んでいる。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'effort'
  },
  // 現実
  {
    id: 115,
    text: '現在、好奇心を満たす十分な機会があると感じる。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'reality'
  },
  {
    id: 116,
    text: '興味のあることを探求する自由と資源を持っていると思う。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'reality'
  },
  {
    id: 117,
    text: '知的な刺激や発見の喜びに満ちた環境にいると感じる。',
    mainCategory: 'fun',
    subCategory: 'curiosity',
    perspective: 'reality'
  },

  // 14. 楽しみ - 学習・成長
  // 欲求
  {
    id: 118,
    text: '継続的に学び、成長することに強い価値を置いている。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'desire'
  },
  {
    id: 119,
    text: '自分の知識やスキルを常に向上させたいという欲求がある。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'desire'
  },
  {
    id: 120,
    text: '自己啓発や自己改善に強い関心がある。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'desire'
  },
  // 注力
  {
    id: 121,
    text: '学習や自己成長のために定期的に時間を投資している。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'effort'
  },
  {
    id: 122,
    text: '新しいスキルや知識を習得するための具体的な行動を取っている。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'effort'
  },
  {
    id: 123,
    text: '自分の能力を伸ばすための挑戦を積極的に受け入れている。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'effort'
  },
  // 現実
  {
    id: 124,
    text: '現在、十分に学び、成長できる環境にいると感じる。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'reality'
  },
  {
    id: 125,
    text: '自分の学習や成長のペースに満足している。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'reality'
  },
  {
    id: 126,
    text: '知識やスキルが着実に向上していると実感できる。',
    mainCategory: 'fun',
    subCategory: 'learning',
    perspective: 'reality'
  },

  // 15. 楽しみ - 創造性
  // 欲求
  {
    id: 127,
    text: '創造的な活動や表現に強い関心がある。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'desire'
  },
  {
    id: 128,
    text: '新しいアイデアを生み出したり、物事を創造したりすることに喜びを感じる。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'desire'
  },
  {
    id: 129,
    text: '独自の視点や発想を持つことを重視している。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'desire'
  },
  // 注力
  {
    id: 130,
    text: '創造的な活動に定期的に時間とエネルギーを費やしている。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'effort'
  },
  {
    id: 131,
    text: '自分の創造性を高めるための方法を意識的に探している。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'effort'
  },
  {
    id: 132,
    text: '独創的なアイデアや作品を生み出すために努力している。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'effort'
  },
  // 現実
  {
    id: 133,
    text: '現在、自分の創造性を十分に発揮できていると感じる。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'reality'
  },
  {
    id: 134,
    text: '創造的な活動に取り組む機会が十分にあると思う。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'reality'
  },

  {
    id: 135,
    text: '自分の創造的な表現や成果に満足している。',
    mainCategory: 'fun',
    subCategory: 'creativity',
    perspective: 'reality'
  }
];

// エクスポート
export { mainCategories, subCategories, perspectives, questions };
