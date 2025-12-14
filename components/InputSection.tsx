import React, { useState } from 'react';
import { Sparkles, MessageSquareQuote } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
    }
  };

  const samplePrompts = [
    "새로 출시하는 화장품 브랜드의 인스타그램 인플루언서 마케팅 견적 문의합니다. 예산은 1000만원 정도이고 20대 여성이 타겟입니다.",
    "B2B SaaS 솔루션 검색 광고 대행 문의드립니다. 월 예산은 미정이고 ROAS 최적화가 목표입니다. 제안서 부탁드려요.",
    "유튜브 브랜디드 콘텐츠 영상 제작 단가가 궁금합니다. 10분 내외 예능형 콘텐츠로 3편 정도 생각중입니다."
  ];

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200 p-1">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">어떤 문의가 들어왔나요?</h2>
              <p className="text-slate-500 text-sm mt-0.5">광고주의 문의 내용을 그대로 붙여넣으세요. AI가 최적의 답변을 생성합니다.</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-800 placeholder:text-slate-400 text-base leading-relaxed"
              placeholder="예: 이번에 새로 런칭하는 모바일 게임 마케팅 대행사를 찾고 있습니다. 구글 UAC랑 유튜브 광고 집행 예정이고 월 예산은 5천만원입니다..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            {inputText.length > 0 && (
              <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium">
                {inputText.length}자
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex-1 w-full sm:w-auto overflow-hidden">
               {/* Hidden on small screens if needed, or structured differently */}
             </div>
             
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`
                group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 transition-all w-full sm:w-auto
                ${isLoading || !inputText.trim() 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-blue-600/30 active:translate-y-0'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>분석 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  <span>AI 답변 생성하기</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Quick Samples Section */}
        <div className="bg-slate-50 p-4 md:p-6 rounded-b-xl border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">빠른 예시 입력</p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(prompt)}
                disabled={isLoading}
                className="text-xs text-left px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
              >
                {prompt.length > 35 ? prompt.substring(0, 35) + "..." : prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
