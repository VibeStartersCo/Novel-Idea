/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Menu, X, ChevronRight, FileText, Calendar, Clock, User, CheckCircle, ShieldAlert, BrainCircuit } from 'lucide-react';
import { presentationMarkdown } from './content';
import RiskDashboard from './components/RiskDashboard';
import AgentTraining from './components/AgentTraining';

type ViewState = 'presentation' | 'risk' | 'training';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [currentView, setCurrentView] = useState<ViewState>('presentation');

  // Extract sections for the sidebar
  const contentWithoutFrontmatter = presentationMarkdown.replace(/^---[\s\S]*?---\n/, '');
  
  const sections = contentWithoutFrontmatter
    .split('\n')
    .filter(line => line.startsWith('# SECTION'))
    .map(line => {
      const title = line.replace('# ', '');
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { title, id };
    });

  useEffect(() => {
    if (currentView !== 'presentation') return;

    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, currentView]);

  const scrollToSection = (id: string) => {
    if (currentView !== 'presentation') {
      setCurrentView('presentation');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 40,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 40,
          behavior: 'smooth'
        });
      }
    }
    
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] font-sans selection:bg-[#F27D26] selection:text-white flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#141414] rounded-md border border-[#333]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 h-screen w-72 bg-[#0a0a0a] border-r border-[#222] flex flex-col transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-[#222]">
          <div className="flex items-center gap-2 text-[#F27D26] mb-2">
            <div className="w-3 h-3 rounded-full bg-[#F27D26] animate-pulse"></div>
            <span className="text-xs font-mono tracking-widest uppercase">Command Center</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight leading-tight">Sankore Group</h1>
          <p className="text-sm text-gray-500 mt-1">Phase 0 Build Plan</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          {/* Main Navigation */}
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-2">Views</div>
            <nav className="space-y-1">
              <button
                onClick={() => { setCurrentView('presentation'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-center gap-3 ${
                  currentView === 'presentation' 
                    ? 'bg-[#1a1a1a] text-[#F27D26] font-medium border border-[#333]' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#111] border border-transparent'
                }`}
              >
                <FileText size={16} className={currentView === 'presentation' ? 'text-[#F27D26]' : 'text-gray-500'} />
                <span>Strategy Document</span>
              </button>
              <button
                onClick={() => { setCurrentView('risk'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-center gap-3 ${
                  currentView === 'risk' 
                    ? 'bg-[#1a1a1a] text-[#F27D26] font-medium border border-[#333]' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#111] border border-transparent'
                }`}
              >
                <ShieldAlert size={16} className={currentView === 'risk' ? 'text-[#F27D26]' : 'text-gray-500'} />
                <span>Risk Dashboard</span>
              </button>
              <button
                onClick={() => { setCurrentView('training'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-center gap-3 ${
                  currentView === 'training' 
                    ? 'bg-[#1a1a1a] text-[#F27D26] font-medium border border-[#333]' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#111] border border-transparent'
                }`}
              >
                <BrainCircuit size={16} className={currentView === 'training' ? 'text-[#F27D26]' : 'text-gray-500'} />
                <span>Agent Training Matrix</span>
              </button>
            </nav>
          </div>

          {/* Table of Contents (Only visible in presentation view) */}
          {currentView === 'presentation' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-2">Document Index</div>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-start gap-2 ${
                      activeSection === section.id 
                        ? 'text-[#F27D26] font-medium' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <ChevronRight size={14} className={`mt-1 shrink-0 transition-transform ${activeSection === section.id ? 'rotate-90 text-[#F27D26]' : 'text-gray-600'}`} />
                    <span className="leading-snug text-xs">{section.title.replace('SECTION ', '')}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#222] bg-[#0a0a0a]">
          <div className="bg-[#111] border border-[#222] rounded-lg p-3 text-xs text-gray-400 space-y-2">
            <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-500" /> Mar 26, 2026</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-gray-500" /> 3:43 PM EST</div>
            <div className="flex items-center gap-2"><User size={14} className="text-gray-500" /> Mansa & Tau</div>
            <div className="flex items-center gap-2 text-green-500"><CheckCircle size={14} /> FINAL STATUS</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-12">
          {currentView === 'presentation' && (
            <div className="prose prose-invert prose-orange max-w-none animate-in fade-in duration-500
              prose-headings:font-sans prose-headings:tracking-tight
              prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:border-b prose-h1:border-[#222] prose-h1:pb-4
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-200
              prose-h3:text-xl prose-h3:text-gray-300
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#F27D26] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-[#F27D26] prose-code:bg-[#111] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-[#222] prose-pre:text-gray-300
              prose-blockquote:border-l-4 prose-blockquote:border-[#F27D26] prose-blockquote:bg-[#0a0a0a] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-300
              prose-table:border-collapse prose-table:w-full
              prose-th:border prose-th:border-[#333] prose-th:bg-[#111] prose-th:p-3 prose-th:text-left prose-th:text-gray-200
              prose-td:border prose-td:border-[#222] prose-td:p-3 prose-td:text-gray-300
              prose-li:text-gray-300
              prose-hr:border-[#222] prose-hr:my-12
            ">
              <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => {
                    // Extract text content from children
                    const extractText = (children: any): string => {
                      if (typeof children === 'string') return children;
                      if (Array.isArray(children)) return children.map(extractText).join('');
                      if (children && typeof children === 'object' && children.props && children.props.children) {
                        return extractText(children.props.children);
                      }
                      return '';
                    };
                    
                    const text = extractText(props.children);
                    const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
                    
                    return <h1 id={id} {...props} />
                  }
                }}
              >
                {contentWithoutFrontmatter}
              </Markdown>
            </div>
          )}

          {currentView === 'risk' && <RiskDashboard />}
          
          {currentView === 'training' && <AgentTraining />}
        </div>
      </main>
    </div>
  );
}
