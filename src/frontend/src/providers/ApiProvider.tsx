import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ApiUrlRecord, UrlRecord} from "../types/UrlRecord";
import axios from "axios";

// Define the context type
interface ApiContextType {
  urlRecords: UrlRecord[];
  apiPending: boolean;
  apiError: string;
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
  if (!context) {
    throw new Error("useRecords() must be used within a RecordProvider");
  }
  return context;
};

const ApiProvider: React.FC<ApiProviderProps> = function(props) {
  const [urlRecords, setUrlRecords] = useState<UrlRecord[]>([]);
  const [apiPending, setApiPending] = useState(false);
  const [apiError, setApiError] = useState("");

  // Load data once on Startup
  useEffect(() => {
    axios.get<ApiUrlRecord[]>("/api/urls")
      .then(res => {
        // Map api records to app records & save
        const records: UrlRecord[] = res.data.map(r => ({id: r.id, shortUrl: r.short_url, longUrl: r.long_url, usageCount: r.usage_count, created: r.created}));
        setUrlRecords(records);
      })
      .catch();
  }, []);

  // Adds a new Url Record and returns the updated record with id & shortUrl
  const addUrlRecord = (newRecord: UrlRecord): Promise<UrlRecord> => {
    setApiPending(true);

    return axios.post<ApiUrlRecord>("/api/urls", newRecord) // body type is inferred
      .then(res => {
        const rec = res.data; // type inferred
        const record: UrlRecord = {id: rec.id, longUrl: rec.long_url, shortUrl: rec.short_url, usageCount: rec.usage_count};
        setUrlRecords((prev) => [...prev, record]);
        return record;
      })
      .catch(err => {
        console.log("axios.post error: ", err.response?.data);
        setApiError("Unable to add this URL");
        return {longUrl: ""} as UrlRecord;  // Won't get used if apiError Set
      })
      .finally(() => {
        setApiPending(false);
      });
  };

  // Adds a new Url Record.  No return
  const updateUrlRecord = (record: UrlRecord): Promise<void> => {
    setApiPending(true);

    return axios.put<UrlRecord>(`/api/urls/${record.id}`, record)
      .then(() => {
        setUrlRecords((prev) => [...prev, record]);
      })
      .catch(err => {
        console.log("axios.put error: ", err.response?.data);
        setApiError("Unable to save this record");
      })
      .finally(() => {
        setApiPending(false);
      });

  };

  // Deletes a Url Record.  Nothing returned
  const deleteUrlRecord = (record: UrlRecord): Promise<void> => {
    setApiPending(true);
    console.log("deleteUrlRecord - provider");

    return axios.delete(`/api/urls/${record.id}`)
      .then(() => {
        setUrlRecords((prev) => prev.filter((rec) => rec.id !== record.id));
      })
      .catch(err => {
        console.log("axios.delete error: ", err.response?.data);
        setApiError("Error deleting this record");
      })
      .finally(() => {
        setApiPending(false);
      });
  };

  // This is what our Context Provider provides
  const value = {urlRecords, apiPending, apiError, addUrlRecord, updateUrlRecord, deleteUrlRecord};

  // This is pretty much the same for every Provider
  return (
    <apiContext.Provider value={value}>
      {props.children}
    </apiContext.Provider>
  );

};

export default ApiProvider;