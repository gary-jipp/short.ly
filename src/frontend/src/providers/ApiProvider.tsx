import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UrlRecord} from "../types/UrlRecord";

import mockRecords from '../stubData';  // Import the mock data

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
export const useRecords = function() {
  const context = useContext(apiContext);
  if (!context) {
    throw new Error("useRecords() must be used within a RecordProvider");
  }
  return context;
};

const ApiProvider: React.FC<ApiProviderProps> = function(props) {
  const [urlRecords, setUrlRecords] = useState<UrlRecord[]>([]);
  const [apiPending, setDataPending] = useState(false);
  const [apiError, setDataError] = useState("");

  // Load data once on Startup
  useEffect(() => {
    setUrlRecords([...mockRecords]);
  }, []);

  // Adds a new Url Record and returns the updated record with id & shortUrl
  const addUrlRecord = (newRecord: UrlRecord): Promise<UrlRecord> => {
    setDataPending(true);
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setUrlRecords((prev) => [...prev, newRecord]);
        setDataPending(false);
        return {...newRecord, id: 999, shortUrl: "https://short.ly/12321"} as UrlRecord;
      });
  };

  // Adds a new Url Record.  No return
  const updateUrlRecord = (record: UrlRecord): Promise<void> => {
    setDataPending(true);
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setDataPending(false);
        setUrlRecords((prev) => [...prev, record]);
      });
  };

  // Deletes a Url Record.  No return
  const deleteUrlRecord = (record: UrlRecord): Promise<void> => {
    setDataPending(true);
    console.log("deleteUrlRecord - provider");

    // Test errors
    // setDataError("Test Error 12345");

    return Promise.resolve()
      .then(() => {
        setDataPending(false);
        setUrlRecords((prev) => prev.filter((rec) => rec.id !== record.id));
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