import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle, EyeOff, MessageSquare, Pin, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { adminApi } from '@/services/api';
import type { ForumPost } from '@/types';

export default function AdminForum() {
    const queryClient = useQueryClient();

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['admin-forum'],
        queryFn: () => adminApi.forumPosts({ limit: 100 }),
    });

    const moderateMutation = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Record<string, unknown>;
        }) => adminApi.moderatePost(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-forum'] });
            toast.success('Post mis à jour');
        },
        onError: () => toast.error('Erreur lors de la modération'),
    });

    function togglePublished(post: ForumPost) {
        moderateMutation.mutate({
            id: post.id,
            data: { is_published: !post.is_published },
        });
    }

    function togglePinned(post: ForumPost) {
        moderateMutation.mutate({
            id: post.id,
            data: { is_pinned: !post.is_pinned },
        });
    }

    function markResolved(post: ForumPost) {
        moderateMutation.mutate({ id: post.id, data: { is_resolved: true } });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner className="h-8 w-8 text-green" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Modération du Forum
                </h1>
                <p className="text-sm text-slate-400">
                    {posts.length} publications
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">
                                Titre
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Série
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Réponses
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Statut
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className={`bg-slate-900 ${!post.is_published ? 'opacity-50' : ''}`}
                            >
                                <td className="max-w-xs truncate px-4 py-3 font-medium text-white">
                                    {post.is_pinned && (
                                        <Pin className="mr-1.5 inline h-3 w-3 text-amber-400" />
                                    )}
                                    {post.title}
                                </td>
                                <td className="px-4 py-3 text-slate-400">
                                    {post.serie_code}
                                </td>
                                <td className="px-4 py-3 text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="h-3 w-3" />
                                        {post.replies_count}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-slate-500">
                                    {format(
                                        new Date(post.created_at),
                                        'dd MMM yy',
                                        { locale: fr },
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {post.is_published ? (
                                            <span className="rounded-full bg-green/20 px-2 py-0.5 text-xs text-green">
                                                Publié
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-900/30 px-2 py-0.5 text-xs text-red-400">
                                                Masqué
                                            </span>
                                        )}
                                        {post.is_resolved && (
                                            <span className="rounded-full bg-blue-900/30 px-2 py-0.5 text-xs text-blue-400">
                                                Résolu
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 border-slate-700 px-2 text-xs text-slate-300 hover:bg-slate-800"
                                            onClick={() => togglePinned(post)}
                                            title={
                                                post.is_pinned
                                                    ? 'Désépingler'
                                                    : 'Épingler'
                                            }
                                        >
                                            <Pin className="h-3 w-3" />
                                        </Button>
                                        {!post.is_resolved && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 border-slate-700 px-2 text-xs text-green hover:bg-slate-800"
                                                onClick={() =>
                                                    markResolved(post)
                                                }
                                                title="Marquer comme résolu"
                                            >
                                                <CheckCircle className="h-3 w-3" />
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 border-slate-700 px-2 text-xs text-slate-400 hover:bg-slate-800"
                                            onClick={() =>
                                                togglePublished(post)
                                            }
                                            title={
                                                post.is_published
                                                    ? 'Masquer'
                                                    : 'Publier'
                                            }
                                        >
                                            {post.is_published ? (
                                                <EyeOff className="h-3 w-3" />
                                            ) : (
                                                <Trash2 className="h-3 w-3" />
                                            )}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <div className="py-16 text-center text-slate-500">
                        Aucune publication dans le forum.
                    </div>
                )}
            </div>
        </div>
    );
}
