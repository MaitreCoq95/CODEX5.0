'use client';

import { useState, useEffect } from 'react';
import { MetricCard, LineChart, BarChart, ActivityTimeline, AlertsList } from '@/components/analytics';

const ANALYTICS_API_URL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL || 'http://localhost:3005';

interface UserDashboard {
  user: {
    id: string;
    level: number;
    xp: number;
    streak: number;
  };
  metrics: {
    overallScore: number;
    scoreChange: number;
    modulesCompleted: number;
    modulesInProgress: number;
    modulesTotal: number;
    quizzesCompleted: number;
    totalCorrect: number;
    totalQuestions: number;
    streakDays: number;
    longestStreak: number;
    eventsLast7d: number;
    eventsLast30d: number;
  };
  progressHistory: {
    date: string;
    score: number;
    count: number;
  }[];
  recentActivity: {
    id: string;
    type: string;
    page?: string;
    timestamp: string;
    data?: Record<string, any>;
  }[];
  certifications: any[];
  alerts: any[];
}

interface RealTimeMetrics {
  timestamp: string;
  activeUsers: number;
  eventsLastHour: number;
  eventsPerMinute: number;
  breakdown: {
    type: string;
    count: number;
  }[];
}

export default function AnalyticsPage() {
  const [dashboard, setDashboard] = useState<UserDashboard | null>(null);
  const [realtime, setRealtime] = useState<RealTimeMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated user ID - in production, get from auth context
  const userId = 'demo-user';

  useEffect(() => {
    fetchDashboard();
    fetchRealtime();

    // Refresh realtime every 30 seconds
    const interval = setInterval(fetchRealtime, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDashboard() {
    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/metrics/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard');
      }

      const result = await response.json();
      setDashboard(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRealtime() {
    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/metrics/realtime`);
      
      if (response.ok) {
        const result = await response.json();
        setRealtime(result.data);
      }
    } catch (err) {
      // Silently fail for realtime
      console.warn('Failed to fetch realtime metrics');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des métriques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-6 max-w-md">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mt-3">
            Erreur de chargement
          </h2>
          <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
          <button
            onClick={() => { setLoading(true); fetchDashboard(); }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const metrics = dashboard?.metrics;
  const user = dashboard?.user;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Pilotage & Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivez votre progression et vos performances
          </p>
        </div>
        
        {/* Real-time indicator */}
        {realtime && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-700 dark:text-green-300">
              {realtime.activeUsers} actif(s) maintenant
            </span>
          </div>
        )}
      </div>

      {/* User Level Card */}
      {user && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-sm">Niveau actuel</p>
              <p className="text-4xl font-bold mt-1">Niveau {user.level}</p>
              <p className="text-indigo-200 mt-2">{user.xp} XP total</p>
            </div>
            <div className="text-6xl">🏆</div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-indigo-200 mb-1">
              <span>Progression niveau {user.level + 1}</span>
              <span>{user.xp % 100}/100 XP</span>
            </div>
            <div className="w-full bg-indigo-400/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${user.xp % 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Score Global"
          value={`${metrics?.overallScore || 0}%`}
          icon="📊"
          change={metrics?.scoreChange}
          trend={metrics?.scoreChange && metrics.scoreChange > 0 ? 'up' : metrics?.scoreChange && metrics.scoreChange < 0 ? 'down' : 'neutral'}
        />
        
        <MetricCard
          title="Modules Complétés"
          value={`${metrics?.modulesCompleted || 0}/${metrics?.modulesTotal || 10}`}
          icon="📚"
          percentage={metrics?.modulesTotal ? ((metrics?.modulesCompleted || 0) / metrics.modulesTotal) * 100 : 0}
        />
        
        <MetricCard
          title="Quiz Réussis"
          value={`${metrics?.quizzesCompleted || 0}`}
          icon="🎯"
          subtitle={metrics?.totalQuestions ? `${metrics.totalCorrect}/${metrics.totalQuestions} bonnes réponses` : undefined}
        />
        
        <MetricCard
          title="Streak"
          value={`${metrics?.streakDays || 0} jours`}
          icon="🔥"
          subtitle={`Record: ${metrics?.longestStreak || 0} jours`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <LineChart
            data={dashboard?.progressHistory || []}
            xKey="date"
            yKey="score"
            title="Évolution Score (6 mois)"
            color="#6366f1"
          />
        </div>

        {/* Activity by Type */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <BarChart
            data={realtime?.breakdown?.map(b => ({ name: b.type.replace('_', ' '), value: b.count })) || []}
            title="Activité par Type (1h)"
            height={260}
          />
        </div>
      </div>

      {/* Bottom Section: Activity + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Activité Récente
          </h2>
          <ActivityTimeline activities={dashboard?.recentActivity || []} />
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Alertes & Notifications
          </h2>
          <AlertsList 
            alerts={dashboard?.alerts || []}
            onAcknowledge={(alertId) => console.log('Acknowledge:', alertId)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Résumé d'activité
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {metrics?.eventsLast7d || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Événements (7j)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {metrics?.eventsLast30d || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Événements (30j)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {realtime?.eventsLastHour || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dernière heure</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {realtime?.eventsPerMinute || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Par minute</p>
          </div>
        </div>
      </div>
    </div>
  );
}
