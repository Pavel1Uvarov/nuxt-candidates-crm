export interface ICandidate {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  skills: string[];
  resume_file: File | string;
  github_url?: string;
}
