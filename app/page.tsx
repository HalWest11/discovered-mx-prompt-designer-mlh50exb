'use client';

import { useState } from 'react';

// Types
interface PromptVariant {
  id: string;
  name: string;
  content: string;
  confidence: number;
}

interface TestResult {
  score: number;
  status: 'success' | 'error';
  latency: number;
}

export default function Home() {
  // State
  const [taskContext, setTaskContext] = useState('');
  const [role, setRole] = useState('Senior Frontend Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const [variants, setVariants] = useState<PromptVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<PromptVariant | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Handlers
  const handleGenerate = async () => {
    if (!taskContext.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI Processing delay
    setTimeout(() => {
      const mockVariants: PromptVariant[] = [
        {
          id: '1',
          name: 'Direct & Efficient',
          content: `You are a ${role}. Your task is to execute the following based on context: "${taskContext}". \n\nRequirements: \n1. Optimize for code generation speed.\n2. Ensure error handling is minimal.\n3. Return the result in markdown code blocks.`,
          confidence: 0.92
        },
        {
          id: '2',
          name: 'Analytical & Safe',
          content: `Act as a ${role}. Analyze this context: "${taskContext}". \n\nConsider the following constraints:\n- Maintain high code quality standards.\n- Review for potential bugs.\n- Provide a step-by-step solution before execution.`,
          confidence: 0.88
        },
        {
          id: '3',
          name: 'Creative Assistant',
          content: `You are an expert ${role} helping design an AI workflow. Context: "${taskContext}". \n\nApproach:\n- Think outside the box.\n- Propose innovative solutions.\n- Focus on scalability.`,
          confidence: 0.85
        }
      ];
      
      setVariants(mockVariants);
      setSelectedVariant(mockVariants[0]);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleTest = async () => {
    if (!selectedVariant) return;

    setIsTesting(true);
    
    // Simulate API Testing delay
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * (99 - 80) + 80);
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      setTestResult({
        score: mockScore,
        status: isSuccess ? 'success' : 'error',
        latency: Math.floor(Math.random() * 500) + 100
      });
      setIsTesting(false);
    }, 1200);
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            M
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              MX Prompt Designer
            </h1>
            <p className="text-sm text-slate-500">
              Multi-Agent Prompt Orchestration Suite
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Active
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        
        {/* Left Column: Input & Controls */}
        <section className="lg:col-span-4 flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Role Persona
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                placeholder="e.g. Senior Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Task Context
              </label>
              <textarea 
                value={taskContext}
                onChange={(e) => setTaskContext(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none"
                placeholder="Describe the workflow requirements, constraints, and goals here..."
              />
              <div className="mt-2 flex justify-end">
                <button 
                  onClick={handleGenerate}
                  disabled={isAnalyzing}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${isAnalyzing 
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                      : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                    }`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Generate Variants
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* History / Saved Prompts (Mock) */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Sessions</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-primary-200 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-700 truncate">SQL Query Optimizer</p>
                <p className="text-xs text-slate-400 mt-1">2 mins ago</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-primary-200 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-700 truncate">Bug Fixing Logic</p>
                <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Editor & Dashboard */}
        <section className="lg:col-span-8 flex flex-col gap-4 h-full overflow-hidden">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-8 rounded-full ${selectedVariant ? 'bg-secondary-500' : 'bg-slate-300'}`}></div>
              <div>
                <h2 className="font-bold text-slate-800">Prompt Editor</h2>
                <p className="text-xs text-slate-500">
                  {selectedVariant ? selectedVariant.name : 'Select a variant to edit'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Copy
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                History
              </button>
            </div>
          </div>

          {/* Prompt Area */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden flex flex-col relative">
            {variants.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all
                          ${selectedVariant?.id === variant.id 
                            ? 'bg-secondary-50 border-secondary-200 text-secondary-700' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                      >
                        {variant.name}
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-500">
                          {Math.round(variant.confidence * 100)}%
                        </span>
                      </button>
                    ))}
                  </div>
                  <textarea 
                    readOnly
                    value={selectedVariant?.content || ''}
                    className="w-full h-full min-h-[300px] p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm font-mono text-slate-700 leading-relaxed resize-none focus:outline-none"
                  />
                </div>
                
                {/* Action Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Length: {selectedVariant?.content.length} chars</span>
                    <span>Complexity: {Math.round(selectedVariant?.confidence * 100)}</span>
                  </div>
                  <button 
                    onClick={handleTest}
                    disabled={isTesting || !selectedVariant}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2
                      ${isTesting 
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                        : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105'
                      }`}
                  >
                    {isTesting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Testing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Test Live API
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-600">No Prompt Selected</h3>
                <p className="text-sm mt-2 max-w-xs">
                  Input your task context on the left and click "Generate Variants" to see optimized prompt templates here.
                </p>
              </div>
            )}
          </div>

          {/* Metrics Dashboard (Only shows when testing) */}
          {testResult && (
            <div className="bg-slate-900 rounded-xl p-6 text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Live Test Results</h3>
                <span className={`text-xs font-mono ${testResult.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {testResult.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Score */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Performance Score</div>
                  <div className={`text-3xl font-bold ${testResult.score >= 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    {testResult.score}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">/ 100 pts</div>
                </div>

                {/* Latency */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Response Latency</div>
                  <div className="text-3xl font-bold text-primary-400">
                    {testResult.latency}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">ms</div>
                </div>

                {/* Status */}
                <div className="bg-slate-800 rounded-lg p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                     <div className={`w-2 h-2 rounded-full ${testResult.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
                     <span className="text-sm font-medium">Agent Status</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {testResult.status === 'success' ? "System is ready to deploy." : "Safety guard triggered."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}