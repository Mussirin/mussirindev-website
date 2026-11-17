import type { ProjectStatus } from '@/types/project';

export interface PageMeta {
  title: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface PhilosophyItem {
  key: 'simplicity' | 'practicality' | 'quality';
  title: string;
  description: string;
}

export interface Dictionary {
  meta: {
    siteTitle: string;
    siteDescription: string;
    pages: {
      home: PageMeta;
      projects: PageMeta;
      about: PageMeta;
      contact: PageMeta;
      privacy: PageMeta;
      terms: PageMeta;
    };
  };
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    languageLabel: string;
    themeDark: string;
    themeLight: string;
    getInTouch: string;
  };
  hero: {
    badge: string;
    mainHeading: string;
    secondaryHeading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    studioFacts: [string, string, string];
  };
  projectsSection: {
    title: string;
    subtitle: string;
    viewAll: string;
    allCategories: string;
    statusLabels: Record<ProjectStatus, string>;
    viewDetails: string;
    platformsLabel: string;
    languagesLabel: string;
    featuresLabel: string;
    galleryLabel: string;
    relatedLabel: string;
    storeComingSoonNote: string;
    backToProjects: string;
    editableNotice: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    highlights: string[];
    techStackTitle: string;
    techStackSubtitle: string;
  };
  philosophy: {
    title: string;
    subtitle: string;
    items: [PhilosophyItem, PhilosophyItem, PhilosophyItem];
  };
  contact: {
    title: string;
    description: string;
    infoTitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    githubLabel: string;
    locationLabel: string;
    locationValue: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      notConfiguredHint: string;
      mailtoFallback: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        subjectRequired: string;
        messageRequired: string;
        messageMinLength: string;
        generic: string;
      };
    };
  };
  legal: {
    privacy: {
      title: string;
      updatedAt: string;
      sections: LegalSection[];
    };
    terms: {
      title: string;
      updatedAt: string;
      sections: LegalSection[];
    };
  };
  footer: {
    tagline: string;
    navigationTitle: string;
    legalTitle: string;
    connectTitle: string;
    copyright: string;
  };
}
