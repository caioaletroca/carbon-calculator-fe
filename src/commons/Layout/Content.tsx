import React from "react";
import classNames from 'classnames';
import './Content.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: boolean;
}

export function Content({ padding, ...others } : ContentProps) {
    return (
        <div
            className={classNames(
                'content',
                {
                    'content--padding': padding
                }
            )}
            {...others}
        />
    )
}