import React from 'react';
import type { Infographic } from '../data/types';
import { X, Copy, CheckCircle2, Search, RotateCcw, Filter, Layout, Info, Compass } from 'lucide-react';
import { ModalView } from './ModalView';

interface ShowcaseDetail {
  whyItWorks: string;
  demoPrompt: string;
  expectedOutput: string;
}

const SHOWCASE_DETAILS: Record<string, ShowcaseDetail> = {
  'BS-002': {
    whyItWorks: "Shows the skill’s ability to handle high-complexity, data-heavy analytical layouts with KPI cards and trend charts.",
    demoPrompt: "Q1/2024 financial dashboard displaying revenue, expenses, net profit, and profit margins",
    expectedOutput: "A professional financial dashboard featuring KPI cards, trend graphs, variance indicators, and benchmark comparisons."
  },
  'MK-005': {
    whyItWorks: "Illustrates the skill's capability to map out multi-touchpoint user journeys, blending metrics and qualitative pain points into a cohesive flow.",
    demoPrompt: "Customer journey map with 5 touchpoints, conversion rates, and pain points at each stage",
    expectedOutput: "A journey map with touchpoint icons, conversion metrics, and pain indicators for optimal UI/UX or marketing tracking."
  },
  'TECH-001': {
    whyItWorks: "Proves the skill can map out complex technical and structural engineering systems cleanly.",
    demoPrompt: "Microservices architecture diagram with API Gateway, Auth Service, 3 microservices, and databases",
    expectedOutput: "An architecture diagram with service boxes, connection arrows, data flow indicators, and tech stack icons."
  },
  'HC-004': {
    whyItWorks: "Demonstrates the ability to visualize interconnected relationships and non-linear data correlations (Nodes & Edges).",
    demoPrompt: "Healthcare symptom network showing correlations between headaches, insomnia, and stress",
    expectedOutput: "A correlation network diagram showing interconnected symptoms and their directional relationships."
  },
  'ED-001': {
    whyItWorks: "Excellent for showcasing sequential guides, roadmaps, and step-by-step milestones (highly demanded by creators and educators).",
    demoPrompt: "Python learning roadmap for beginners: 6-month timeline from basics to real-world projects",
    expectedOutput: "A learning pathway with milestone nodes, skill icons, and project checkpoints."
  },
  'MK-001': {
    whyItWorks: "Standard horizontal timeline visualization that everyone from project managers to event planners can relate to.",
    demoPrompt: "New product launch timeline spanning 3 months from teaser release to viral campaign",
    expectedOutput: "A campaign timeline with phase markers, content types, and duration indicators."
  },
  'BS-001': {
    whyItWorks: "Highlights the ability to structure and color-code categorized bulleted data into standard business matrices.",
    demoPrompt: "SWOT analysis for a technology startup in the competitive modern market",
    expectedOutput: "A 4-quadrant SWOT matrix with icons, color coding (Strengths=green, Weaknesses=red, etc.), and concise bullet points."
  }
};

