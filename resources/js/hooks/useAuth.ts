import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { authApi } from '@/services/api';
import { useAppStore } from '@/store';

export function useAuth() {
    const queryClient = useQueryClient();
    const { token, user, setToken, setUser, logout } = useAppStore();

    const meQuery = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: authApi.me,
        enabled: Boolean(token),
    });

    useEffect(() => {
        if (meQuery.data?.user) {
            setUser(meQuery.data.user);
        }
    }, [meQuery.data?.user, setUser]);

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        },
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        },
    });

    const refreshMutation = useMutation({
        mutationFn: authApi.refresh,
        onSuccess: (data) => {
            setToken(data.token);
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: authApi.updateProfile,
        onSuccess: (data) => {
            setUser(data.user);
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        },
    });

    return {
        token,
        user,
        me: meQuery.data,
        meQuery,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        refresh: refreshMutation.mutateAsync,
        updateProfile: updateProfileMutation.mutateAsync,
        logout,
        isLoading:
            loginMutation.isPending ||
            registerMutation.isPending ||
            refreshMutation.isPending ||
            updateProfileMutation.isPending ||
            meQuery.isLoading,
    };
}
