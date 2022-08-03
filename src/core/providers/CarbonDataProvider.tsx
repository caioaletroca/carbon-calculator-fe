import React from "react";
import { CarbonData } from "core/types";
import session from 'core/stores/SessionStorage';

interface CarbonDataContextProps {
    data: CarbonData;
    addEmpty: Function;
    update: Function;
    persist: Function;
    remove: Function;
    clear: Function;
}

const CarbonDataContext = React.createContext<CarbonDataContextProps>({
    data: {},
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
    const [data, setData] = React.useState<CarbonData>({});

    const addEmpty = (category: string) => {
        if(data[category])
            setData({ ...data, [category]: [ ...data[category], {}] });
        else
            setData({ ...data, [category]: [{}]})
    }

    const update = (category: string, id: number, newData: CarbonData) => {
        const temp = { ...data };
        data[category][id] = { ...data[category][id], ...newData };
        setData(temp);
    }

    const persist = () => {
        session.save('carbonData', data);
    }

    const remove = (category: string, id: number) => {
        setData({
            ...data,
            [category]: [ ...data[category].slice(0, id), ...data[category].slice(id + 1)]
        });
    }

    const clear = () => setData({});

    React.useEffect(() => {
        const persisted = session.load('carbonData') || {};
        setData(persisted);
    }, []);

    return (
        <CarbonDataContext.Provider value={{ data, addEmpty, update, persist, remove, clear }}>
            {children}
        </CarbonDataContext.Provider>
    )
}

export { CarbonDataContext }