export interface PainPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
  solution: string;
  stat?: string;
}

export interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: string;
  accentColor: 'lime' | 'green' | 'emerald' | 'cyan';
}

export interface MethodStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface Deliverable {
  title: string;
  description: string;
  tag: string;
  icon: string;
  span?: string;
  featured?: boolean;
}

export interface MetricCounter {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  role: string;
  avatar?: string;
  quote: string;
  rating?: number;
  winRateImpact?: string;
  riskManagement?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
