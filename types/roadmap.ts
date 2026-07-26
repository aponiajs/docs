export interface RoadmapProject {
  id: string;
  name: string;
  description: string;
  repository: string;
  defaultBranch: string;
  currentVersion: string;
  runtime: string;
  packageManager: string;
  sourceCommit?: string;
}

export interface StatusDefinition {
  label: string;
  description: string;
  order: number;
  color: string;
}

export interface RoadmapSummary {
  total: number;
  completed: number;
  inProgress: number;
  planned: number;
  completionPercent: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  order: number;
  status: 'completed' | 'in_progress' | 'planned';
  progressPercent: number;
  targetVersion: string;
  itemIds: string[];
}

export interface EvidenceItem {
  kind: string;
  label: string;
  ref: string;
}

export interface RoadmapItem {
  id: string;
  milestoneId: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  progressPercent: number;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  category?: 'architecture' | 'runtime' | 'dx' | 'production' | string;
  packages?: string[];
  dependencies?: string[];
  deliverables?: string[];
  evidence?: EvidenceItem[];
  acceptanceCriteria?: string[];
  nextActions?: string[];
  updatedAt?: string;
  tags?: string[];
}

export interface RoadmapData {
  schemaVersion: string;
  generatedAt: string;
  project: RoadmapProject;
  statusDefinitions: Record<string, StatusDefinition>;
  summary: RoadmapSummary;
  milestones: Milestone[];
  items: RoadmapItem[];
}
