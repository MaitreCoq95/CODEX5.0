'use client';

import { useState, useEffect } from 'react';
import { FileDown, FileSpreadsheet, FileText, Clock, Download, Trash2, Play } from 'lucide-react';

const ANALYTICS_API_URL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL || 'http://localhost:3005';

interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  type: string;
  format: string;
}

interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  format: string;
  status: string;
  periodStart: string;
  periodEnd: string;
  fileSize?: number;
  downloadCount: number;
  createdAt: string;
}

export default function ReportsPage() {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
    fetchReports();
  }, []);

  async function fetchTemplates() {
    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/reports/templates`);
      if (response.ok) {
        const result = await response.json();
        setTemplates(result.data || []);
      }
    } catch (err) {
      console.warn('Failed to fetch templates');
    }
  }

  async function fetchReports() {
    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/reports/history`);
      if (response.ok) {
        const result = await response.json();
        setReports(result.data || []);
      }
    } catch (err) {
      setError('Impossible de charger les rapports');
    } finally {
      setLoading(false);
    }
  }

  async function generateReport(type: string, format: string) {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${ANALYTICS_API_URL}/api/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          format,
          userId: 'demo-user',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        fetchReports(); // Refresh list
        alert(`Rapport généré avec succès !`);
      } else {
        setError('Échec de la génération du rapport');
      }
    } catch (err) {
      setError('Erreur lors de la génération');
    } finally {
      setGenerating(false);
    }
  }

  async function downloadReport(reportId: string) {
    try {
      window.open(`${ANALYTICS_API_URL}/api/reports/${reportId}/download`, '_blank');
      // Refresh to update download count
      setTimeout(fetchReports, 1000);
    } catch (err) {
      console.warn('Download failed');
    }
  }

  async function deleteReport(reportId: string) {
    if (!confirm('Supprimer ce rapport ?')) return;

    try {
      await fetch(`${ANALYTICS_API_URL}/api/reports/${reportId}`, {
        method: 'DELETE',
      });
      fetchReports();
    } catch (err) {
      console.warn('Delete failed');
    }
  }

  function formatFileSize(bytes?: number): string {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case 'compliance': return '📋';
      case 'progress': return '📈';
      case 'performance': return '🎯';
      default: return '📊';
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">Terminé</span>;
      case 'generating':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-medium animate-pulse">En cours...</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-medium">Échec</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 rounded-full text-xs font-medium">{status}</span>;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des rapports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📑 Rapports & Exports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Générez et téléchargez des rapports détaillés
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Quick Generate */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Générer un Rapport
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Compliance Report */}
          <button
            onClick={() => generateReport('compliance', 'excel')}
            disabled={generating}
            className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <div className="text-3xl">📋</div>
            <div className="text-left">
              <p className="font-medium text-blue-900 dark:text-blue-100">Conformité</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Rapport mensuel</p>
            </div>
            <FileSpreadsheet className="ml-auto h-5 w-5 text-blue-600" />
          </button>

          {/* Progress Report */}
          <button
            onClick={() => generateReport('progress', 'excel')}
            disabled={generating}
            className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <div className="text-3xl">📈</div>
            <div className="text-left">
              <p className="font-medium text-emerald-900 dark:text-emerald-100">Progression</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">État avancement</p>
            </div>
            <FileSpreadsheet className="ml-auto h-5 w-5 text-emerald-600" />
          </button>

          {/* Performance Report */}
          <button
            onClick={() => generateReport('performance', 'excel')}
            disabled={generating}
            className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <div className="text-3xl">🎯</div>
            <div className="text-left">
              <p className="font-medium text-amber-900 dark:text-amber-100">Performance</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">Analyse quiz</p>
            </div>
            <FileSpreadsheet className="ml-auto h-5 w-5 text-amber-600" />
          </button>
        </div>

        {generating && (
          <div className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            <span className="text-sm">Génération en cours...</span>
          </div>
        )}
      </div>

      {/* Report History */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Historique des Rapports
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {reports.length} rapport(s)
            </span>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <FileDown className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Aucun rapport généré</p>
            <p className="text-sm mt-1">Utilisez les boutons ci-dessus pour créer un rapport</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {reports.map(report => (
              <div key={report.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getTypeIcon(report.type)}</span>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {report.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="uppercase">{report.format}</span>
                      <span>•</span>
                      <span>{formatFileSize(report.fileSize)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {report.downloadCount}
                      </span>
                    </div>
                  </div>

                  {getStatusBadge(report.status)}

                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <Clock className="h-4 w-4" />
                    {formatDate(report.createdAt)}
                  </div>

                  <div className="flex items-center gap-2">
                    {report.status === 'completed' && (
                      <button
                        onClick={() => downloadReport(report.id)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Modèles de Rapports
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div
                key={template.id}
                className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </p>
                    {template.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => generateReport(template.type, template.format)}
                    disabled={generating}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                    title="Générer"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
