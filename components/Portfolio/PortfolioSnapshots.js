'use client';

import Image from 'next/image';

export default function PortfolioSnapshots({ snapshots, onViewImage }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-4">
      {snapshots.map((snap, idx) => (
        <div
          key={idx}
          className="relative h-28 sm:h-32 w-full rounded-md overflow-hidden cursor-zoom-in group"
          onClick={() => onViewImage(idx)}
        >
          <Image
            src={snap.asset.url}
            alt={`Snapshot ${idx + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
