export type TabType = 'strategie' | 'finanzierung' | 'immobilie';

export interface Hotspot {
  id: string;
  name: string;
  top: string; // percentage for positioning
  left: string; // percentage for positioning
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  icon: string;
}
