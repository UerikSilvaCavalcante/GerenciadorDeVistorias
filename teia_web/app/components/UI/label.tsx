
import { ReactNode } from 'react';

interface LabelProps {
    children: ReactNode,
    htmlFor?: string
}

export default function Label({ children , htmlFor }: LabelProps) {
    return (
        <label className="text-sm text-indigo-700 font-semibold" htmlFor={htmlFor}>
            {children}
        </label>
    )
}