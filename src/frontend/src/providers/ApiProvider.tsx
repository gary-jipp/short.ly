import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ApiUrlRecord, UrlRecord} from "../types/UrlRecord";
import axios from "axios";

// Define the context type
interface ApiContextType {
  urlRecords: UrlRecord[];
  addUrlRecord: (record: UrlRecord) => Promise<UrlRecord>;
  updateUrlRecord: (record: UrlRecord) => Promise<void>;
  deleteUrlRecord: (record: UrlRecord) => Promise<void>;
}

export interface ApiProviderProps {
  children?: ReactNode;
}

// Create React context to hold our data. value is undefined if not wrapped
const apiContext = createContext<ApiContextType | undefined>(undefined);

// Custom Hooks for easy access to the Context values object
export const useApi = function() {

  const context = useContext(apiContext);
  if (!context) {             // Check if not wrapped in Provider
    throw new Error("useRecords() must be used within a RecordProvider");
  }
  return context;
};

const ApiProvider: React.FC<ApiProviderProps> = function(props) {
  const [urlRecords, setUrlRecords] = useState<UrlRecord[]>([]);

  // Load data once on Startup
  useEffect(() => {
    axios.get<ApiUrlRecord[]>("/api/urls")
      .then(res => {
        // Map api records to app records & save
        const records: UrlRecord[] = res.data.map ? res.data.map(r => ({id: r.id, urlId: r.url_id, shortUrl: r.short_url , longUrl: r.long_url, usageCount: r.usage_count, created: r.created})) : [];
        setUrlRecords(records);
      })
      .catch(err => {
        console.log("Error on Fetch: ", err.message);
      });
  }, []);

  // Adds a new Url Record and returns the updated record with id & shortUrl
  const addUrlRecord = (newRecord: UrlRecord): Promise<UrlRecord> => {

    return axios.post<ApiUrlRecord>("/api/urls", newRecord) // body type is inferred
      .then(res => {
        // Map api record to local app url record
        const rec = res.data; // type inferred
        const record: UrlRecord = {id: rec.id, urlId: rec.url_id, longUrl: rec.long_url, shortUrl: rec.short_url || "", usageCount: rec.usage_count};
        setUrlRecords((prev) => [record, ...prev]);
        return record;
      });
  };

  // Adds a new Url Record.  No return
  const updateUrlRecord = (record: UrlRecord): Promise<void> => {

    // Update and replace object in records array
    return axios.put<UrlRecord>(`/api/urls/${record.id}`, record)
      .then(() => {
        setUrlRecords((prev) =>
          prev.map((rec) => (rec.id === record.id ? record : rec))
        );
      });

  };

  // Deletes a Url Record.  Nothing returned
  const deleteUrlRecord = (record: UrlRecord): Promise<void> => {

    console.log("deleteUrlRecord - provider");

    return axios.delete(`/api/urls/${record.id}`)
      .then(() => {
        setUrlRecords((prev) => prev.filter((rec) => rec.id !== record.id));
      });
  };

  // This is what our Context Provider provides
  const value = {urlRecords, addUrlRecord, updateUrlRecord, deleteUrlRecord};

  // This code is pretty much the same for every Provider
  return (
    <apiContext.Provider value={value}>
      {props.children}
    </apiContext.Provider>
  );

};

export default ApiProvider;