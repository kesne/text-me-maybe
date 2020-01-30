import { useState, useRef, useEffect } from 'react';

function useIntersection() {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const observer = useRef<IntersectionObserver>();

    if (!observer.current) {
        observer.current = new IntersectionObserver(([newEntry]) => {
            setEntry(newEntry);
        });
    }

    return {
        entry,
        observer: observer.current
    };
}

type Props = {
    onMore(): void;
};

export default function FetchMore({ onMore }: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    const { observer, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting) {
            console.log('Calling OnMore');
            onMore();
        }
    }, [onMore, entry]);

    useEffect(() => {
        const ref = divRef.current;

        if (ref) {
            observer.observe(ref);
            return () => {
                observer.unobserve(ref);
            };
        }

        return () => {};
    }, [observer]);

    return <div ref={divRef} />;
}
