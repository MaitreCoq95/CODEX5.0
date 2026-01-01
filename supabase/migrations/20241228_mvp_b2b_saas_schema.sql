-- ═══════════════════════════════════════════════════════════════════════
-- VYXO CODEX - B2B SAAS MVP MIGRATION
-- Extensions de schéma pour le pivot self-serve
-- Date: 28/12/2025
-- ═══════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────
-- 1. EXTENSION TABLE USERS
-- ───────────────────────────────────────────────────────────────────────

-- Ajout des champs entreprise
ALTER TABLE users ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS company_size TEXT; -- '10-50', '50-150', '150-500', '500+'
ALTER TABLE users ADD COLUMN IF NOT EXISTS industry_sector TEXT; -- 'manufacturing', 'logistics', 'pharma', 'services', 'food', 'cyber'
ALTER TABLE users ADD COLUMN IF NOT EXISTS target_standard TEXT; -- 'ISO_9001', 'GDP', 'ISO_27001', 'HACCP', 'ISO_42001', 'SURETE'

-- Ajout des champs subscription (Stripe)
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial'; -- 'trial', 'active', 'past_due', 'cancelled', 'completed'
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Ajout des étapes onboarding complétées
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed_steps TEXT[] DEFAULT '{}';

-- Index pour les requêtes de subscription
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);

-- ───────────────────────────────────────────────────────────────────────
-- 2. TABLE: roadmaps
-- Plan d'action personnalisé par utilisateur
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_session_id TEXT,
  
  -- Standard ciblé
  standard_type TEXT NOT NULL, -- 'ISO_9001', 'GDP', 'ISO_27001', 'HACCP', 'ISO_42001', 'SURETE'
  
  -- Planification sprints
  total_sprints INTEGER NOT NULL DEFAULT 12,
  current_sprint INTEGER NOT NULL DEFAULT 1,
  sprint_duration_weeks INTEGER NOT NULL DEFAULT 2,
  
  -- Progression
  completion_percentage FLOAT NOT NULL DEFAULT 0,
  estimated_completion_date TIMESTAMPTZ,
  
  -- Statut
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'paused', 'completed', 'abandoned'
  
  -- Détails des sprints (JSON)
  sprint_details JSONB,
  
  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_standard_type ON roadmaps(standard_type);
CREATE INDEX IF NOT EXISTS idx_roadmaps_status ON roadmaps(status);

-- RLS
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roadmaps" ON roadmaps
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own roadmaps" ON roadmaps
  FOR ALL USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- 3. TABLE: actions
-- Référentiel de toutes les actions par norme
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Norme concernée
  standard_type TEXT NOT NULL, -- 'ISO_9001', 'GDP', 'ISO_27001', 'HACCP', 'ISO_42001', 'SURETE'
  
  -- Code unique
  action_code TEXT UNIQUE NOT NULL, -- Ex: "ISO9001_4.1_CONTEXT"
  
  -- Contenu
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Référence exigence
  requirement_ref TEXT NOT NULL, -- Ex: "4.1 - Contexte de l'organisation"
  chapter_number TEXT, -- Ex: "4.1"
  
  -- Estimation effort
  estimated_hours INTEGER NOT NULL DEFAULT 4,
  priority_weight INTEGER NOT NULL DEFAULT 5, -- 1-10
  
  -- Catégorisation
  category TEXT, -- 'documentation', 'process', 'training', 'audit', 'implementation'
  
  -- Variations par secteur
  sector_variations JSONB,
  
  -- Ressources liées
  template_ids TEXT[] DEFAULT '{}',
  video_url TEXT,
  
  -- Dépendances
  depends_on_actions TEXT[] DEFAULT '{}',
  
  -- Ordre d'affichage
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_actions_standard_type ON actions(standard_type);
CREATE INDEX IF NOT EXISTS idx_actions_chapter_number ON actions(chapter_number);
CREATE INDEX IF NOT EXISTS idx_actions_priority_weight ON actions(priority_weight);

