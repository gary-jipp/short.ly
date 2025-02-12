// Type for a single URL record
export interface UrlRecord {
  id?: number;      // Added by API
  shortUrl?: string;
  longUrl: string;
  usageCount?: number;   // Added & Updated by API
}

export interface ApiUrlRecord {
  id?: number;      // Added by API
  short_url?: string;
  long_url: string;
  usage_count?: number;   // Added & Updated by API
  created?: string;       // Not used yet
}
