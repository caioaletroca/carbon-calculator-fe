import { Report } from "core/types";
import React from "react";
import session from 'core/stores/SessionStorage';

interface ReportDataProvider extends Report {
    setReport: Function;
    clear: Function;
}

const initialValue = {
    sum: 0,
    data: [],
    setReport: () => {},
    clear: () => {}
}

const ReportContext = React.createContext<ReportDataProvider>(initialValue);

interface ReportProviderProps {
    children: React.ReactNode
}

export function ReportProvider({ children }: ReportProviderProps) {
    const [data, setData] = React.useState<ReportDataProvider>(initialValue);

    const setReport = (newData: ReportDataProvider) => {
        setData(newData);
        session.save('report', newData);
    }

    const clear = () => setData(initialValue);

    React.useEffect(() => {
        const persisted = session.load('report') || initialValue;
        setData(persisted);
    }, []);

    return (
        <ReportContext.Provider value={{ ...data, setReport, clear }}>
            {children}
        </ReportContext.Provider>
    )
}

export { ReportContext };