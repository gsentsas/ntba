import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { planningApi } from '@/services/api';
import { useAppStore } from '@/store';

export function usePlanning() {
    const queryClient = useQueryClient();
    const setTodayTasks = useAppStore((state) => state.setTodayTasks);

    const todayQuery = useQuery({
        queryKey: ['planning', 'today'],
        queryFn: planningApi.today,
        staleTime: 30_000,
    });

    const weekQuery = useQuery({
        queryKey: ['planning', 'week'],
        queryFn: () => planningApi.week(),
        staleTime: 30_000,
    });

    const generateMutation = useMutation({
        mutationFn: planningApi.generate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['planning'] });
        },
    });

    const completeTaskMutation = useMutation({
        mutationFn: planningApi.completeTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['planning'] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: planningApi.deleteTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['planning'] });
        },
    });

    useEffect(() => {
        if (todayQuery.data?.tasks) {
            setTodayTasks(todayQuery.data.tasks);
        }
    }, [todayQuery.data?.tasks, setTodayTasks]);

    return {
        todayQuery,
        weekQuery,
        todayTasks: todayQuery.data?.tasks ?? [],
        todayStats: todayQuery.data?.stats ?? null,
        weekTasks: weekQuery.data ?? {},
        generatePlan: generateMutation.mutateAsync,
        completeTask: completeTaskMutation.mutateAsync,
        deleteTask: deleteTaskMutation.mutateAsync,
        isLoading:
            todayQuery.isLoading ||
            weekQuery.isLoading ||
            generateMutation.isPending ||
            completeTaskMutation.isPending ||
            deleteTaskMutation.isPending,
    };
}
