import React, { useState } from 'react';
import { generateClientReply } from './services/geminiService';
import { AnalysisState, GeneratedResponse } from './types';
import InputSection from './components/InputSection';
import ResponseDisplay from './components/ResponseDisplay';
import { Bot, Info } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const handleGenerate = async (text: string) => {
    setAnalysis({ isLoading: true, data: null, error: null });
    try {
      const result = await generateClientReply(text);
      setAnalysis({
        isLoading: false,
        data: result,
        error: null,
      });
    } catch (error) {
      setAnalysis({
        isLoading: false,
        data: null,
        error: "답변을 생성하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  const handleReset = () => {
    setAnalysis({ isLoading: false, data: null, error: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Ki's Smart AI Reply Pro
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
             <span className="flex items-center gap-1">
               <Info className="w-4 h-4" />
               AI Powered Agency Assistant
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Error Message */}
          {analysis.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3 animate-fade-in">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              {analysis.error}
            </div>
          )}

          {/* Logic Switch: Show Input OR Result */}
          {!analysis.data ? (
            <div className="flex flex-col items-center justify-center py-10 lg:py-20 space-y-8 animate-fade-in-up">
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  광고주 문의, <br className="sm:hidden" />
                  <span className="text-blue-600">3초 만에 회신</span>하세요
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed">
                  문의 내용을 입력하면 전문적인 이메일 답변, 예상 견적 산출, <br className="hidden sm:inline" />
                  그리고 함께 보내면 좋은 포트폴리오 자료까지 AI가 제안해 드립니다.
                </p>
              </div>
              
              <InputSection 
                onSubmit={handleGenerate} 
                isLoading={analysis.isLoading} 
              />

              {/* Feature Grid (Decoration) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 w-full max-w-4xl opacity-60">
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                     <span className="text-xl font-bold">1</span>
                   </div>
                   <h3 className="font-semibold text-slate-800">이메일 작성</h3>
                   <p className="text-sm text-slate-500">격식있는 비즈니스 화법</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-1">
                     <span className="text-xl font-bold">2</span>
                   </div>
                   <h3 className="font-semibold text-slate-800">견적 제안</h3>
                   <p className="text-sm text-slate-500">문의 내용 기반 자동 산출</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
                     <span className="text-xl font-bold">3</span>
                   </div>
                   <h3 className="font-semibold text-slate-800">자료 추천</h3>
                   <p className="text-sm text-slate-500">첨부할 파일 목록 큐레이션</p>
                </div>
              </div>
            </div>
          ) : (
            <ResponseDisplay 
              data={analysis.data} 
              onReset={handleReset} 
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ki's Smart AI Reply Pro. Powered by Google Gemini 2.5 Flash.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;