export interface GalleryViewProps {
  featuredItems: Infographic[];
  exploreItems: Infographic[];
  activeFilters: {
    search: string;
    domain: string;
    complexity: string;
    aspectRatio: string;
    dataType: string;
  };
  filterOptions: {
    domains: string[];
    complexities: string[];
    aspectRatios: string[];
    dataTypes: string[];
  };
  domainCounts: Record<string, number>;
  selectedItem: Infographic | null;
  copied: boolean;
  activeFeaturedHeroId: string;
  onFilterChange: (filterKey: string, value: string) => void;
  onResetFilters: () => void;
  onSelectItem: (item: Infographic | null) => void;
  onCopyPrompt: (prompt: string) => void;
  onSelectFeaturedHero: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  featuredItems,
  exploreItems,
  activeFilters,
  filterOptions,
  domainCounts,
  selectedItem,
  copied,
  activeFeaturedHeroId,
  onFilterChange,
  onResetFilters,
  onSelectItem,
  onCopyPrompt,
  onSelectFeaturedHero,
}) => {
  // Active Featured Hero Details
  const activeHeroItem = featuredItems.find(item => item.metadata.id === activeFeaturedHeroId) || featuredItems[0];
  const activeHeroDetails = activeHeroItem ? SHOWCASE_DETAILS[activeHeroItem.metadata.id] : null;

  const getAspectRatioStyle = (ratio: string = '16:9') => {
    const parts = ratio.split(':');
    if (parts.length === 2) {
      const w = parseInt(parts[0], 10);
      const h = parseInt(parts[1], 10);
      if (!isNaN(w) && !isNaN(h)) {
        return `${w} / ${h}`;
      }
    }
    return '16 / 9';
  };

  // Scroll to Explore pane helper
  const handleUsePrompt = (prompt: string) => {
    onCopyPrompt(prompt);
    const explorePane = document.getElementById('explore-pane');
    if (explorePane) {
      explorePane.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isFilterActive =
    activeFilters.search !== '' ||
    activeFilters.domain !== 'All' ||
    activeFilters.complexity !== 'All' ||
    activeFilters.aspectRatio !== 'All' ||
    activeFilters.dataType !== 'All';

  // Custom Aspect Ratio Shape Previews
  const renderRatioShape = (ratio: string) => {
    switch (ratio) {
      case '16:9':
        return <div className="w-5 h-3 border border-current rounded-[1px] shrink-0 opacity-70" />;
      case '4:3':
        return <div className="w-4 h-3 border border-current rounded-[1px] shrink-0 opacity-70" />;
      case '1:1':
        return <div className="w-3 h-3 border border-current rounded-[1px] shrink-0 opacity-70" />;
      case '3:4':
        return <div className="w-3 h-4 border border-current rounded-[1px] shrink-0 opacity-70" />;
      case '9:16':
        return <div className="w-2.5 h-4.5 border border-current rounded-[1px] shrink-0 opacity-70" />;
      default:
        return <div className="w-3 h-3 border border-current rounded-[1px] shrink-0 opacity-70" />;
    }
  };

  const getComplexityClasses = (comp: string, active: boolean) => {
    if (!active) {
      return 'bg-zinc-800/40 text-zinc-400 border-zinc-700 hover:border-zinc-650';
    }
    switch (comp.toLowerCase()) {
      case 'low':
        return 'bg-green-950/45 text-green-400 border-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.15)]';
      case 'medium':
        return 'bg-purple-950/45 text-purple-400 border-purple-500/80 shadow-[0_0_10px_rgba(168,85,247,0.15)]';
      case 'high':
        return 'bg-red-950/45 text-red-400 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.15)]';
      default:
        return 'bg-sky-950/45 text-sky-400 border-sky-500/80 shadow-[0_0_10px_rgba(14,165,233,0.15)]';
    }
  };

  return (
    <section id="gallery" className="w-full mx-auto py-24 md:py-32 px-4 md:px-8 bg-zinc-950">
      
      {/* 1. Header Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-50 mb-6">
          Interactive Gallery
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Browse real-world infographics generated via our AI Agent Skill, calling different providers (NotebookLM, Google AI Studio, Antigravity IDE, or OpenAI) to compile beautiful visual designs.
          Click to see the structure, style, and prompt behind each design.
        </p>
      </div>

      {/* 2. Premium Featured Showcases Panel */}
      {featuredItems.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-950/40 border border-sky-900/50 px-3 py-1 rounded-full">
              Premium Showcase
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Large Focused Hero Card (Span 2) */}
            {activeHeroItem && (
              <div className="lg:col-span-2 group relative h-[500px] lg:h-[600px] bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                
                {/* Background glowing ambient drop shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-1 bg-cover bg-center" style={{ backgroundImage: `url(${activeHeroItem.image_path})`, filter: 'blur(30px) opacity(0.15)' }} />

                {/* Infographic Main Image */}
                <div className="w-full h-full flex items-center justify-center p-6 bg-zinc-950/80 z-0">
                  <img
                    src={activeHeroItem.image_path}
                    alt={activeHeroItem.metadata.title}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Glassmorphic Slide-up Overlay */}
                <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col justify-between p-8 transition-opacity duration-300 z-10 text-left overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2.5">
                      {activeHeroItem.metadata.visualStyle?.aspectRatio && (
                        <span className="text-xs font-mono font-bold px-3 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg">
                          Aspect: {activeHeroItem.metadata.visualStyle.aspectRatio}
                        </span>
                      )}
                      <span className="text-xs font-semibold px-3 py-1 bg-sky-950 text-sky-400 border border-sky-900/50 rounded-lg uppercase">
                        {activeHeroItem.metadata.domain}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 bg-purple-950 text-purple-400 border border-purple-900/50 rounded-lg">
                        {activeHeroItem.metadata.complexity}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-zinc-50 tracking-tight mb-2">
                        {activeHeroItem.metadata.title}
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        {activeHeroItem.metadata.contentSummary || activeHeroItem.prompt}
                      </p>
                    </div>

                    {activeHeroDetails && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-4">
                          <div className="border-l-4 border-sky-500 pl-4 py-0.5">
                            <span className="text-xs text-sky-400 font-bold uppercase tracking-wider block mb-1">
                              Why it's great for demos
                            </span>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                              {activeHeroDetails.whyItWorks}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                              Expected Output
                            </span>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                              {activeHeroDetails.expectedOutput}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Demo Prompt block with Copy button */}
                        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                                Verbatim Agent Prompt
                              </span>
                              <button
                                type="button"
                                onClick={() => onCopyPrompt(activeHeroDetails.demoPrompt)}
                                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg border border-zinc-700 transition-colors cursor-pointer"
                                title="Copy Prompt"
                              >
                                {copied ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                              </button>
                            </div>
                            <p className="text-sm text-zinc-200 italic font-mono leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-zinc-850">
                              "{activeHeroDetails.demoPrompt}"
                            </p>
                          </div>

                          <div className="text-[10px] text-zinc-500 mt-2">
                            Click copy button to grab verbatim prompt.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Action controls */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-900">
                    <button
                      type="button"
                      onClick={() => handleUsePrompt(activeHeroDetails?.demoPrompt || activeHeroItem.prompt)}
                      className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 text-sm cursor-pointer flex items-center gap-2"
                    >
                      Use Prompt
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectItem(activeHeroItem)}
                      className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-650 text-zinc-200 hover:text-white font-bold rounded-xl transition-all duration-200 text-sm cursor-pointer flex items-center gap-2"
                    >
                      Inspect Architecture
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column - Stack of 6 Thumbnails */}
            <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {featuredItems.map((item) => {
                const isActive = item.metadata.id === activeFeaturedHeroId;
                return (
                  <div
                    key={item.metadata.id}
                    onClick={() => onSelectFeaturedHero(item.metadata.id)}
                    className={`group flex items-center gap-4 p-3 bg-zinc-900/35 backdrop-blur-md rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-sky-500/80 bg-zinc-900/80 shadow-[0_0_15px_rgba(14,165,233,0.15)] translate-x-1'
                        : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                    }`}
                  >
                    {/* Small thumbnail preview image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800/50 flex items-center justify-center relative">
                      <img
                        src={item.image_path}
                        alt={item.metadata.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-750 rounded-md uppercase tracking-wider">
                          {item.metadata.domain}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {item.metadata.id}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-200 leading-snug group-hover:text-zinc-50 truncate">
                        {item.metadata.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 truncate mt-1">
                        Complexity: <span className="font-semibold text-purple-400/90">{item.metadata.complexity}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Explore Grid Split-Pane Layout Container */}
      <div id="explore-pane" className="pt-8 border-t border-zinc-900">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT PANE - Sticky Sidebar (25% Width) */}
          <aside className="w-full lg:w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 p-6 rounded-3xl shadow-2xl custom-scrollbar space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-sky-500" />
                <h3 className="font-black text-zinc-100 text-base uppercase tracking-wider">
                  Filters
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-750 rounded-md">
                60 Templates
              </span>
            </div>

            {/* A. Search Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search title, prompt, tags..."
                  value={activeFilters.search}
                  onChange={(e) => onFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                />
                <Search size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
              </div>
            </div>

            {/* B. Domain Checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Core Domains
              </label>
              <div className="flex flex-col gap-1.5">
                {filterOptions.domains.map(domain => {
                  const isActive = activeFilters.domain.toLowerCase() === domain.toLowerCase();
                  const count = domainCounts[domain] || 0;
                  return (
                    <label
                      key={domain}
                      className={`flex items-center justify-between p-2 rounded-xl border border-transparent hover:bg-zinc-850/40 cursor-pointer transition-all duration-200 ${
                        isActive ? 'bg-zinc-800/40 border-zinc-750' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => onFilterChange('domain', isActive ? 'All' : domain)}
                          className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-zinc-950 border-zinc-800 cursor-pointer accent-sky-500"
                        />
                        <span className={`text-sm select-none capitalize ${isActive ? 'text-sky-400 font-bold' : 'text-zinc-300'}`}>
                          {domain}
                        </span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-sky-500/20 text-sky-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* C. Complexity chips */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                Complexity Level
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', ...filterOptions.complexities].map(comp => {
                  const isActive = activeFilters.complexity === comp;
                  return (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => onFilterChange('complexity', comp)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer capitalize ${getComplexityClasses(
                        comp,
                        isActive
                      )}`}
                    >
                      {comp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* D. Aspect Ratio shape previews */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['All', ...filterOptions.aspectRatios].map(ratio => {
                  const isActive = activeFilters.aspectRatio === ratio;
                  return (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => onFilterChange('aspectRatio', ratio)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-sky-950/45 text-sky-400 border-sky-500/80 shadow-[0_0_10px_rgba(14,165,233,0.15)] font-bold'
                          : 'bg-zinc-800/40 text-zinc-400 border-zinc-700 hover:border-zinc-650'
                      }`}
                    >
                      {ratio !== 'All' ? renderRatioShape(ratio) : <Compass size={14} />}
                      <span>{ratio}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* E. Layout Structure Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                Layout Structure
              </label>
              <div className="relative">
                <select
                  value={activeFilters.dataType}
                  onChange={(e) => onFilterChange('dataType', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 appearance-none cursor-pointer"
                >
                  <option value="All">All Structures</option>
                  {filterOptions.dataTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-zinc-500">
                  <Layout size={14} />
                </div>
              </div>
            </div>

            {/* Results count & dynamic reset */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
                <span>Total Matches:</span>
                <span className="text-zinc-200 font-bold">{exploreItems.length} templates</span>
              </div>

              {isFilterActive && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-850 hover:bg-zinc-850/80 border border-zinc-750 hover:border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md"
                >
                  <RotateCcw size={13} />
                  Clear All Filters
                </button>
              )}
            </div>

          </aside>

          {/* RIGHT PANE - Pinterest-style CSS columns masonry grid (75% Width) */}
          <main className="flex-1 w-full">
            
            {exploreItems.length > 0 ? (
              <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 [&>*]:break-inside-avoid-column">
                {exploreItems.map((item) => (
                  <div
                    key={item.metadata.id}
                    className="group relative flex flex-col w-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-zinc-700/80 transition-all duration-300 [&>*]:break-inside-avoid-column"
                  >
                    {/* Image container & overlay triggers */}
                    <div
                      onClick={() => onSelectItem(item)}
                      style={{ aspectRatio: getAspectRatioStyle(item.metadata.visualStyle?.aspectRatio) }}
                      className="w-full relative overflow-hidden bg-zinc-950 flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={item.image_path}
                        alt={item.metadata.title}
                        className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Hover Slide-up Details */}
                      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col justify-between p-5 transition-opacity duration-300 z-10 text-left">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-sky-500/20 text-sky-400 rounded-md border border-sky-500/30">
                              {item.metadata.domain}
                            </span>
                            {item.metadata.visualStyle?.aspectRatio && (
                              <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                                {item.metadata.visualStyle.aspectRatio}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-zinc-50 leading-tight mb-2">
                            {item.metadata.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-4 leading-relaxed italic bg-zinc-950/50 p-2 rounded-lg border border-zinc-900/50">
                            "{item.prompt}"
                          </p>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onSelectItem(item); }}
                            className="flex-1 text-center py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            Inspect Specs
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onCopyPrompt(item.prompt); }}
                            className="px-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center"
                            title="Copy Prompt"
                          >
                            {copied ? <CheckCircle2 size={13} className="text-green-300" /> : <Copy size={13} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ALWAYS VISIBLE bottom metadata bar */}
                    <div className="p-4 border-t border-zinc-850/80 bg-zinc-900/10 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                          {item.metadata.id}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-950/40 text-purple-400 border border-purple-900/30 rounded-md">
                          {item.metadata.complexity}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-200 leading-snug group-hover:text-sky-400 transition-colors line-clamp-2">
                        {item.metadata.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8">
                <Info size={40} className="mx-auto text-zinc-600 mb-4" />
                <p className="text-zinc-400 text-lg font-bold">No infographic templates match your filters.</p>
                <p className="text-zinc-650 text-sm mt-1">Try resetting the sidebar query or categories.</p>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="mt-6 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs transition-all duration-200 cursor-pointer shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* 4. Detail Modal Popup Overlay */}
      {selectedItem && (
        <ModalView
          item={selectedItem}
          onClose={() => onSelectItem(null)}
        />
      )}

    </section>
  );
};
