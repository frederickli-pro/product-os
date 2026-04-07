import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoadmapItems } from '@/components/engine-3/roadmap-items';
import { roadmapItems } from '@/data/mock/prd-templates';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, onKeyDown, role, tabIndex, ...props }: any) => {
      const { initial, animate, transition, exit, ...rest } = props;
      return <div onClick={onClick} onKeyDown={onKeyDown} role={role} tabIndex={tabIndex} {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('RoadmapItems', () => {
  const mockOnSelectItem = jest.fn();
  const mockOnGeneratePRD = jest.fn();

  beforeEach(() => {
    mockOnSelectItem.mockClear();
    mockOnGeneratePRD.mockClear();
  });

  it('renders all roadmap items with priority scores and reasoning', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={null}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    expect(screen.getByTestId('roadmap-items')).toBeInTheDocument();

    // Check all items are rendered
    expect(screen.getByTestId('roadmap-item-roadmap-001')).toBeInTheDocument();
    expect(screen.getByTestId('roadmap-item-roadmap-002')).toBeInTheDocument();
    expect(screen.getByTestId('roadmap-item-roadmap-003')).toBeInTheDocument();
  });

  it('displays Unified Scheduling-Compliance Platform as top priority with 87% confidence', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={roadmapItems[0]}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    // Check priority badge
    const priorityBadge = screen.getByTestId('priority-badge-roadmap-001');
    expect(priorityBadge).toHaveTextContent('1');

    // Check confidence score
    const confidenceScore = screen.getByTestId('confidence-score-roadmap-001');
    expect(confidenceScore).toHaveTextContent('87%');

    // Check name
    const itemName = screen.getByTestId('roadmap-item-name-roadmap-001');
    expect(itemName).toHaveTextContent('Unified Scheduling-Compliance Platform');
  });

  it('displays reasoning for roadmap items', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={roadmapItems[0]}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    // Check reasoning is displayed (first 2 items)
    expect(screen.getByTestId('reasoning-roadmap-001-0')).toHaveTextContent(
      "Addresses #1 customer request (47% of support tickets)"
    );
  });

  it('calls onSelectItem when clicking a roadmap item', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={null}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    const item = screen.getByTestId('roadmap-item-roadmap-002');
    fireEvent.click(item);

    expect(mockOnSelectItem).toHaveBeenCalledWith(roadmapItems[1]);
  });

  it('shows Generate PRD button when item is selected', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={roadmapItems[0]}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    const generateButton = screen.getByTestId('generate-prd-button-roadmap-001');
    expect(generateButton).toBeInTheDocument();
  });

  it('calls onGeneratePRD when clicking Generate PRD button', () => {
    render(
      <RoadmapItems
        items={roadmapItems}
        selectedItem={roadmapItems[0]}
        onSelectItem={mockOnSelectItem}
        onGeneratePRD={mockOnGeneratePRD}
      />
    );

    const generateButton = screen.getByTestId('generate-prd-button-roadmap-001');
    fireEvent.click(generateButton);

    expect(mockOnGeneratePRD).toHaveBeenCalledWith(roadmapItems[0]);
  });
});
