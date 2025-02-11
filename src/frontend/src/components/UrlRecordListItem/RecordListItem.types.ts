
//Type for a single URL record
export interface UrlRecord {
  shortUrl: string;
  longUrl: string;
  createdAt: string;  // Or Date if you prefer Date objects
  lastUsedAt: string;  // Or Date
  usageCount: number;
}

// Type for the component props
export interface UrlRecordListProps {
  records: UrlRecord[];  // An array of UrlRecord objects
}
