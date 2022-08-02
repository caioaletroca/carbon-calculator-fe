import React from "react";
import './Page.scss';

export function Page(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div className="app" {...props} />
}