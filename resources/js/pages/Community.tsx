import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    CheckCircle,
    Heart,
    MessageSquare,
    Pin,
    Plus,
    Search,
    Send,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { communityApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { ForumPost, ForumReply } from '@/types';

export default function Community() {
    const { user, setPage } = useAppStore();
    const queryClient = useQueryClient();
    useEffect(() => {
        setPage('community');
    }, [setPage]);

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'recent' | 'popular'>('recent');
    const [filterSubject, setFilterSubject] = useState('');
    const [showNewPost, setShowNewPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [replyContent, setReplyContent] = useState('');

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', user?.serie_code],
        queryFn: () => subjectsApi.list(user?.serie_code),
        enabled: !!user?.serie_code,
    });

    const { data: posts = [], isLoading } = useQuery({
        queryKey: [
            'community-posts',
            search,
            sort,
            filterSubject,
            user?.serie_code,
        ],
        queryFn: () =>
            communityApi.posts({
                serie_code: user?.serie_code,
                subject_id: filterSubject || undefined,
                search: search || undefined,
                sort,
            }),
    });

    const { data: postDetail } = useQuery({
        queryKey: ['community-post', selectedPost],
        queryFn: () => communityApi.post(selectedPost!),
        enabled: !!selectedPost,
    });

    const createPostMutation = useMutation({
        mutationFn: () =>
            communityApi.createPost({
                title: newTitle,
                content: newContent,
                serie_code: user?.serie_code,
                subject_id: filterSubject || undefined,
            }),
        onSuccess: () => {
            toast.success('Post publié !');
            setShowNewPost(false);
            setNewTitle('');
            setNewContent('');
            queryClient.invalidateQueries({ queryKey: ['community-posts'] });
        },
        onError: () => toast.error('Erreur lors de la publication'),
    });

    const likeMutation = useMutation({
        mutationFn: (postId: string) => communityApi.like(postId),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['community-posts'] }),
    });

    const replyMutation = useMutation({
        mutationFn: (postId: string) =>
            communityApi.reply(postId, replyContent),
        onSuccess: () => {
            toast.success('Réponse envoyée !');
            setReplyContent('');
            queryClient.invalidateQueries({
                queryKey: ['community-post', selectedPost],
            });
            queryClient.invalidateQueries({ queryKey: ['community-posts'] });
        },
        onError: () => toast.error('Erreur lors de la réponse'),
    });

    const resolveMutation = useMutation({
        mutationFn: communityApi.resolve,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['community-post', selectedPost],
            }),
    });

    return (
        <Layout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Forum Communauté
                    </h1>
                    <Button
                        onClick={() => setShowNewPost(true)}
                        className="bg-green text-white hover:bg-green-dark"
                    >
                        <Plus className="h-4 w-4" />
                        Nouvelle question
                    </Button>
                </div>

                {/* Filtres */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative min-w-48 flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher…"
                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-9 text-sm focus:border-green focus:outline-none"
                        />
                    </div>
                    <select
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-green focus:outline-none"
                    >
                        <option value="">Toutes les matières</option>
                        {subjects.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex rounded-xl border border-slate-200 bg-white">
                        {(['recent', 'popular'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSort(s)}
                                className={`px-4 py-2 text-sm font-medium transition-colors first:rounded-l-xl last:rounded-r-xl ${sort === s ? 'bg-green text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {s === 'recent' ? 'Récent' : 'Populaire'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Liste des posts */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Spinner className="h-6 w-6 text-green" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                className={`cursor-pointer transition-shadow hover:shadow-md ${post.is_pinned ? 'border-green/30 bg-green-xlight' : ''}`}
                                onClick={() => setSelectedPost(post.id)}
                            >
                                <CardContent className="py-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                                {post.is_pinned && (
                                                    <Pin className="h-3.5 w-3.5 shrink-0 text-green" />
                                                )}
                                                {post.is_resolved && (
                                                    <Badge className="border-0 bg-green-light text-xs text-green">
                                                        Résolu
                                                    </Badge>
                                                )}
                                                {post.subject_name && (
                                                    <Badge className="border-0 bg-slate-100 text-xs text-slate-500">
                                                        {post.subject_name}
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="line-clamp-2 font-medium text-slate-800">
                                                {post.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                                        <span>{post.author_name}</span>
                                        <span>
                                            {format(
                                                new Date(post.created_at),
                                                'd MMM',
                                                { locale: fr },
                                            )}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                likeMutation.mutate(post.id);
                                            }}
                                            className={`flex items-center gap-1 transition-colors ${post.liked_by_user ? 'text-red-500' : 'hover:text-red-400'}`}
                                        >
                                            <Heart
                                                className="h-3.5 w-3.5"
                                                fill={
                                                    post.liked_by_user
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                            />
                                            {post.likes_count}
                                        </button>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                            {post.replies_count}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {posts.length === 0 && (
                            <Card>
                                <CardContent className="py-12 text-center text-slate-500">
                                    Aucune question pour le moment. Sois le
                                    premier à poser une question !
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>

            {/* Modal nouveau post */}
            <Modal
                open={showNewPost}
                onOpenChange={setShowNewPost}
                title="Poser une question"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Titre *
                        </label>
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Ta question en bref…"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-green focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Détails *
                        </label>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            rows={5}
                            placeholder="Explique ta question, ce que tu as déjà essayé…"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-green focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setShowNewPost(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={() => createPostMutation.mutate()}
                            disabled={
                                !newTitle.trim() ||
                                !newContent.trim() ||
                                createPostMutation.isPending
                            }
                            className="bg-green text-white hover:bg-green-dark"
                        >
                            {createPostMutation.isPending ? (
                                <Spinner className="h-4 w-4" />
                            ) : (
                                'Publier'
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Modal détail post */}
            <Modal
                open={!!selectedPost}
                onOpenChange={(o) => {
                    if (!o) {
                        setSelectedPost(null);
                    }
                }}
                title={postDetail?.post.title ?? ''}
            >
                {postDetail && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-700">
                            {postDetail.post.content}
                        </p>
                        <div className="flex items-center gap-3">
                            <p className="text-xs text-slate-400">
                                par {postDetail.post.author_name}
                            </p>
                            {!postDetail.post.is_resolved &&
                                postDetail.post.user_id === user?.id && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-green/30 text-xs text-green"
                                        onClick={() =>
                                            resolveMutation.mutate(
                                                selectedPost!,
                                            )
                                        }
                                    >
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Marquer résolu
                                    </Button>
                                )}
                        </div>

                        {/* Réponses */}
                        <div className="space-y-3 border-t border-slate-100 pt-4">
                            <h4 className="text-sm font-semibold text-slate-700">
                                {postDetail.replies.length} réponse
                                {postDetail.replies.length !== 1 ? 's' : ''}
                            </h4>
                            {postDetail.replies.map((reply) => (
                                <div
                                    key={reply.id}
                                    className={`rounded-xl px-4 py-3 ${reply.is_best_answer ? 'border border-green/20 bg-green-xlight' : 'bg-slate-50'}`}
                                >
                                    {reply.is_best_answer && (
                                        <p className="mb-1 text-[11px] font-semibold text-green">
                                            ✓ Meilleure réponse
                                        </p>
                                    )}
                                    <p className="text-sm text-slate-700">
                                        {reply.content}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        par {reply.author_name}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Écrire une réponse */}
                        <div className="flex gap-2 border-t border-slate-100 pt-4">
                            <textarea
                                value={replyContent}
                                onChange={(e) =>
                                    setReplyContent(e.target.value)
                                }
                                rows={2}
                                placeholder="Ta réponse…"
                                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                            />
                            <Button
                                onClick={() =>
                                    replyMutation.mutate(selectedPost!)
                                }
                                disabled={
                                    !replyContent.trim() ||
                                    replyMutation.isPending
                                }
                                className="bg-green text-white hover:bg-green-dark"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
}
