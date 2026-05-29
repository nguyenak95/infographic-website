import React, { useState, useMemo } from 'react';
import { INFOGRAPHICS } from '../data/infographics';
import { GalleryView } from './GalleryView';
import type { Infographic } from '../data/types';
import type { Language } from '../i18n/translations';

interface GalleryContainerProps {
  lang?: Language;
}

export const GalleryContainer: React.FC<GalleryContainerProps> = ({ lang = 'en' }) => {
  // 5 State Hooks
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDomain, setActiveDomain] = useState<string>('All');
  const [activeComplexity, setActiveComplexity] = useState<string>('All');
  const [activeRatio, setActiveRatio] = useState<string>('All');
  const [activeStructure, setActiveStructure] = useState<string>('All');

  // Featured Hero Selection State
  const [activeFeaturedHeroId, setActiveFeaturedHeroId] = useState<string>('BS-002');

  // Modal & Copy state
  const [selectedItem, setSelectedItem] = useState<Infographic | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Hardcoded premium IDs
  const PREMIUM_IDS = useMemo(() => ['BS-002', 'MK-005', 'TECH-001', 'HC-004', 'ED-001', 'MK-001', 'BS-001'], []);

  // 1. Separate the 7 premium showcases
  const featuredItems = useMemo(() => {
    return PREMIUM_IDS.map(id => INFOGRAPHICS.find(item => item.metadata.id === id)).filter(Boolean) as Infographic[];
  }, [PREMIUM_IDS]);

  // 2. Extract remaining 60 templates for explore view
  const exploreBaseItems = useMemo(() => {
    return INFOGRAPHICS.filter(item => !PREMIUM_IDS.includes(item.metadata.id));
  }, [PREMIUM_IDS]);

  // 3. Dynamic Filter Options & Counts
  const domains = useMemo(() => {
    const set = new Set<string>();
    exploreBaseItems.forEach(item => {
      const domain = item?.metadata?.domain || '';
      if (domain) set.add(domain);
    });
    return Array.from(set);
  }, [exploreBaseItems]);

  const dataTypes = useMemo(() => {
    const set = new Set<string>();
    exploreBaseItems.forEach(item => {
      const dataType = item?.metadata?.dataType || '';
      if (dataType) set.add(dataType);
    });
    return Array.from(set);
  }, [exploreBaseItems]);

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    exploreBaseItems.forEach(item => {
      const dom = item?.metadata?.domain || '';
      if (dom) {
        counts[dom] = (counts[dom] || 0) + 1;
      }
    });
    return counts;
  }, [exploreBaseItems]);

  // 4. Combined Filtering logic for the 60 exploratory templates
  const filteredExploreItems = useMemo(() => {
    return exploreBaseItems.filter(item => {
      // Search matching (title, prompt, tags, dataType, domain, signals)
      const q = searchQuery.toLowerCase().trim();
      const title = item?.metadata?.title || '';
      const prompt = item?.prompt || '';
      const dataType = item?.metadata?.dataType || '';
      const domain = item?.metadata?.domain || '';
      const tags = item?.metadata?.tags || '';
      const signals = item?.metadata?.signals || '';
      const complexityVal = item?.metadata?.complexity || '';

      const matchesSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        prompt.toLowerCase().includes(q) ||
        dataType.toLowerCase().includes(q) ||
        domain.toLowerCase().includes(q) ||
        tags.toLowerCase().includes(q) ||
        signals.toLowerCase().includes(q) ||
        complexityVal.toLowerCase().includes(q);

      // Domain matching
      const matchesDomain =
        activeDomain === 'All' ||
        domain.toLowerCase() === activeDomain.toLowerCase();

      // Complexity matching (robust matching for Low-Medium, etc.)
      const complexity = item?.metadata?.complexity || '';
      const matchesComplexity =
        activeComplexity === 'All' ||
        complexity.toLowerCase().includes(activeComplexity.toLowerCase());

      // Aspect Ratio matching (ensuring safe fallbacks for undefined visualStyle or aspectRatio)
      const aspectRatio = item?.metadata?.visualStyle?.aspectRatio || '';
      const matchesRatio =
        activeRatio === 'All' ||
        aspectRatio.toLowerCase() === activeRatio.toLowerCase();

      // DataType (Structure) matching
      const matchesStructure =
        activeStructure === 'All' ||
        dataType.toLowerCase() === activeStructure.toLowerCase();

      return matchesSearch && matchesDomain && matchesComplexity && matchesRatio && matchesStructure;
    });
  }, [exploreBaseItems, searchQuery, activeDomain, activeComplexity, activeRatio, activeStructure]);

  // Handlers
  const handleFilterChange = (filterKey: string, value: string) => {
    if (filterKey === 'search') setSearchQuery(value);
    else if (filterKey === 'domain') setActiveDomain(value);
    else if (filterKey === 'complexity') setActiveComplexity(value);
    else if (filterKey === 'aspectRatio') setActiveRatio(value);
    else if (filterKey === 'dataType') setActiveStructure(value);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveDomain('All');
    setActiveComplexity('All');
    setActiveRatio('All');
    setActiveStructure('All');
  };

  const handleSelectItem = (item: Infographic | null) => {
    setSelectedItem(item);
  };

  const handleCopyPrompt = (prompt: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(prompt)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy prompt to clipboard:', err);
        });
    } else {
      console.warn('Clipboard writing is not supported in this environment.');
    }
  };

  const handleSelectFeaturedHero = (id: string) => {
    setActiveFeaturedHeroId(id);
  };

  return (
    <GalleryView
      lang={lang}
      featuredItems={featuredItems}
      exploreItems={filteredExploreItems}
      activeFilters={{
        search: searchQuery,
        domain: activeDomain,
        complexity: activeComplexity,
        aspectRatio: activeRatio,
        dataType: activeStructure,
      }}
      filterOptions={{
        domains,
        complexities: ['Low', 'Medium', 'High'],
        aspectRatios: ['16:9', '4:3', '3:4', '1:1', '9:16'],
        dataTypes,
      }}
      domainCounts={domainCounts}
      selectedItem={selectedItem}
      copied={copied}
      activeFeaturedHeroId={activeFeaturedHeroId}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
      onSelectItem={handleSelectItem}
      onCopyPrompt={handleCopyPrompt}
      onSelectFeaturedHero={handleSelectFeaturedHero}
    />
  );
};
