import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { OrgUnit, orgHierarchy, findUnit, getAncestorPath } from './dashboardAnalitikData';

interface HierarchicalFilterProps {
  selectedUnit: string;
  onSelect: (unitId: string) => void;
}

export function HierarchicalFilter({ selectedUnit, onSelect }: HierarchicalFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const path = getAncestorPath(selectedUnit);
    // always expand root so level-1 children are visible; also expand ancestors of selection
    return new Set(['kementerian', ...path.slice(0, -1)]);
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = getAncestorPath(selectedUnit);
    setExpandedIds(prev => new Set([...prev, ...path.slice(0, -1)]));
  }, [selectedUnit]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const selectedUnitObj = findUnit(orgHierarchy, selectedUnit);
  const displayName = selectedUnitObj?.name || selectedUnit;

  const toggleExpand = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  const handleSelect = (unit: OrgUnit) => {
    onSelect(unit.id);
    setIsOpen(false);
  };

  const renderTree = (unit: OrgUnit, level: number = 0): React.ReactNode => {
    const isExpanded = expandedIds.has(unit.id);
    const hasChildren = !!(unit.children && unit.children.length > 0);
    const isSelected = unit.id === selectedUnit;

    return (
      <div key={unit.id}>
        <div
          className={`flex items-center gap-[6px] py-[6px] pr-[12px] cursor-pointer rounded-[4px] transition-colors ${
            isSelected
              ? 'bg-primary/10 text-primary'
              : 'text-sd-gray-90 hover:bg-sd-gray-0'
          }`}
          style={{ paddingLeft: `${8 + level * 18}px` }}
          onClick={() => handleSelect(unit)}
        >
          <button
            type="button"
            onClick={hasChildren ? (e) => toggleExpand(unit.id, e) : undefined}
            className="w-[16px] h-[16px] flex items-center justify-center shrink-0 text-sd-gray-60"
          >
            {hasChildren ? (
              isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
            ) : (
              <span className="w-[4px] h-[4px] rounded-full bg-sd-gray-20 inline-block" />
            )}
          </button>
          <span
            className={`text-[var(--text-sm)] leading-snug ${
              isSelected ? 'font-[var(--font-weight-semibold)]' : ''
            } ${level === 0 ? 'font-[var(--font-weight-medium)]' : ''}`}
          >
            {unit.name}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div>{unit.children!.map(child => renderTree(child, level + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-[8px] px-[12px] py-[8px] border border-sd-gray-50 rounded-[4px] bg-white hover:border-primary transition-colors text-left min-w-[260px] max-w-[420px]"
      >
        <span className="flex-1 text-[var(--text-sm)] text-sd-gray-90 truncate">{displayName}</span>
        <ChevronDown
          className={`w-[16px] h-[16px] shrink-0 text-sd-gray-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-[4px] z-50 bg-white border border-sd-badge-neutral rounded-[8px] shadow-lg w-[460px] max-h-[480px] overflow-y-auto py-[8px]">
          {renderTree(orgHierarchy)}
        </div>
      )}
    </div>
  );
}
