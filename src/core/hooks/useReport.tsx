import React from "react";
import { ReportContext } from "core/providers";

export function useReport() {
    return React.useContext(ReportContext);
}