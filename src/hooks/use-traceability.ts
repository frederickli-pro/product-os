'use client';

import { useState, useCallback } from 'react';

interface TraceabilityLink {
  id: string;
  sourceType: 'diagnostic' | 'prioritization' | 'execution' | 'governance';
  sourceId: string;
  targetType: 'diagnostic' | 'prioritization' | 'execution' | 'governance';
  targetId: string;
  description: string;
}

export function useTraceability() {
  const [links, setLinks] = useState<TraceabilityLink[]>([]);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const addLink = useCallback((link: Omit<TraceabilityLink, 'id'>) => {
    const newLink: TraceabilityLink = {
      ...link,
      id: `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setLinks((prev) => [...prev, newLink]);
    return newLink.id;
  }, []);

  const getLinksForSource = useCallback(
    (sourceType: string, sourceId: string) => {
      return links.filter(
        (link) => link.sourceType === sourceType && link.sourceId === sourceId
      );
    },
    [links]
  );

  const getLinksForTarget = useCallback(
    (targetType: string, targetId: string) => {
      return links.filter(
        (link) => link.targetType === targetType && link.targetId === targetId
      );
    },
    [links]
  );

  const highlightConnection = useCallback((linkId: string) => {
    setActiveHighlight(linkId);
  }, []);

  const clearHighlight = useCallback(() => {
    setActiveHighlight(null);
  }, []);

  return {
    links,
    addLink,
    getLinksForSource,
    getLinksForTarget,
    highlightConnection,
    clearHighlight,
    activeHighlight,
  };
}
