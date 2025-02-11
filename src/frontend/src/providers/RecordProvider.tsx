import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UrlRecord} from "../types/UrlRecord";

import mockRecords from '../stubData';  // Import the mock data

// Define the context type
interface UrlRecordsContextType {
  records: UrlRecord[];
  record: UrlRecord | null;
  setRecord: (record: UrlRecord | null) => void;
  addRecord: (record: UrlRecord) => void;
  updateUrlRecord: (record: UrlRecord) => void;
  deleteUrlRecord: (record: UrlRecord) => void;
}

export interface RecordProviderProps {
  children?: ReactNode;
}

const defaultContext: UrlRecordsContextType = {
  records: [],
  record: null,
  setRecord: () => { },
  addRecord: () => { },
  updateUrlRecord: () => { },
  deleteUrlRecord: () => { },
};
const recordContext = createContext<UrlRecordsContextType>(defaultContext);

export const useRecords = function() {
  return useContext(recordContext);
};

const RecordProvider: React.FC<RecordProviderProps> = function(props) {
  const [records, setRecords] = useState<UrlRecord[]>([]);
  const [record, setRecord] = useState<UrlRecord | null>(null);   // Not the best, but works for now

  useEffect(() => {
    setRecords([...mockRecords]);
  }, []);

  const addUrlRecord = function(record: UrlRecord) {
    // Stub Save for now
    console.log("addUrlRecord - provider");
    setRecords((prev) => [...prev, record]);
  };

  const updateUrlRecord = function(record: UrlRecord) {
    console.log("updateUrlRecord - provider");
    setRecords((prev) =>
      prev.map((rec) => (rec.id === record.id ? record : rec))
    );
  };

  const deleteUrlRecord = function(record: UrlRecord) {
    // Stub Save for now
    console.log("deleteUrlRecord - provider");

    setRecords((prev) => prev.filter((rec) => rec.id !== record.id));
  };

  const value = {records, record, setRecord, addRecord: addUrlRecord, updateUrlRecord, deleteUrlRecord};

  return (
    <recordContext.Provider value={value}>
      {props.children}
    </recordContext.Provider>
  );


};

export default RecordProvider;