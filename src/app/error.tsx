"use client";

import { PropsWithChildren } from "react";

interface ErrorBoundaryProps extends PropsWithChildren {
    error: Error;
}

export default function Error(props: ErrorBoundaryProps) {
    return (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center text-center">
            <div className="flex items-center flex-col gap-4">
                <h1 className="text-xl font-bold">Algo deu errado!</h1>
                <p>Por favor, tente recarregar a página ou volte mais tarde.</p>
                <pre className='text-left p-4 bg-red-100 border-2 border-red-200 rounded-md'>
                    {props.error.message}
                </pre>
            </div>
        </div>
    );
}
