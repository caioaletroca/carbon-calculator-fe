import React from "react";
import './View.scss';

export function View(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div className="view" {...props} />
}