-- ───────────────────────────────────────────────────────────────────────
-- 4. TABLE: user_actions
-- Progression utilisateur sur chaque action
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  action_id UUID NOT NULL REFERENCES actions(id),
  
  -- Attribution sprint
  sprint_number INTEGER NOT NULL,
  
  -- Statut
  status TEXT NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed', 'blocked', 'skipped'
  
  -- Tracking progression
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Notes utilisateur
  notes TEXT,
  blocked_reason TEXT,
  
  -- Fichiers uploadés
  uploaded_files JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contrainte unique
  UNIQUE(roadmap_id, action_id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_user_actions_user_id ON user_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_roadmap_id ON user_actions(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_action_id ON user_actions(action_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_status ON user_actions(status);
CREATE INDEX IF NOT EXISTS idx_user_actions_sprint_number ON user_actions(sprint_number);

-- RLS
ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own actions" ON user_actions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own actions" ON user_actions
  FOR ALL USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- 5. TABLE: templates
-- Bibliothèque de templates par norme
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Norme concernée
  standard_type TEXT NOT NULL, -- 'ISO_9001', 'GDP', 'ISO_27001', 'HACCP', 'ISO_42001', 'SURETE'
  
  -- Code unique
  template_code TEXT UNIQUE NOT NULL, -- Ex: "ISO9001_QUALITY_POLICY"
  
  -- Contenu
  title TEXT NOT NULL,
  description TEXT,
  
  -- Catégorisation
  category TEXT NOT NULL, -- 'manual', 'procedure', 'form', 'record', 'tool', 'checklist'
  
  -- Info fichier
  file_url TEXT NOT NULL, -- URL Supabase Storage
  file_format TEXT NOT NULL, -- 'docx', 'xlsx', 'pdf', 'pptx'
  file_size INTEGER,
  
  -- Référence exigence
  requirement_ref TEXT,
  
  -- Adaptations par secteur
  sector_adaptations JSONB,
  
  -- Actions liées
  related_action_codes TEXT[] DEFAULT '{}',
  
  -- Stats
  download_count INTEGER DEFAULT 0,
  
  -- Ordre d'affichage
  display_order INTEGER DEFAULT 0,
  
  -- Statut
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_templates_standard_type ON templates(standard_type);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_is_active ON templates(is_active);

-- ───────────────────────────────────────────────────────────────────────
-- 6. TABLE: standard_configs
-- Configuration par norme (questions, métadonnées)
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS standard_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identifiant norme
  standard_type TEXT UNIQUE NOT NULL, -- 'ISO_9001', 'GDP', 'ISO_27001', 'HACCP', 'ISO_42001', 'SURETE'
  
  -- Infos affichage
  name TEXT NOT NULL, -- "ISO 9001:2015"
  short_name TEXT NOT NULL, -- "ISO 9001"
  description TEXT,
  icon TEXT, -- emoji ou nom icône
  
  -- Questions (JSON)
  questions JSONB NOT NULL,
  
  -- Structure chapitres
  chapters JSONB NOT NULL,
  
  -- Définition niveaux maturité
  maturity_levels JSONB NOT NULL,
  
  -- Durée estimée certification (mois)
  estimated_months INTEGER DEFAULT 6,
  
  -- Prix typique (informatif)
  typical_price INTEGER,
  
  -- Pertinence par secteur
  sector_relevance JSONB,
  
  -- Statut
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ───────────────────────────────────────────────────────────────────────
-- 7. TRIGGER: Auto-update updated_at
-- ───────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer le trigger aux nouvelles tables
CREATE TRIGGER trigger_roadmaps_updated_at
    BEFORE UPDATE ON roadmaps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_actions_updated_at
    BEFORE UPDATE ON actions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_user_actions_updated_at
    BEFORE UPDATE ON user_actions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_templates_updated_at
    BEFORE UPDATE ON templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_standard_configs_updated_at
    BEFORE UPDATE ON standard_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════
-- FIN MIGRATION MVP
-- ═══════════════════════════════════════════════════════════════════════
