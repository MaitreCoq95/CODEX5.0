'use client';

import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description?: string;
  recommendedActions?: string[];
  createdAt: string;
}

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (alertId: string) => void;
  className?: string;
}

const severityStyles = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'ℹ️',
    text: 'text-blue-800 dark:text-blue-200',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: '⚠️',
    text: 'text-amber-800 dark:text-amber-200',
  },
  critical: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: '🚨',
    text: 'text-red-800 dark:text-red-200',
  },
};

export function AlertCard({ alert, onAcknowledge, className }: AlertCardProps) {
  const styles = severityStyles[alert.severity] || severityStyles.info;

  return (
    <div className={cn(
      'rounded-lg border p-4',
      styles.bg,
      styles.border,
      className
    )}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{styles.icon}</span>
        
        <div className="flex-1">
          <h4 className={cn('font-semibold', styles.text)}>
            {alert.title}
          </h4>
          
          {alert.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {alert.description}
            </p>
          )}
          
          {alert.recommendedActions && alert.recommendedActions.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                Actions recommandées
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {alert.recommendedActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {new Date(alert.createdAt).toLocaleString('fr-FR')}
            </span>
            
            {onAcknowledge && (
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                Prendre en compte
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AlertsListProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
  className?: string;
}

export function AlertsList({ alerts, onAcknowledge, className }: AlertsListProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className={cn(
        'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center',
        className
      )}>
        <span className="text-2xl">✅</span>
        <p className="text-green-800 dark:text-green-200 mt-2">
          Aucune alerte active
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {alerts.map((alert) => (
        <AlertCard 
          key={alert.id} 
          alert={alert} 
          onAcknowledge={onAcknowledge}
        />
      ))}
    </div>
  );
}
