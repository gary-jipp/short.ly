import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UrlRecord} from "../types/UrlRecord";

import mockRecords from '../stubData';  // Import the mock data

// Define the context type
interface UrlRecordsContextType {
  records: UrlRecord[];
  record: UrlRecord | null;
  setRecord: (record: UrlRecord | null) => void;
  addUrlRecord: (record: UrlRecord) => Promise<UrlRecord>;
  updateUrlRecord: (record: UrlRecord) => Promise<void>;
  deleteUrlRecord: (record: UrlRecord) => Promise<void>;
}

export interface RecordProviderProps {
  children?: ReactNode;
}

const defaultContext: UrlRecordsContextType = {
  records: [],
  record: null,
  setRecord: () => { },
  addUrlRecord: async () => { },
  updateUrlRecord: async () => { },
  deleteUrlRecord: async () => { },
};
// Create React context to hold our data
const recordContext = createContext<UrlRecordsContextType>(defaultContext);

// Custom Hooks for easy access to the Context values
export const useRecords = function() {
  return useContext(recordContext);
};

const RecordProvider: React.FC<RecordProviderProps> = function(props) {
  const [records, setRecords] = useState<UrlRecord[]>([]);
  const [record, setRecord] = useState<UrlRecord | null>(null);   // Not the best, but works for now

  // Load data once on Startup
  useEffect(() => {
    setRecords([...mockRecords]);
  }, []);

  // Adds a new Url Record and returns the updated record with id & shortUrl
  const addUrlRecord = (newRecord: UrlRecord): Promise<UrlRecord> => {
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => [...prev, newRecord]);
        return {...newRecord, id: 999, shortUrl: "https://short.ly/12321"} as UrlRecord;
      });
  };


  // Adds a new Url Record.  No return
  const updateUrlRecord = (record: UrlRecord): Promise<void> => {
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => [...prev, record]);
      });
  };

  // Deletes a Url Record.  No return
  const deleteUrlRecord = (record: UrlRecord): Promise<void> => {
    console.log("deleteUrlRecord - provider");

    // Test errors
    // return Promise.reject("Error 12345");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => prev.filter((rec) => rec.id !== record.id));
      });
  };

  // This is what our Context Provider provides
  const value = {records, record, setRecord, addUrlRecord, updateUrlRecord, deleteUrlRecord};

  // This is pretty much the same for every Provider
  return (
    <recordContext.Provider value={value}>
      {props.children}
    </recordContext.Provider>
  );

};

export default RecordProvider;