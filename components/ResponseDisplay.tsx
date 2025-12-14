import React, { useState } from 'react';
import { GeneratedResponse } from '../types';
import { Copy, Check, Mail, Paperclip, DollarSign, FileText, Send } from 'lucide-react';

interface ResponseDisplayProps {
  data: GeneratedResponse;
  onReset: () => void;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ data, onReset }) => {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const copyToClipboard = (text: string, isSubject: boolean) => {
    navigator.clipboard.writeText(text);
    if (isSubject) {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: currency }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">제안된 회신 내용</h2>
        <button 
          onClick={onReset}
          className="text-sm text-slate-500 hover:text-slate-800 underline underline-offset-4"
        >
          새로운 문의 작성하기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Email Draft */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>이메일 초안</span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Subject Line */}
              <div className="group relative">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">제목</label>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-800 flex-grow">{data.emailSubject}</span>
                  <button 
                    onClick={() => copyToClipboard(data.emailSubject, true)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="제목 복사"
                  >
                    {copiedSubject ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="group relative">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">내용</label>
                <div className="relative">
                  <textarea 
                    readOnly
                    value={data.emailBody}
                    className="w-full h-96 p-4 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button 
                    onClick={() => copyToClipboard(data.emailBody, false)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-colors bg-white shadow-sm border border-slate-100"
                    title="본문 복사"
                  >
                    {copiedBody ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                <Send className="w-4 h-4" />
                <span>메일 클라이언트로 열기</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Estimate & Attachments */}
        <div className="space-y-6">
          
          {/* Estimate Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-900 font-medium">예상 견적 제안</span>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-500 mb-1">제안 예산 범위</p>
                <div className="text-2xl font-bold text-slate-800">
                  {formatCurrency(data.estimateLow, data.currency)} <br/>
                  <span className="text-slate-400 text-lg font-normal">~</span> <br/>
                  {formatCurrency(data.estimateHigh, data.currency)}
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">산출 근거</p>
                <p className="text-sm text-slate-600 leading-snug">{data.pricingRationale}</p>
              </div>
            </div>
          </div>

          {/* Attachments Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-800 font-medium">추천 첨부파일</span>
            </div>
            <div className="divide-y divide-slate-100">
              {data.suggestedAttachments.map((file, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-800 text-sm">{file.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded uppercase font-bold tracking-wide">
                          {file.fileType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{file.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 text-xs text-center text-slate-400">
              위 파일들을 미리 준비하여 회신에 첨부하세요.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResponseDisplay;
