export interface Certification {
    title: string;
    issuer: string;
    date: string;
    verificationUrl: string;
    pdfUrl: string;
    color?: string;
}

export interface Badge {
    title: string;
    issuer: string;
    date: string;
    description: string;
    verificationUrl: string;
    color?: string;
}

export interface Internship {
    title: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
    certificate: string;
    type: 'virtual' | 'offline';
    color?: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    github: string;
    live: string;
    gradient: string;
    icon: string;
    iconColor: string;
}
