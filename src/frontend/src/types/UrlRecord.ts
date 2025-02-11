// Type for a single URL record
export interface UrlRecord {
  id?: number;      // Added by API
  shortUrl: string;
  longUrl: string;
  usageCount?: number;   // Added & Updated by API
}
