import React from 'react';

interface Props {
  viewMode: 'grid' | 'list';
}

export default function ProductSkeleton({ viewMode }: Props) {
  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden p-4">
        <div className="flex gap-4">
          <div className="w-28 h-28 rounded-xl animate-shimmer shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-20 animate-shimmer rounded-full" />
            <div className="h-4 w-3/4 animate-shimmer rounded-lg" />
            <div className="h-3 w-24 animate-shimmer rounded-full" />
            <div className="h-5 w-28 animate-shimmer rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="aspect-square animate-shimmer" />
      <div className="p-3.5 space-y-2.5">
        <div className="h-3 w-20 animate-shimmer rounded-full" />
        <div className="h-4 w-full animate-shimmer rounded-lg" />
        <div className="h-3 w-3/4 animate-shimmer rounded-lg" />
        <div className="h-3 w-24 animate-shimmer rounded-full" />
        <div className="h-5 w-28 animate-shimmer rounded-lg" />
      </div>
    </div>
  );
}