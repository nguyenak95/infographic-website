/**
 * Palette colors used in the visual style
 */
export interface ColorPalette {
  primary_colors?: string;
  accent_colors?: string;
  background?: string;
}

/**
 * Typography guidelines for headings and body text
 */
export interface TypographyStyle {
  headings?: string;
  body?: string;
}

/**
 * Surface treatments details
 */
export interface SurfaceTreatments {
  shapes?: string;
  depth_and_borders?: string;
}

/**
 * Detailed style framework
 */
export interface StyleFramework {
  palette?: ColorPalette;
  typography?: TypographyStyle;
  surface_treatments?: SurfaceTreatments;
  components?: string[];
  tone?: string;
}

/**
 * Layout template coordinates and mappings
 */
export interface LayoutTemplate {
  grid_structure?: string;
  spatial_mapping?: Record<string, string>;
}

/**
 * Visual style definition
 */
export interface VisualStyle {
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1' | '9:16' | string;
  layout_template?: LayoutTemplate;
  style_framework?: StyleFramework;
  notes?: string;
}

/**
 * Reusable abstract template details
 */
export interface TemplateSeed {
  styleSummary?: string;
  layoutPattern?: string;
  reusableElements?: string[];
  abstract?: string[];
  notes?: string;
}

/**
 * Metadata definition for an Infographic item
 */
export interface InfographicMetadata {
  id: string;
  title: string;
  domain: 'healthcare' | 'education' | 'marketing' | 'business' | 'technology' | 'General / Multipurpose' | string;
  complexity: 'Low' | 'Medium' | 'High' | 'Low-Medium' | string;
  dataType: string;
  tags?: string; // Semicolon-separated tags
  signals?: string; // Semicolon-separated search keywords
  inputPattern?: string;
  visualStyle: VisualStyle;
  contentSummary?: string;
  templateSeed?: TemplateSeed;
}

/**
 * Top-level Database item structure representing an Infographic
 */
export interface Infographic {
  prompt: string;
  image_path: string;
  metadata: InfographicMetadata;
}

/**
 * Alias matching the generated database imports
 */
export type InfographicItem = Infographic;
