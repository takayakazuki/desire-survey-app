import React, { useState, useEffect, useRef } from 'react';
import ResultsChart from '../components/ResultsChart';
import AnalysisReport from '../components/AnalysisReport';
import { analyzeProfile, generateRecommendations } from '../utils/calculationUtils';
import { mainCategories, subCategories, perspectives, questions } from '../utils/surveyData';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 結果表示ページコンポーネント
 * @param {Object} props
 * @param {Array} props.answers - 回答データ
 * @param {Function} props.onRetake - 再受検ボタンクリック時のコールバック
 */
const ResultsPage = ({ answers, onRetake }) => {
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('main'); // 'main', 'sub', 'report'
  const reportRef = useRef(null);

  // 結果の分析
  useEffect(() => {
    if (answers && answers.length > 0) {
      const surveyData = { mainCategories, subCategories, perspectives, questions };
      const profileAnalysis = analyzeProfile(answers, surveyData);
      setAnalysis(profileAnalysis);
      
      const generatedRecommendations = generateRecommendations(profileAnalysis);
      setRecommendations(generatedRecommendations);
    }
  }, [answers]);

  // 分析結果がまだ準備できていない場合
  if (!analysis) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">分析中...</p>
        </div>
      </div>
    );
  }

  // PDFとして保存
  const handleSavePDF = async () => {
    try {
      const content = reportRef.current;
      if (!content) {
        alert('レポートを読み込めません');
        return;
      }

      // 進捗通知
      const progressNotification = document.createElement('div');
      progressNotification.innerText = 'PDFを生成中...';
      progressNotification.style.position = 'fixed';
      progressNotification.style.top = '50%';
      progressNotification.style.left = '50%';
      progressNotification.style.transform = 'translate(-50%, -50%)';
      progressNotification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      progressNotification.style.color = 'white';
      progressNotification.style.padding = '15px 20px';
      progressNotification.style.borderRadius = '5px';
      progressNotification.style.zIndex = '9999';
      document.body.appendChild(progressNotification);

      // 一時的にタブを切り替えてすべての内容を含める
      const originalTab = activeTab;
      
      // 各タブの内容を順番にキャプチャ
      const captureTab = async (tabName) => {
        setActiveTab(tabName);
        await new Promise(resolve => setTimeout(resolve, 100)); // レンダリング待機
        
        const tabContent = document.getElementById(`tab-${tabName}`);
        return await html2canvas(tabContent, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
      };
      
      const mainCanvas = await captureTab('main');
      const subCanvas = await captureTab('sub');
      const reportCanvas = await captureTab('report');
      
      // 元のタブに戻す
      setActiveTab(originalTab);
      
      // PDF作成
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // タイトルの追加
      pdf.setFontSize(16);
      pdf.text('選択理論心理学 15サブカテゴリー欲求サーベイ 結果', pageWidth / 2, 15, { align: 'center' });
      pdf.setFontSize(10);
      pdf.text(`作成日: ${new Date().toLocaleDateString()}`, pageWidth / 2, 20, { align: 'center' });
      
      // 各キャンバスをPDFに追加
      const addCanvasToPdf = (canvas, title, yPosition) => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth - 20; // 左右マージン
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        
        if (yPosition > 20) {
          pdf.addPage();
          yPosition = 15;
        }
        
        pdf.setFontSize(14);
        pdf.text(title, 10, yPosition);
        pdf.addImage(imgData, 'PNG', 10, yPosition + 5, imgWidth, imgHeight);
        
        return yPosition + imgHeight + 15;
      };
      
      let yPos = 25;
      yPos = addCanvasToPdf(mainCanvas, '基本的欲求分析', yPos);
      yPos = addCanvasToPdf(subCanvas, 'サブカテゴリー分析', 15); // 新ページ
      yPos = addCanvasToPdf(reportCanvas, '分析レポート', 15); // 新ページ
      
      // PDF保存
      pdf.save(`欲求サーベイ結果_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
      
      // 通知を削除
      document.body.removeChild(progressNotification);
    } catch (error) {
      alert('PDFの保存中にエラーが発生しました');
      console.error('Error saving PDF:', error);
    }
  };

  // HTMLとして保存
  const handleSaveHTML = () => {
    try {
      // HTML としてエクスポート
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>欲求サーベイ結果</title>
          <style>
            body { font-family: sans-serif; margin: 0; padding: 20px; }
            h1, h2, h3 { color: #333; }
            .container { max-width: 800px; margin: 0 auto; }
            .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            .item { margin-bottom: 10px; }
            .bar-container { height: 20px; background-color: #eee; border-radius: 10px; margin-top: 5px; }
            .bar { height: 20px; border-radius: 10px; }
            .desire { background-color: #3b82f6; }
            .effort { background-color: #eab308; }
            .reality { background-color: #a855f7; }
            .label { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 2px; }
            .category { font-weight: bold; }
            .date { text-align: right; color: #666; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>選択理論心理学 15サブカテゴリー欲求サーベイ 結果</h1>
            <div class="date">作成日: ${new Date().toLocaleDateString()}</div>
            
            <div class="section">
              <h2>基本的欲求分析</h2>
              ${analysis.mainCategoryAnalysis.map(item => `
                <div class="item">
                  <div class="category">${item.name}</div>
                  <div class="label"><span>欲求</span><span>${item.desireScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar desire" style="width: ${item.desireScore}%;"></div></div>
                  <div class="label"><span>注力</span><span>${item.effortScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar effort" style="width: ${item.effortScore}%;"></div></div>
                  <div class="label"><span>現実</span><span>${item.realityScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar reality" style="width: ${item.realityScore}%;"></div></div>
                </div>
              `).join('')}
            </div>
            
            <div class="section">
              <h2>サブカテゴリー分析</h2>
              ${analysis.subCategoryAnalysis.map(item => `
                <div class="item">
                  <div class="category">${item.mainCategoryName} - ${item.name}</div>
                  <div class="label"><span>欲求</span><span>${item.desireScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar desire" style="width: ${item.desireScore}%;"></div></div>
                  <div class="label"><span>注力</span><span>${item.effortScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar effort" style="width: ${item.effortScore}%;"></div></div>
                  <div class="label"><span>現実</span><span>${item.realityScore.toFixed(1)}</span></div>
                  <div class="bar-container"><div class="bar reality" style="width: ${item.realityScore}%;"></div></div>
                </div>
              `).join('')}
            </div>
            
            <div class="section">
              <h2>分析レポート</h2>
              <h3>主要な特徴</h3>
              ${analysis.maxDesireSubCategory ? `
                <p><strong>最も強い欲求:</strong> ${analysis.maxDesireSubCategory.mainCategoryName} - ${analysis.maxDesireSubCategory.name} (${analysis.maxDesireSubCategory.desireScore.toFixed(1)}点)</p>
              ` : ''}
              
              ${analysis.maxGapSubCategory && Math.abs(analysis.maxGapSubCategory.gap) > 10 ? `
                <p><strong>欲求と現実のギャップが大きい領域:</strong> ${analysis.maxGapSubCategory.mainCategoryName} - ${analysis.maxGapSubCategory.name} (差: ${analysis.maxGapSubCategory.gap.toFixed(1)}点)</p>
              ` : ''}
              
              <h3>推奨アクション</h3>
              <ul>
                ${recommendations.map(rec => `<li><strong>${rec.category}:</strong> ${rec.text}</li>`).join('')}
              </ul>
            </div>
          </div>
        </body>
        </html>
      `;

      // Blob を作成してダウンロードリンクを生成
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `欲求サーベイ結果_${new Date().toLocaleDateString().replace(/\//g, '-')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('HTMLの保存中にエラーが発生しました');
      console.error('Error saving HTML:', error);
    }
  };

  // 回答数の確認
  const totalQuestionsCount = questions.length;
  const answeredQuestionsCount = answers.length;
  const completionRate = (answeredQuestionsCount / totalQuestionsCount) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" ref={reportRef}>
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
        サーベイ結果
      </h1>
      <p className="text-center text-gray-600 mb-4">
        選択理論心理学に基づく15サブカテゴリー欲求分析
      </p>
      
      {/* 回答率の表示 */}
      <div className={`text-center mb-4 p-2 rounded-lg ${
        completionRate < 25 ? 'bg-red-100 text-red-700' : 
        completionRate < 50 ? 'bg-yellow-100 text-yellow-700' : 
        'bg-green-100 text-green-700'
      }`}>
        <p className="font-medium">
          回答率: {completionRate.toFixed(1)}% ({answeredQuestionsCount}/{totalQuestionsCount}問)
        </p>
        {completionRate < 50 && (
          <p className="text-sm mt-1">
            回答率が低いため、結果の正確性が低下している可能性があります。より正確な結果を得るには、より多くの質問に回答してください。
          </p>
        )}
      </div>
      
      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'main'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('main')}
        >
          基本的欲求
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'sub'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('sub')}
        >
          サブカテゴリー
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'report'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('report')}
        >
          分析レポート
        </button>
      </div>
      
      {/* タブコンテンツ */}
      <div className="mb-8">
        <div id="tab-main" style={{ display: activeTab === 'main' ? 'block' : 'none' }}>
          {activeTab === 'main' && (
            <ResultsChart
              data={analysis.mainCategoryAnalysis}
              title="5つの基本的欲求分析"
            />
          )}
        </div>
        
        <div id="tab-sub" style={{ display: activeTab === 'sub' ? 'block' : 'none' }}>
          {activeTab === 'sub' && (
            <ResultsChart
              data={analysis.subCategoryAnalysis}
              title="15サブカテゴリー欲求分析"
              isSubCategory={true}
            />
          )}
        </div>
        
        <div id="tab-report" style={{ display: activeTab === 'report' ? 'block' : 'none' }}>
          {activeTab === 'report' && (
            <AnalysisReport
              analysis={analysis}
              recommendations={recommendations}
            />
          )}
        </div>
      </div>
      
      {/* アクションボタン */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={handleSavePDF}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          PDFで保存
        </button>
        
        <button
          onClick={handleSaveHTML}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
          HTMLで保存
        </button>
        
        <button
          onClick={onRetake}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          再度回答する
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
