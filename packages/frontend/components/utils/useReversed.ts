import { useMemo } from 'react';

export default function useReversed<T extends any[] = any[]>(data: T): T {
    // @ts-ignore
    return useMemo(() => [...data].reverse(), [data]);
}
