import React, { useState } from 'react';

export default function App() {
  const [contractText, setContractText] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!contractText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/audit-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractText,
          sourcePlatform: sourcePlatform.trim() || 'Generic Platform'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server processing error occurred.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Structural Global Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">ClauseGuard</h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                Microsoft IQ Fabric
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Independent Contractor Legal Safety Workspace</p>
          </div>
          {result && (
            <div className="text-[11px] font-mono bg-slate-900 border border-slate-800 rounded px-3 py-1 text-slate-400">
              Pipeline State: <span className="text-emerald-400 font-medium">{result.mode}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid Layout Workspace */}
      <main className="max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Input Form Control Terminal (5 Columns) */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-2">
              Ingestion Parameters
            </h2>
            
            <form onSubmit={handleAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Platform / Client Identity</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g., Upwork, Fiverr, Remote Agency"
                  value={sourcePlatform}
                  onChange={(e) => setSourcePlatform(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Digital Agreement / ToS Payload</label>
                <textarea 
                  rows={14}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                  placeholder="Paste the full contract clause text block or Terms of Service string here..."
                  required
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !contractText.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing Multi-Source Audit...
                  </>
                ) : 'Initiate Compliance Check'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 text-xs flex gap-2">
              <span className="font-bold">Execution Error:</span> {error}
            </div>
          )}
        </section>

        {/* Right Side: Analysis Display Terminal (7 Columns) */}
        <section className="lg:col-span-7 bg-slate-950/40 border border-slate-800 rounded-xl p-6 min-h-[500px] flex flex-col">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-2 mb-4">
            Intelligence Matrix Feedback
          </h2>

          {result ? (
            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
              
              {/* Grounded Text Parsing Response Section */}
              <div className="prose prose-invert text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {result.groundedAnalysis}
              </div>

              {/* Immutable Citations Container */}
              {result.citations && result.citations.length > 0 && (
                <div className="pt-5 border-t border-slate-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                    Foundry IQ Statutory Citations:
                  </h3>
                  <ul className="space-y-2">
                    {result.citations.map((citation, idx) => (
                      <li key={idx} className="text-xs text-slate-400 bg-slate-950 border border-slate-800/50 rounded-lg p-2.5 font-mono flex gap-2 items-start">
                        <span className="text-indigo-500 font-bold">[{idx + 1}]</span>
                        <span>{citation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Live Web Signals Retrieval View */}
              {result.liveWebSignals && result.liveWebSignals.length > 0 && (
                <div className="pt-5 border-t border-slate-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
                    Live Web IQ Legal Signals:
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {result.liveWebSignals.map((signal, idx) => (
                      <a 
                        href={signal.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        key={idx} 
                        className="block bg-slate-950 border border-slate-800/60 hover:border-amber-500/40 rounded-lg p-3 transition-all hover:bg-slate-900/40 group"
                      >
                        <div className="text-xs font-medium text-slate-200 group-hover:text-amber-400 transition-colors">
                          {signal.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">
                          {signal.url}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-3 text-slate-500 text-lg">
                📋
              </div>
              <p className="text-slate-400 font-medium text-sm">Awaiting Contract Context Ingestion</p>
              <p className="text-slate-600 text-xs mt-1 max-w-sm">
                Paste an agreement text block on the left and trigger verification to compute safety heuristics across the Microsoft IQ layer.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}