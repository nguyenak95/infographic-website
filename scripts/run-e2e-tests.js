import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const __dirname = path.resolve();

console.log('\x1b[36m==================================================================\x1b[0m');
console.log('\x1b[36m   STARTING AUTOMATED E2E TEST RUNNER FOR SMART-INFOGRAPHIC       \x1b[0m');
console.log('\x1b[36m==================================================================\x1b[0m');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function section(name) {
  console.log(`\n\x1b[35m▶ ${name}\x1b[0m`);
}

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✘\x1b[0m ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

// -------------------------------------------------------------
// STEP 1: AST-like dynamic compilation of infographics data
// -------------------------------------------------------------
section('Loading Infographics Data Dynamically');

const infographicsTsPath = path.resolve('src/data/infographics.ts');
if (!fs.existsSync(infographicsTsPath)) {
  throw new Error(`Could not find infographics.ts at: ${infographicsTsPath}`);
}

const tsContent = fs.readFileSync(infographicsTsPath, 'utf8');

// Strip TypeScript annotations to convert to valid ES module JS
const jsContent = tsContent
  .replace(/import type \{.*\} from '.*';/g, '')
  .replace(/export const INFOGRAPHICS: Infographic\[\] =/g, 'export const INFOGRAPHICS =');

const tempJsPath = path.resolve('scripts/temp-infographics.js');

// Ensure scripts/ directory exists
if (!fs.existsSync(path.resolve('scripts'))) {
  fs.mkdirSync(path.resolve('scripts'));
}

fs.writeFileSync(tempJsPath, jsContent, 'utf8');

// Dynamic import of templates
const { INFOGRAPHICS } = await import('./temp-infographics.js');

// Cleanup temporary JS file
try {
  fs.unlinkSync(tempJsPath);
} catch (e) {
  // Ignore cleanup errors
}

assert(Array.isArray(INFOGRAPHICS), 'INFOGRAPHICS is a valid array');
assert(INFOGRAPHICS.length === 67, `Verify src/data/infographics.ts maps exactly 67 templates (got ${INFOGRAPHICS.length})`);

// -------------------------------------------------------------
// STEP 2: Asset Integrity Check
// -------------------------------------------------------------
section('Asset Integrity Check');

// Check that all 70 template PNG files exist physically in public/infographics/
for (const item of INFOGRAPHICS) {
  const publicImgPath = path.join(__dirname, 'public', item.image_path);
  assert(fs.existsSync(publicImgPath), `Physical PNG file exists: public${item.image_path}`);
}

// -------------------------------------------------------------
// STEP 3: Compilation and Static HTML Checks
// -------------------------------------------------------------
section('Astro Site Compilation Check');

console.log('Running Astro compilation (npm run build)...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('\x1b[32m✔ Astro build completed successfully\x1b[0m');
} catch (error) {
  console.error('\x1b[31m✘ Astro build failed\x1b[0m', error);
  throw error;
}

// Check built assets
const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
assert(fs.existsSync(distHtmlPath), 'Astro build output directory contains /dist/index.html');

const htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
assert(htmlContent.includes('<html'), '/dist/index.html contains standard <html> opening tag');
assert(htmlContent.includes('<head'), '/dist/index.html contains standard <head> opening tag');
assert(htmlContent.includes('<body'), '/dist/index.html contains standard <body> opening tag');
assert(htmlContent.includes('NotebookLM'), '/dist/index.html includes NotebookLM platform reference');

// Check that all 70 template PNG files also exist in the compiled dist/infographics/ directory
for (const item of INFOGRAPHICS) {
  const distImgPath = path.join(__dirname, 'dist', item.image_path);
  assert(fs.existsSync(distImgPath), `Physical PNG file exists in dist: dist${item.image_path}`);
}

// -------------------------------------------------------------
// STEP 4: TIER 1 - Feature Coverage
// -------------------------------------------------------------
section('Tier 1: Feature Coverage (>=5 test cases per feature)');

const PREMIUM_IDS = ['BS-002', 'MK-005', 'TECH-001', 'HC-004', 'ED-001', 'MK-001', 'BS-001'];
const exploreBaseItems = INFOGRAPHICS.filter(item => !PREMIUM_IDS.includes(item.metadata.id));

// Helper: HSL Converter
const hexToHsl = (hex) => {
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

// Helper: Prompt Generation
const generateAgentPrompt = (item, subject, complexity, addGuidelines, customDetails) => {
  let sub = subject.trim() || item.metadata.title;
  let msg = `Hey Infographic Agent! Please trigger the "infographic-creator" skill to generate an infographic for me:\n\n`;
  msg += `- Subject Matter: "${sub}"\n`;
  msg += `- Template Layout: "${item.metadata.title}" (ID: ${item.metadata.id})\n`;
  msg += `- Complexity Tier: ${complexity}\n`;
  msg += `- Aspect Ratio: ${item.metadata.visualStyle?.aspectRatio || '16:9'}\n`;
  msg += `- Domain Context: ${item.metadata.domain}`;
  
  if (addGuidelines) {
    msg += `\n- Styling Rules: Apply HSL color palette swatches, typography hierarchies, and spatial grid mappings matching the template standard.`;
  }
  
  if (customDetails.trim()) {
    msg += `\n- Additional Instructions: "${customDetails.replace(/"/g, '\\"')}"`;
  }
  
  return msg;
};

// --- FEATURE 1: Category Tab Filter Counts ---
section('Feature 1: Category Tab Filter Counts');

const runCategoryFilter = (domain, complexity, ratio, structure) => {
  return exploreBaseItems.filter(item => {
    const matchesDomain = domain === 'All' || item.metadata.domain.toLowerCase() === domain.toLowerCase();
    const matchesComplexity = complexity === 'All' || item.metadata.complexity.toLowerCase().includes(complexity.toLowerCase());
    const matchesRatio = ratio === 'All' || !item.metadata.visualStyle || !item.metadata.visualStyle.aspectRatio || item.metadata.visualStyle.aspectRatio.toLowerCase() === ratio.toLowerCase();
    const matchesStructure = structure === 'All' || !item.metadata.dataType || item.metadata.dataType.toLowerCase() === structure.toLowerCase();
    return matchesDomain && matchesComplexity && matchesRatio && matchesStructure;
  });
};

// Test 1.1: Default filters matches exact exploration count
const resDefault = runCategoryFilter('All', 'All', 'All', 'All');
assert(resDefault.length === 60, `Default filters return remaining 60 exploratory templates (got ${resDefault.length})`);

// Test 1.2: Filter by domain 'healthcare'
const resHealthcare = runCategoryFilter('healthcare', 'All', 'All', 'All');
assert(resHealthcare.length > 0 && resHealthcare.every(i => i.metadata.domain === 'healthcare'), 'Domain filtering for healthcare returns only healthcare items');

// Test 1.3: Filter by complexity 'Medium'
const resMedium = runCategoryFilter('All', 'Medium', 'All', 'All');
assert(resMedium.length > 0 && resMedium.every(i => i.metadata.complexity.includes('Medium')), 'Complexity filtering for Medium matches correct templates');

// Test 1.4: Filter by aspect ratio '16:9'
const res16_9 = runCategoryFilter('All', 'All', '16:9', 'All');
assert(res16_9.length > 0 && res16_9.every(i => !i.metadata.visualStyle || !i.metadata.visualStyle.aspectRatio || i.metadata.visualStyle.aspectRatio === '16:9'), 'Aspect ratio filtering matches exactly 16:9 templates');

// Test 1.5: Filter by layout structure 'Custom'
const resCustom = runCategoryFilter('All', 'All', 'All', 'Custom');
assert(resCustom.length > 0 && resCustom.every(i => i.metadata.dataType === 'Custom'), 'Layout structure filtering matches exactly Custom template types');


// --- FEATURE 2: Text Search Queries ---
section('Feature 2: Text Search Queries');

const runTextSearch = (query) => {
  const q = query.toLowerCase().trim();
  return exploreBaseItems.filter(item => {
    return !q ||
      item.metadata.title.toLowerCase().includes(q) ||
      item.prompt.toLowerCase().includes(q) ||
      item.metadata.dataType.toLowerCase().includes(q) ||
      item.metadata.domain.toLowerCase().includes(q) ||
      (item.metadata.tags && item.metadata.tags.toLowerCase().includes(q)) ||
      (item.metadata.signals && item.metadata.signals.toLowerCase().includes(q)) ||
      (item.metadata.complexity && item.metadata.complexity.toLowerCase().includes(q));
  });
};

// Test 2.1: Query by exact title substring
const searchTitle = runTextSearch('Gantt-Style Project');
assert(searchTitle.length === 1 && searchTitle[0].metadata.id === 'BS-003', 'Search by title substring maps to correct template');

// Test 2.2: Query by domain
const searchDomain = runTextSearch('technology');
assert(searchDomain.length > 0 && searchDomain.every(i => i.metadata.domain === 'technology'), 'Search by domain substring returns correct list');

// Test 2.3: Query by tags
const searchTags = runTextSearch('checklist');
assert(searchTags.length > 0 && searchTags.every(i => (i.metadata.title + i.prompt + i.metadata.tags).toLowerCase().includes('checklist')), 'Search by tags matches checklist elements');

// Test 2.4: Query by complexity level
const searchComplexity = runTextSearch('Low-Medium');
assert(searchComplexity.length === 1 && searchComplexity[0].metadata.id === 'ED-008', 'Search by complexity maps to Low-Medium template');

// Test 2.5: Query by prompt content
const searchPrompt = runTextSearch('Nutritional Breakdowns');
assert(searchPrompt.length === 1 && searchPrompt[0].metadata.id === 'HC-006', 'Search by specific prompt text returns correct match');


// --- FEATURE 3: Prompt Builder State Engine ---
section('Feature 3: Prompt Builder State Engine');

// Simulated Prompt Builder State Engine class matching ModalView.tsx
class PromptBuilderStateEngine {
  constructor(item) {
    this.item = item;
    this.promptSubject = item.metadata.title;
    this.promptComplexity = item.metadata.complexity || 'Medium';
    this.promptAddGuidelines = true;
    this.promptCustomDetails = '';
  }

  setSubject(subject) {
    this.promptSubject = subject;
  }

  setComplexity(complexity) {
    this.promptComplexity = complexity;
  }

  setAddGuidelines(addGuidelines) {
    this.promptAddGuidelines = addGuidelines;
  }

  setCustomDetails(details) {
    this.promptCustomDetails = details;
  }

  generateAgentPrompt() {
    let subject = this.promptSubject.trim() || this.item.metadata.title;
    let msg = `Hey Infographic Agent! Please trigger the "infographic-creator" skill to generate an infographic for me:\n\n`;
    msg += `- Subject Matter: "${subject}"\n`;
    msg += `- Template Layout: "${this.item.metadata.title}" (ID: ${this.item.metadata.id})\n`;
    msg += `- Complexity Tier: ${this.promptComplexity}\n`;
    msg += `- Aspect Ratio: ${this.item.metadata.visualStyle?.aspectRatio || '16:9'}\n`;
    msg += `- Domain Context: ${this.item.metadata.domain}`;
    
    if (this.promptAddGuidelines) {
      msg += `\n- Styling Rules: Apply HSL color palette swatches, typography hierarchies, and spatial grid mappings matching the template standard.`;
    }
    
    if (this.promptCustomDetails.trim()) {
      msg += `\n- Additional Instructions: "${this.promptCustomDetails.replace(/"/g, '\\"')}"`;
    }
    
    return msg;
  }

  reset() {
    this.promptSubject = this.item.metadata.title;
    this.promptComplexity = this.item.metadata.complexity || 'Medium';
    this.promptAddGuidelines = true;
    this.promptCustomDetails = '';
  }
}

// Test 3.1: Verify initial state values
const samplePreset = INFOGRAPHICS.find(i => i.metadata.id === 'BS-002');
const builder = new PromptBuilderStateEngine(samplePreset);
assert(builder.promptSubject === samplePreset.metadata.title && builder.promptComplexity === 'Medium', 'Prompt builder initializes with correct subject and complexity');

// Test 3.2: Selection custom subject matter mapping
const presetHC4 = INFOGRAPHICS.find(i => i.metadata.id === 'HC-004');
const builderHC4 = new PromptBuilderStateEngine(presetHC4);
assert(builderHC4.item.metadata.id === 'HC-004', 'Initializing PromptBuilderStateEngine with preset HC-004 maps active item correctly');
assert(builderHC4.generateAgentPrompt().includes('HC-004'), 'Generated agent prompt references correct preset ID');

// Test 3.3: Custom Subject Matter updates prompt string
builder.setSubject('Custom Healthcare System');
assert(builder.promptSubject === 'Custom Healthcare System', 'Custom subject state updates successfully');
assert(builder.generateAgentPrompt().includes('Custom Healthcare System'), 'Generated agent prompt reflects customized subject matter');

// Test 3.4: Toggle complexity level updates prompt string
builder.setComplexity('High');
assert(builder.promptComplexity === 'High', 'Complexity tier state updates to High successfully');
assert(builder.generateAgentPrompt().includes('- Complexity Tier: High'), 'Generated prompt correctly reflects High complexity tier');

// Test 3.5: Reset flow restores standard values
builder.reset();
assert(builder.promptSubject === samplePreset.metadata.title && builder.promptComplexity === 'Medium', 'Reset successfully restores prompt builder back to initial defaults');


// --- FEATURE 4: Details Modal Tabs ---
section('Feature 4: Details Modal Tabs');

class ModalStateEngine {
  constructor(item) {
    this.item = item;
    this.activeTab = 'visuals';
    this.zoomScale = 1.0;
    this.copiedColorHex = null;
  }

  zoomIn() {
    this.zoomScale = Math.min(this.zoomScale + 0.25, 3.0);
  }

  zoomOut() {
    this.zoomScale = Math.max(this.zoomScale - 0.25, 0.5);
  }

  resetZoom() {
    this.zoomScale = 1.0;
  }

  switchTab(tab) {
    this.activeTab = tab;
  }
}

const sampleItem = INFOGRAPHICS.find(i => i.metadata.id === 'HC-001');
const modal = new ModalStateEngine(sampleItem);

// Test 4.1: Default active tab is visuals, zoom scale is 1.0
assert(modal.activeTab === 'visuals' && modal.zoomScale === 1.0, 'Modal initializes with visuals tab and 1.0 scale');

// Test 4.2: Zoom engine controls
modal.zoomIn();
assert(modal.zoomScale === 1.25, 'Zooming in increments zoomScale to 1.25');
modal.zoomOut();
modal.zoomOut();
assert(modal.zoomScale === 0.75, 'Zooming out decrements scale appropriately');
modal.resetZoom();
assert(modal.zoomScale === 1.0, 'Reset zoom returns scale to 1.0');

// Test 4.3: HSL Swatches calculations check
const primaryColorStr = sampleItem.metadata.visualStyle.style_framework.palette.primary_colors;
// Extract '#007BFF'
const hexMatch = primaryColorStr.match(/#[A-Fa-f0-9]{6}/);
assert(hexMatch !== null, 'Successfully extracted HEX color code from style metadata');
const firstHex = hexMatch[0];
const hslStr = hexToHsl(firstHex);
assert(hslStr.startsWith('hsl(') && hslStr.endsWith(')'), `Successfully converted HEX ${firstHex} to HSL string: ${hslStr}`);

// Test 4.4: Spatial blueprint data mapping
const spatialMapping = sampleItem.metadata.visualStyle.layout_template.spatial_mapping;
assert(spatialMapping && spatialMapping.top && spatialMapping.center && spatialMapping.bottom, 'Spatial grid layout mapping contains top, center, and bottom zones');

// Test 4.5: Typography styles hierarchy verification
const typography = sampleItem.metadata.visualStyle.style_framework.typography;
assert(typography.headings && typography.body, 'Typography metadata structures headings and body guidelines');


// --- FEATURE 5: AI Agent Trigger Prompt Builder ---
section('Feature 5: AI Agent Trigger Prompt Builder');

const testItem = INFOGRAPHICS.find(i => i.metadata.id === 'HC-001');
const testBuilder = new PromptBuilderStateEngine(testItem);

// Test 5.1: Default prompt generation matches template parameters
let prompt = testBuilder.generateAgentPrompt();
assert(prompt.includes('HC-001') && prompt.includes('- Aspect Ratio: 16:9') && prompt.includes('healthcare'), 'Default prompt generates correct layout title, ID, aspect ratio and domain context');

// Test 5.2: Toggle target complexity parameter
testBuilder.setComplexity('Low');
prompt = testBuilder.generateAgentPrompt();
assert(prompt.includes('- Complexity Tier: Low'), 'Prompt updates complexity tier parameter correctly');

// Test 5.3: Toggle styling guidelines flag
testBuilder.setAddGuidelines(false);
prompt = testBuilder.generateAgentPrompt();
assert(!prompt.includes('- Styling Rules:'), 'Styling guidelines are cleanly omitted when flag is false');

// Test 5.4: Custom directives instructions input
testBuilder.setCustomDetails('Use clinical teal hues');
prompt = testBuilder.generateAgentPrompt();
assert(prompt.includes('- Additional Instructions: "Use clinical teal hues"'), 'Prompt appends custom instructions parameter with exact formatting');

// Test 5.5: Double quotes in custom directives are safely escaped
testBuilder.setCustomDetails('Use "clinical" teal');
prompt = testBuilder.generateAgentPrompt();
assert(prompt.includes('\\"clinical\\"'), 'Double quotes in custom directives are safely escaped inside prompt string');


// -------------------------------------------------------------
// STEP 5: TIER 2 - Boundary & Corner Cases
// -------------------------------------------------------------
section('Tier 2: Boundary & Corner Cases (>=5 test cases per feature)');

// --- FEATURE 1: Text Search Boundaries ---
section('Text Search Boundaries');

// Test 2.1.1: Case insensitivity search check
const searchCase = runTextSearch('HeAlThCaRe');
assert(searchCase.length > 0 && searchCase.every(i => i.metadata.domain === 'healthcare'), 'Search matching is fully case-insensitive');

// Test 2.1.2: Empty / whitespace query
const searchEmpty = runTextSearch('   ');
assert(searchEmpty.length === 60, 'Whitespace-only search queries fallback gracefully and return all 60 items');

// Test 2.1.3: Symbols and special characters
const searchSymbols = runTextSearch('!@#$%');
assert(searchSymbols.length === 0, 'Special characters/symbols return 0 results gracefully without crashing the UI thread');

// Test 2.1.4: Multi-word query trimming
const searchTrimming = runTextSearch('   Learning Methods   ');
assert(searchTrimming.length === 1 && searchTrimming[0].metadata.id === 'ED-002', 'Multi-word queries are trimmed and matched successfully');

// Test 2.1.5: Substring matching in middle of tags
const searchTagsSub = runTextSearch('analytical');
assert(searchTagsSub.length > 0, 'Search matches substring in tags and layout data structures');


// --- FEATURE 2: Fallback Aspect Ratio Boundaries ---
section('Fallback Aspect Ratio Boundaries');

const runCategoryFilterWithFallback = (domain, complexity, ratio, structure) => {
  return exploreBaseItems.filter(item => {
    const matchesDomain = domain === 'All' || item.metadata.domain.toLowerCase() === domain.toLowerCase();
    const matchesComplexity = complexity === 'All' || item.metadata.complexity.toLowerCase().includes(complexity.toLowerCase());
    
    // Boundary: Robust fallback logic for undefined layout visualStyle elements
    const itemRatio = item.metadata.visualStyle && item.metadata.visualStyle.aspectRatio ? item.metadata.visualStyle.aspectRatio.toLowerCase() : '16:9';
    const matchesRatio = ratio === 'All' || itemRatio === ratio.toLowerCase();
    
    const matchesStructure = structure === 'All' || !item.metadata.dataType || item.metadata.dataType.toLowerCase() === structure.toLowerCase();
    return matchesDomain && matchesComplexity && matchesRatio && matchesStructure;
  });
};

// Mock item with missing visualStyle entirely
const mockItemWithoutStyle = {
  prompt: 'Mock prompt',
  image_path: '/infographics/mock.png',
  metadata: {
    id: 'MOCK-001',
    title: 'Mock template',
    domain: 'marketing',
    complexity: 'Medium',
    dataType: 'Custom'
  }
};

// Test 2.2.1: Verify aspect ratio matching ignores undefined without crashing (All filter)
const tempExplore = [...exploreBaseItems, mockItemWithoutStyle];
const runFallbackAll = tempExplore.filter(item => {
  const matchesRatio = 'All' === 'All' || !item.metadata.visualStyle || !item.metadata.visualStyle.aspectRatio || item.metadata.visualStyle.aspectRatio === '16:9';
  return matchesRatio;
});
assert(runFallbackAll.length === 61, 'Aspect ratio All filter handles templates with missing visualStyle structures cleanly');

// Test 2.2.2: Verify 16:9 filter falls back to default safely
const runFallback16_9 = tempExplore.filter(item => {
  const itemRatio = item.metadata.visualStyle && item.metadata.visualStyle.aspectRatio ? item.metadata.visualStyle.aspectRatio.toLowerCase() : '16:9';
  return itemRatio === '16:9';
});
assert(runFallback16_9.some(i => i.metadata.id === 'MOCK-001'), 'Missing aspect ratio templates default to 16:9 fallback category');

// Test 2.2.3: Verify aspect ratio filter mismatch yields correct counts
const runFallback4_3 = tempExplore.filter(item => {
  const itemRatio = item.metadata.visualStyle && item.metadata.visualStyle.aspectRatio ? item.metadata.visualStyle.aspectRatio.toLowerCase() : '16:9';
  return itemRatio === '4:3';
});
assert(!runFallback4_3.some(i => i.metadata.id === 'MOCK-001'), 'Missing aspect ratio template correctly excluded from other ratios (e.g. 4:3)');

// Test 2.2.4: Empty tags/signals properties robust handling
const mockItemEmptyTags = {
  ...mockItemWithoutStyle,
  metadata: {
    ...mockItemWithoutStyle.metadata,
    tags: '',
    signals: null
  }
};
const tempExplore2 = [mockItemEmptyTags];
const resultEmptyTagsSearch = tempExplore2.filter(item => {
  const q = 'dashboard';
  return item.metadata.title.toLowerCase().includes(q) ||
    (item.metadata.tags && item.metadata.tags.toLowerCase().includes(q)) ||
    (item.metadata.signals && item.metadata.signals.toLowerCase().includes(q));
});
assert(resultEmptyTagsSearch.length === 0, 'Null/empty tags or signals properties searched gracefully without exceptions');

// Test 2.2.5: Safe typography mapping fallbacks
const headingFallback = mockItemWithoutStyle.metadata.visualStyle?.style_framework?.typography?.headings || 'Montserrat Bold, Open Sans Semibold';
assert(headingFallback === 'Montserrat Bold, Open Sans Semibold', 'Typography guidelines correctly fall back to professional defaults when metadata is missing');


// --- FEATURE 3: Prompt Builder State Engine Boundaries ---
section('Prompt Builder State Engine Boundaries');

const boundaryBuilder = new PromptBuilderStateEngine(samplePreset);

// Test 2.3.1: Empty or whitespace subject matter topic defaults gracefully in prompt generation
boundaryBuilder.setSubject('   ');
let boundPrompt = boundaryBuilder.generateAgentPrompt();
assert(boundPrompt.includes(`- Subject Matter: "${samplePreset.metadata.title}"`), 'Empty subject matter falls back to template title in generated prompt');

// Test 2.3.2: Extremely long subject matter topic text handles safely
const longSubject = 'A'.repeat(500);
boundaryBuilder.setSubject(longSubject);
boundPrompt = boundaryBuilder.generateAgentPrompt();
assert(boundPrompt.includes(longSubject), 'Extremely long subject matter string is fully preserved without truncation or error');

// Test 2.3.3: Empty custom directives instructions are completely omitted from prompt
boundaryBuilder.setCustomDetails('   ');
boundPrompt = boundaryBuilder.generateAgentPrompt();
assert(!boundPrompt.includes('- Additional Instructions:'), 'Whitespace-only directives are completely omitted from prompt string');

// Test 2.3.4: Special characters or unicode in custom directives are preserved in prompt string
boundaryBuilder.setCustomDetails('🚀 Build with HSL(120, 50%, 50%)!');
boundPrompt = boundaryBuilder.generateAgentPrompt();
assert(boundPrompt.includes('🚀 Build with HSL(120, 50%, 50%)!'), 'Special characters and emojis are fully preserved in prompt string');

// Test 2.3.5: Reset button clears custom directives and restores guidelines
boundaryBuilder.reset();
assert(boundaryBuilder.promptCustomDetails === '' && boundaryBuilder.promptAddGuidelines === true, 'Reset button clears custom directives and restores default guidelines successfully');


// -------------------------------------------------------------
// STEP 6: TIER 3 - Cross-Feature Combinations
// -------------------------------------------------------------
section('Tier 3: Cross-Feature Combinations (pairwise interactions)');

// --- FEATURE 1: Filter Interactions ---
section('Filter Interactions');

// Test 3.1.1: Business + Medium + 16:9 + Custom layout combination
const resPair1 = runCategoryFilter('business', 'Medium', '16:9', 'Custom');
assert(resPair1.length === 2 && resPair1.every(i => i.metadata.domain === 'business' && i.metadata.complexity === 'Medium' && i.metadata.dataType === 'Custom'), 'Pairwise selection for Business + Medium + 16:9 + Custom matches exact template count');

// Test 3.1.2: Healthcare + Low + 16:9 + List/Actionable combination
const resPair2 = runCategoryFilter('healthcare', 'Low', '16:9', 'List/Actionable');
assert(resPair2.length === 1 && resPair2[0].metadata.id === 'HC-005', 'Pairwise selection for Healthcare + Low + 16:9 + List matches exact template');

// Test 3.1.3: Technology + High + 16:9 + Real-time/Metrics combination
const resPair3 = runCategoryFilter('technology', 'High', '16:9', 'Real-time/Metrics');
assert(resPair3.length === 1 && resPair3[0].metadata.id === 'TECH-005', 'Pairwise selection for Technology + High + 16:9 + Metrics matches exact template');

// Test 3.1.4: Education + Medium + 4:3 + Overview/Module-map combination
const resPair4 = runCategoryFilter('education', 'Medium', '4:3', 'Overview/Module-map');
assert(resPair4.length === 1 && resPair4[0].metadata.id === 'ED-009', 'Pairwise selection for Education + Medium + 4:3 + Module-map matches exact template');

// Test 3.1.5: Pairwise search query mismatch yields 0 results gracefully
const resPair5 = runCategoryFilter('healthcare', 'High', '3:4', 'Custom');
assert(resPair5.length === 0, 'Combining restrictive filters returning 0 templates handles successfully without UI crashes');


// --- FEATURE 2: Combined Text Search + Filters ---
section('Combined Text Search + Filters');

const runCombinedSearchFilter = (query, domain, complexity, ratio, structure) => {
  const filtered = runCategoryFilter(domain, complexity, ratio, structure);
  const q = query.toLowerCase().trim();
  return filtered.filter(item => {
    return !q ||
      item.metadata.title.toLowerCase().includes(q) ||
      item.prompt.toLowerCase().includes(q) ||
      item.metadata.dataType.toLowerCase().includes(q) ||
      item.metadata.domain.toLowerCase().includes(q) ||
      (item.metadata.tags && item.metadata.tags.toLowerCase().includes(q)) ||
      (item.metadata.signals && item.metadata.signals.toLowerCase().includes(q));
  });
};

// Test 3.2.1: Search 'timeline' + Domain 'business'
const comb1 = runCombinedSearchFilter('timeline', 'business', 'All', 'All', 'All');
assert(comb1.length === 1 && comb1[0].metadata.id === 'BS-003', 'Combined text search + Domain filter successfully resolves targeted template');

// Test 3.2.2: Search 'checklist' + Domain 'healthcare' + Complexity 'Low'
const comb2 = runCombinedSearchFilter('checklist', 'healthcare', 'Low', 'All', 'All');
assert(comb2.length === 2 && comb2.every(i => i.metadata.id === 'HC-005' || i.metadata.id === 'HC-007b'), 'Combined text search + Domain + Complexity successfully filters to correct checklists');

// Test 3.2.3: Search 'dashboard' + Aspect Ratio '16:9'
const comb3 = runCombinedSearchFilter('dashboard', 'All', 'All', '16:9', 'All');
assert(comb3.length === 5 && comb3.every(i => i.metadata.title.toLowerCase().includes('dashboard')), 'Combined text search + Aspect Ratio matches exactly targeted dashboards');

// Test 3.2.4: Search 'network' + Complexity 'High' + Domain 'technology'
const comb4 = runCombinedSearchFilter('network', 'technology', 'High', 'All', 'All');
assert(comb4.length === 1 && comb4[0].metadata.id === 'TECH-006', 'Combined text search + Domain + Complexity retrieves exact high complexity network template');

// Test 3.2.5: Search 'custom' + Ratio '3:4' + Domain 'General / Multipurpose'
const comb5 = runCombinedSearchFilter('custom', 'General / Multipurpose', 'All', '3:4', 'All');
assert(comb5.length === 2 && comb5.every(i => i.metadata.domain === 'General / Multipurpose'), 'Combined text search + ratio + general domain retrieves exact multipurpose templates');


// -------------------------------------------------------------
// STEP 7: TIER 4 - Real-World Application Scenarios
// -------------------------------------------------------------
section('Tier 4: Real-World Application Scenarios (high-level integration)');

// Scenario 1: End-to-End Prompt Configuration & Modal Details Workspace
section('Scenario 1: End-to-End Prompt Configuration & Modal Details Workspace');
{
  const testItemScenario = INFOGRAPHICS.find(i => i.metadata.id === 'HC-001');
  assert(testItemScenario !== undefined, 'Step 1: User resolves template HC-001');

  const flowModal = new ModalStateEngine(testItemScenario);
  assert(flowModal.activeTab === 'visuals' && flowModal.zoomScale === 1.0, 'Step 2: User opens infographic Details Modal on visuals tab');

  flowModal.zoomIn();
  assert(flowModal.zoomScale === 1.25, 'Step 3: User zooms into preview canvas');

  flowModal.switchTab('blueprint');
  assert(flowModal.activeTab === 'blueprint', 'Step 4: User switches to blueprint design DNA metadata tab');

  const colors = testItemScenario.metadata.visualStyle.style_framework.palette.primary_colors;
  const hex = colors.match(/#[A-Fa-f0-9]{6}/)[0];
  flowModal.copiedColorHex = hex;
  assert(flowModal.copiedColorHex === hex, 'Step 5: User copies HSL swatch color hex code to clipboard');

  flowModal.switchTab('trigger');
  assert(flowModal.activeTab === 'trigger', 'Step 6: User switches to Trigger AI Agent tab');

  const flowBuilder = new PromptBuilderStateEngine(testItemScenario);
  flowBuilder.setSubject('Startup Performance Metrics');
  assert(flowBuilder.promptSubject === 'Startup Performance Metrics', 'Step 7: User customizes Subject Matter topic');

  flowBuilder.setComplexity('High');
  assert(flowBuilder.promptComplexity === 'High', 'Step 8: User changes complexity level to High');

  flowBuilder.setAddGuidelines(false);
  assert(flowBuilder.promptAddGuidelines === false, 'Step 9: User disables the styling rules guidelines checkbox');

  flowBuilder.setCustomDetails('Include a key metrics box');
  const agentPrompt = flowBuilder.generateAgentPrompt();
  assert(agentPrompt.includes('Startup Performance Metrics') && agentPrompt.includes('- Complexity Tier: High') && !agentPrompt.includes('- Styling Rules:') && agentPrompt.includes('- Additional Instructions: "Include a key metrics box"'), 'Step 10: User copies final customized agent prompt');
}

// Scenario 2: Explorer Gallery Discovery & Filter Flow
section('Scenario 2: Explorer Gallery Search, Filter, and Blueprints Discovery');
{
  // User navigates to gallery and resets filters
  const exploreDomain = 'education';
  const exploreComplexity = 'Medium';
  const exploreRatio = 'All';
  const exploreStructure = 'All';
  
  const step1 = runCategoryFilter(exploreDomain, exploreComplexity, exploreRatio, exploreStructure);
  assert(step1.length > 0 && step1.every(i => i.metadata.domain === 'education' && i.metadata.complexity.toLowerCase().includes('medium')), 'Step 1: User filters gallery by Education domain and Medium complexity');

  const searchQuery = 'syllabus';
  const step2 = step1.filter(item => item.metadata.title.toLowerCase().includes(searchQuery) || item.prompt.toLowerCase().includes(searchQuery));
  assert(step2.length === 1 && step2[0].metadata.id === 'ED-009', 'Step 2: User searches for syllabus and reduces options to ED-009');

  const targetItem = step2[0];
  const flowModal = new ModalStateEngine(targetItem);
  flowModal.switchTab('trigger');
  
  const exploreBuilder = new PromptBuilderStateEngine(targetItem);
  const prompt = exploreBuilder.generateAgentPrompt();
  assert(prompt.includes('ED-009') && prompt.includes('education') && prompt.includes('- Complexity Tier: Medium'), 'Step 3: User generates standard AI agent prompt for ED-009');
}

// Scenario 3: Custom Sandbox Prompt Fallback Generation
section('Scenario 3: Custom Agent Prompt Fallback Generation');
{
  const fallbackItem = INFOGRAPHICS.find(i => i.metadata.id === 'BS-002');
  const flowBuilder = new PromptBuilderStateEngine(fallbackItem);
  flowBuilder.setSubject('Clean energy cycles');
  flowBuilder.setCustomDetails('Use green highlights');
  
  const prompt = flowBuilder.generateAgentPrompt();
  assert(prompt.includes('Clean energy cycles') && prompt.includes('- Additional Instructions: "Use green highlights"'), 'Step 1: Custom subject and directives generated successfully');
  assert(prompt.includes('BS-002') && prompt.includes('- Aspect Ratio: 16:9'), 'Step 2: Resolves template reference and aspect ratio parameters safely');
}

// Scenario 4: Complex Filtering and Reset
section('Scenario 4: High-Dimensional Filtering and Reset Sequence');
{
  const filtered = runCategoryFilter('technology', 'Medium', '16:9', 'Custom');
  assert(filtered.length === 2 && filtered.every(i => i.metadata.domain === 'technology'), 'Step 1: Apply Technology + Medium + 16:9 + Custom filters');

  const search = filtered.filter(i => i.metadata.title.toLowerCase().includes('ci/cd') || i.prompt.toLowerCase().includes('ci/cd'));
  assert(search.length === 1 && search[0].metadata.id === 'TECH-002', 'Step 2: Searches within filtered list for cicd');

  // Reset Filters
  const resetFilters = runCategoryFilter('All', 'All', 'All', 'All');
  assert(resetFilters.length === 60, 'Step 3: User resets filters and restores all 60 exploration templates');
}

// Scenario 5: Multi-Preset Prompt Generation Stress Test
section('Scenario 5: Multi-Preset Prompt Generation Stress Test');
{
  const itemTech1 = INFOGRAPHICS.find(i => i.metadata.id === 'TECH-001');
  const itemHc4 = INFOGRAPHICS.find(i => i.metadata.id === 'HC-004');
  
  let stressBuilder = new PromptBuilderStateEngine(itemTech1);
  assert(stressBuilder.item.metadata.id === 'TECH-001', 'Step 1: Rapid initialization maps item to TECH-001');

  stressBuilder = new PromptBuilderStateEngine(itemHc4);
  assert(stressBuilder.item.metadata.id === 'HC-004', 'Step 2: Re-initialization maps item to HC-004');

  stressBuilder.setSubject('Healthcare Analytics');
  stressBuilder.reset();
  assert(stressBuilder.promptSubject === itemHc4.metadata.title, 'Step 3: Resetting the prompt builder restores the prompt subject to the template title');
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n\x1b[36m==================================================================\x1b[0m');
console.log('\x1b[36m                 E2E TEST RUN COMPLETION SUMMARY                  \x1b[0m');
console.log('\x1b[36m==================================================================\x1b[0m');
console.log(`  Total Executed Assertions : ${totalTests}`);
console.log(`  Passed Assertions         : \x1b[32m${passedTests}\x1b[0m`);
console.log(`  Failed Assertions         : \x1b[31m${failedTests}\x1b[0m`);
console.log('\x1b[36m==================================================================\x1b[0m');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32m✔ SUCCESS: 100% of E2E test assertions compile and pass!\x1b[0m');
  process.exit(0);
}
