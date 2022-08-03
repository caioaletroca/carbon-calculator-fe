import React from 'react';
import { CarbonDataContext } from 'core/providers';

export function useCarbonData() {
    return React.useContext(CarbonDataContext);
}