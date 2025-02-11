import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UrlRecord} from "../types/UrlRecord";

import mockRecords from '../stubData';  // Import the mock data

// Define the context type
interface UrlRecordsContextType {
  records: UrlRecord[];
  record: UrlRecord | null;
  setRecord: (record: UrlRecord | null) => void;
  addRecord: (record: UrlRecord) => Promise<void>;
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
  addRecord: async () => { },
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


  const addUrlRecord = (newRecord: UrlRecord): Promise<void> => {
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => [...prev, newRecord]);
      });
  };

  const updateUrlRecord = (newRecord: UrlRecord): Promise<void> => {
    console.log("addUrlRecord - provider");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => [...prev, newRecord]);
      });
  };

  const deleteUrlRecord = (targetRecord: UrlRecord): Promise<void> => {
    console.log("deleteUrlRecord - provider");

    // Test errors
    return Promise.reject("Error 12345");

    return Promise.resolve()
      .then(() => {
        setRecords((prev) => prev.filter((rec) => rec.id !== targetRecord.id));
      });
  };

  // This is what our Context Provider provides
  const value = {records, record, setRecord, addRecord: addUrlRecord, updateUrlRecord, deleteUrlRecord};

  // This is pretty much the same for every Provider
  return (
    <recordContext.Provider value={value}>
      {props.children}
    </recordContext.Provider>
  );

};

export default RecordProvider;