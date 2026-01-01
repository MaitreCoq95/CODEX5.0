'use client';

import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: string;
  page?: string;
  timestamp: string;
  data?: Record<string, any>;
}

interface ActivityTimelineProps {
  activities: Activity[];
  className?: string;
}

const eventTypeLabels: Record<string, string> = {
  page_view: 'Page visitée',
  module_started: 'Module démarré',
  module_completed: 'Module terminé',
  module_viewed: 'Module consulté',
  lesson_completed: 'Leçon terminée',
  quiz_started: 'Quiz démarré',
  quiz_completed: 'Quiz terminé',
  assessment_started: 'Évaluation démarrée',
  assessment_completed: 'Évaluation terminée',
  certification_obtained: 'Certification obtenue',
  user_login: 'Connexion',
  user_logout: 'Déconnexion',
};

const eventTypeIcons: Record<string, string> = {
  page_view: '👁️',
  module_started: '📖',
  module_completed: '✅',
  module_viewed: '📚',
  lesson_completed: '📝',
  quiz_started: '❓',
  quiz_completed: '🎯',
  assessment_started: '📋',
  assessment_completed: '📊',
  certification_obtained: '🏆',
  user_login: '🔐',
  user_logout: '👋',
};

const eventTypeColors: Record<string, string> = {
  page_view: 'bg-gray-100 text-gray-600',
  module_started: 'bg-blue-100 text-blue-600',
  module_completed: 'bg-green-100 text-green-600',
  module_viewed: 'bg-indigo-100 text-indigo-600',
  lesson_completed: 'bg-purple-100 text-purple-600',
  quiz_started: 'bg-amber-100 text-amber-600',
  quiz_completed: 'bg-emerald-100 text-emerald-600',
  assessment_started: 'bg-orange-100 text-orange-600',
  assessment_completed: 'bg-teal-100 text-teal-600',
  certification_obtained: 'bg-yellow-100 text-yellow-600',
  user_login: 'bg-cyan-100 text-cyan-600',
  user_logout: 'bg-slate-100 text-slate-600',
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "À l'instant";
  if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)}j`;
  return date.toLocaleDateString('fr-FR');
}

export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className={cn(
        'bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center',
        className
      )}>
        <p className="text-gray-500 dark:text-gray-400">Aucune activité récente</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {activities.slice(0, 10).map((activity, index) => (
        <div
          key={activity.id || index}
          className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 hover:shadow-sm transition-shadow"
        >
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0',
            eventTypeColors[activity.type] || 'bg-gray-100 text-gray-600'
          )}>
            {eventTypeIcons[activity.type] || '📌'}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {eventTypeLabels[activity.type] || activity.type}
            </p>
            
            {activity.page && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {activity.page}
              </p>
            )}
            
            {activity.data?.score !== undefined && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                Score: {activity.data.score}%
              </p>
            )}
            
            {activity.data?.moduleName && (
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                {activity.data.moduleName}
              </p>
            )}
          </div>
          
          <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}
