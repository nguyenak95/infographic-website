import React, { useState } from 'react';
import type { Infographic } from '../data/types';
import { X, Copy, Check, ZoomIn, ZoomOut, RotateCcw, Download, Sparkles } from 'lucide-react';

interface ModalViewProps {
  item: Infographic | null;
  onClose: () => void;
}

export const ModalView: React.FC<ModalViewProps> = ({ item, onClose }) => {
  if (!item) return null;

  const [activeTab, setActiveTab] = useState<'visuals' | 'blueprint' | 'trigger'>('visuals');
  
  // Tab 1: Zoom State
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Tab 2: Color Palette copy feedbacks
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  // Tab 3: AI Prompt Builder Config State
  const [promptSubject, setPromptSubject] = useState<string>(item.metadata.title);
  const [promptComplexity, setPromptComplexity] = useState<string>(item.metadata.complexity || 'Medium');
  const [promptAddGuidelines, setPromptAddGuidelines] = useState<boolean>(true);
  const [promptCustomDetails, setPromptCustomDetails] = useState<string>('');
  const [promptCopied, setPromptCopied] = useState<boolean>(false);

  // Parse Hex codes dynamically from text
  const extractHexColors = (text: string): string[] => {
    const regex = /#[A-Fa-f0-9]{6}\b/g;
    const matches = text.match(regex);
    return matches ? Array.from(new Set(matches)) : ['#0ea5e9', '#38bdf8', '#09090b'];
  };

  const colors = extractHexColors(
    `${item.metadata.visualStyle?.style_framework?.palette?.primary_colors || ''} ${item.metadata.visualStyle?.style_framework?.palette?.accent_colors || ''}`
  );

  // Hex to HSL String converter
  const hexToHsl = (hex: string): string => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCopyColor = (hex: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hex)
        .then(() => {
          setCopiedColorHex(hex);
          setTimeout(() => setCopiedColorHex(null), 1500);
        })
        .catch(err => {
          console.error('Failed to copy color hex to clipboard:', err);
        });
    } else {
      console.warn('Clipboard writing is not supported in this environment.');
    }
  };

  // Generate dynamic Natural Language AI Prompt string
  const generateAgentPrompt = (): string => {
    let subject = promptSubject.trim() || item.metadata.title;
    let msg = `Hey Infographic Agent! Please trigger the "infographic-creator" skill to generate an infographic for me:\n\n`;
    msg += `- Subject Matter: "${subject}"\n`;
    msg += `- Template Layout: "${item.metadata.title}" (ID: ${item.metadata.id})\n`;
    msg += `- Complexity Tier: ${promptComplexity}\n`;
    msg += `- Aspect Ratio: ${item.metadata.visualStyle?.aspectRatio || '16:9'}\n`;
    msg += `- Domain Context: ${item.metadata.domain}`;
    
    if (promptAddGuidelines) {
      msg += `\n- Styling Rules: Apply HSL color palette swatches, typography hierarchies, and spatial grid mappings matching the template standard.`;
    }
    
    if (promptCustomDetails.trim()) {
      msg += `\n- Additional Instructions: "${promptCustomDetails.replace(/"/g, '\\"')}"`;
    }
    
    return msg;
  };

  const handleCopyPrompt = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(generateAgentPrompt())
        .then(() => {
          setPromptCopied(true);
          setTimeout(() => setPromptCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy prompt to clipboard:', err);
        });
    } else {
      console.warn('Clipboard writing is not supported in this environment.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-zinc-950/80 backdrop-blur-md cursor-pointer border-none"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 md:px-8 bg-zinc-900 border-b border-zinc-800 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                ID: {item.metadata.id}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-md">
                {item.metadata.dataType}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-zinc-50 tracking-tight leading-tight">
              {item.metadata.title}
            </h3>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-full flex items-center justify-center border border-zinc-700 cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls Navigation */}
        <div className="bg-zinc-950 px-6 md:px-8 border-b border-zinc-800 flex gap-4">
          {(['visuals', 'blueprint', 'trigger'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab === 'visuals' && '1. High-Res Visuals'}
              {tab === 'blueprint' && '2. AI Design DNA Blueprint'}
              {tab === 'trigger' && '3. Trigger AI Agent'}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Contents */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-900/40 custom-scrollbar">
          
          {/* TAB 1: VISUALS PREVIEW */}
          {activeTab === 'visuals' && (
            <div className="space-y-6">
              
              {/* Zoom & Download Toolbar */}
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3.0))}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button
                    onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <button
                    onClick={() => setZoomScale(1.0)}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-lg text-zinc-400 hover:text-white cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={13} />
                    <span>Reset ({Math.round(zoomScale * 100)}%)</span>
                  </button>
                </div>

                <a
                  href={item.image_path}
                  download={`${item.metadata.id}_high_resolution.png`}
                  className="px-4 py-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download size={13} />
                  Download Asset
                </a>
              </div>

              {/* High-res Image Canvas Container */}
              <div className="w-full aspect-[16/10] bg-zinc-955 border border-zinc-850 rounded-2xl overflow-hidden flex items-center justify-center p-4 relative bg-zinc-950">
                <div
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="max-w-full max-h-full flex items-center justify-center"
                >
                  <img
                    src={item.image_path}
                    alt={item.metadata.title}
                    className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI DESIGN BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="space-y-8">
              
              {/* Row 1: Color DNA Swatches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 text-left">
                  Color DNA Swatches
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {colors.map((hex) => {
                    const hasCopied = copiedColorHex === hex;
                    return (
                      <div
                        key={hex}
                        className="bg-zinc-955 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between bg-zinc-950"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            style={{ backgroundColor: hex }}
                            className="w-12 h-12 rounded-xl border border-zinc-800 shrink-0 shadow-lg"
                          />
                          <div className="text-left">
                            <span className="text-sm font-mono text-zinc-200 block uppercase font-bold">
                              {hex}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 block">
                              {hexToHsl(hex)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyColor(hex)}
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-805 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer border-zinc-800"
                        >
                          {hasCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Typography & Spatial structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Typography Guidelines */}
                <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-4 text-left">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-805 pb-2 border-zinc-800">
                    Typography Guidelines
                  </h4>
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[10px] text-zinc-500 block font-bold uppercase">Heading Hierarchy</span>
                      <p className="text-sm text-zinc-300 font-bold font-mono">
                        {item.metadata.visualStyle?.style_framework?.typography?.headings || 'Montserrat Bold, Open Sans Semibold'}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block font-bold uppercase">Body Copy Legibility</span>
                      <p className="text-sm text-zinc-300 font-mono">
                        {item.metadata.visualStyle?.style_framework?.typography?.body || 'Lato Regular, Roboto Regular'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Tone details */}
                <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-4 text-left">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-805 pb-2 border-zinc-800">
                    Material Surface Treatments
                  </h4>
                  <div className="space-y-3.5 text-xs text-zinc-300">
                    <div>
                      <strong className="text-zinc-400 block font-semibold mb-0.5">Component Shapes:</strong>
                      <span>{item.metadata.visualStyle?.style_framework?.surface_treatments?.shapes || 'Standard flowchart glyphs and rounded squares'}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-400 block font-semibold mb-0.5">Depth Scale & Borders:</strong>
                      <span>{item.metadata.visualStyle?.style_framework?.surface_treatments?.depth_and_borders || 'Subtle drop shadows, clean borders matching accents'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 3: Interactive Spatial Grid Map Mockup */}
              {item.metadata.visualStyle?.layout_template?.spatial_mapping && (
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 text-left">
                    Interactive Grid Spatial Blueprint
                  </h4>
                  
                  {/* CSS Layout grid representing zones */}
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    {Object.entries(item.metadata.visualStyle.layout_template.spatial_mapping).map(([zone, detail]) => (
                      <div
                        key={zone}
                        className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors"
                      >
                        <span className="capitalize font-bold text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg w-28 shrink-0 text-center">
                          {zone}
                        </span>
                        <p className="text-zinc-300 text-left leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRIGGER AI AGENT PROMPT BUILDER */}
          {activeTab === 'trigger' && (
            <div className="space-y-6">
              
              <div className="bg-zinc-955 border border-zinc-800 p-5 rounded-2xl bg-zinc-950">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 text-left">
                  Configure Trigger Prompt
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Parameter Column */}
                  <div className="space-y-4 text-left">
                    <div>
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">Subject Matter / Topic</span>
                      <input
                        type="text"
                        value={promptSubject}
                        onChange={(e) => setPromptSubject(e.target.value)}
                        placeholder="E.g., Type 2 Diabetes, DevOps pipeline, SaaS roadmap..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">Complexity Level</span>
                      <div className="flex gap-3">
                        {['Low', 'Medium', 'High'].map((comp) => (
                          <button
                            key={comp}
                            onClick={() => setPromptComplexity(comp)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                              promptComplexity.toLowerCase() === comp.toLowerCase()
                                ? 'bg-primary/20 border-primary text-primary'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            {comp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Parameter Column */}
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                      <div>
                        <span className="text-xs font-bold text-zinc-300 block">Enforce Visual Guidelines</span>
                        <span className="text-[10px] text-zinc-500">Instructs agent to match color, fonts and spatial layouts</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={promptAddGuidelines}
                        onChange={(e) => setPromptAddGuidelines(e.target.checked)}
                        className="w-5 h-5 rounded text-primary focus:ring-primary bg-zinc-950 border-zinc-800 cursor-pointer accent-primary"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">Custom Directives</span>
                      <input
                        type="text"
                        value={promptCustomDetails}
                        onChange={(e) => setPromptCustomDetails(e.target.value)}
                        placeholder="E.g., highlight the launch phase in red, use clinical tone..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic Prompt Code Block */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Trigger Prompt (Copy & Send to AI Agent)</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyPrompt}
                      className="px-4 py-2 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                    >
                      {promptCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span>{promptCopied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl relative flex items-center justify-between font-mono text-xs text-primary leading-relaxed text-left">
                  <pre className="overflow-x-auto whitespace-pre-wrap pr-4 flex-1 custom-scrollbar text-zinc-200 leading-relaxed font-sans">
                    {generateAgentPrompt()}
                  </pre>
                </div>
              </div>

              {/* Skill Badge Description */}
              <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl flex gap-3 text-left">
                <Sparkles size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-500">
                  <span className="font-bold text-zinc-400 block mb-0.5">Triggering the Agent Skill</span>
                  The `infographic-creator` AI Agent skill is instantly triggered when it detects this structured natural language prompt layout, calling different providers (NotebookLM, Google AI Studio, Antigravity, or OpenAI) to generate the graphic. Copy and paste the block above directly into your conversation with the AI Agent.
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
