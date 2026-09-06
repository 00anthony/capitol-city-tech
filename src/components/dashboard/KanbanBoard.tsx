import React from 'react';
import type { ProjectBoard, TaskCard } from '@/types';
import { UserSilhouette } from './ClientAvatar';

const COLUMNS = [
  { title: 'To do', key: 'todo', color: 'bg-pink-500' },
  { title: 'In progress', key: 'inProgress', color: 'bg-yellow-500' },
  { title: 'In review', key: 'inReview', color: 'bg-blue-500' },
  { title: 'Complete', key: 'complete', color: 'bg-green-500' },
] as const;

const TaskCardView = ({ card }: { card: TaskCard }) => (
  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer shadow-lg shadow-black/20 block hover:bg-white/[0.07]">
    <h3 className="text-xs font-semibold text-slate-200 mb-1">{card.title}</h3>
    <p className="text-[10px] text-slate-400 mb-4 leading-relaxed line-clamp-2">{card.desc}</p>
    <div className="flex items-center justify-between">
      <span className={`px-2 py-0.5 rounded text-[9px] font-medium border ${card.tagColor}`}>{card.tag}</span>
      <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10"><UserSilhouette /></div>
    </div>
  </div>
);

export const KanbanBoard: React.FC<{ board: ProjectBoard }> = ({ board }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {COLUMNS.map(col => (
      <div key={col.key} className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-slate-950/20 backdrop-blur-sm py-1 z-10">
          <div className={`w-1 h-4 rounded-full ${col.color}`}></div>
          <span className="text-xs font-medium text-white">{col.title}</span>
          <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-500">
            {board[col.key].length}
          </span>
        </div>
        {board[col.key].length > 0
          ? board[col.key].map(card => <TaskCardView key={card.id} card={card} />)
          : <p className="text-[10px] text-slate-600 italic">Nothing here.</p>
        }
      </div>
    ))}
  </div>
);
