import React from "react";
import { CarbonData } from "core/types";
// import { useSession } from "core/hooks";
import session from 'core/stores/SessionStorage';

interface CarbonDataContextProps {
    data: CarbonData[];
    addEmpty: Function;
    update: Function;
    persist: Function;
    remove: Function;
    clear: Function;
}

const CarbonDataContext = React.createContext<CarbonDataContextProps>({
    data: [],
    addEmpty: () => {},
    update: () => {},
    persist: () => {},
    remove: () => {},
    clear: () => {}
});

interface CarbonDataProviderProps {
    children: React.ReactNode
}

export function CarbonDataProvider({ children } : CarbonDataProviderProps) {
    const [data, setData] = React.useState<CarbonData[]>([]);

    const addEmpty = () => {
        setData([ ...data, {} ]);
    }

    const update = (id: number, newData: CarbonData) => {
        const temp = Array.from(data);
        temp[id] = { ...temp[id], ...newData };
        setData(temp);
    }

    const persist = () => {
        session.save('carbonData', data);
    }

    const remove = (id: number) => {
        setData([ ...data.slice(0, id), ...data.slice(id + 1) ]);
    }

    const clear = () => setData([]);

    React.useEffect(() => {
        const persisted = session.load('carbonData');
        setData(persisted);
    }, []);

    return (
        <CarbonDataContext.Provider value={{ data, addEmpty, update, persist, remove, clear }}>
            {children}
        </CarbonDataContext.Provider>
    )
}

export { CarbonDataContext }