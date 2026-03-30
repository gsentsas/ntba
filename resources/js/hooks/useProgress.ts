import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { progressApi } from '@/services/api';
import { useAppStore } from '@/store';

type UseProgressOptions = {
    enabled?: boolean;
};

export function useProgress(options: UseProgressOptions = {}) {
    const enabled = options.enabled ?? true;
    const setGlobalProgress = useAppStore((state) => state.setGlobalProgress);

    const globalQuery = useQuery({
        queryKey: ['progress', 'global'],
        queryFn: progressApi.global,
        staleTime: 60_000,
        enabled,
    });

    const subjectsQuery = useQuery({
        queryKey: ['progress', 'subjects'],
        queryFn: progressApi.subjects,
        staleTime: 60_000,
        enabled,
    });

    const weeklyActivityQuery = useQuery({
        queryKey: ['progress', 'weekly-activity'],
        queryFn: progressApi.weeklyActivity,
        staleTime: 60_000,
        enabled,
    });

    const achievementsQuery = useQuery({
        queryKey: ['progress', 'achievements'],
        queryFn: progressApi.achievements,
        staleTime: 60_000,
        enabled,
    });

    useEffect(() => {
        if (globalQuery.data) {
            setGlobalProgress(globalQuery.data);
        }
    }, [globalQuery.data, setGlobalProgress]);

    return {
        globalQuery,
        subjectsQuery,
        weeklyActivityQuery,
        achievementsQuery,
        globalProgress: globalQuery.data,
        subjectsProgress: subjectsQuery.data ?? [],
        weeklyActivity: weeklyActivityQuery.data ?? [],
        achievements: achievementsQuery.data ?? [],
    };
}
