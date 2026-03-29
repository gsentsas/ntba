import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Bot,
    Edit2,
    Eye,
    EyeOff,
    Plus,
    Search,
    Trash2,
    Upload,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { adminApi, subjectsApi } from '@/services/api';
import type { Exercise } from '@/types';

const EMPTY_FORM = {
    subject_id: '',
    chapter_id: '',
    type: 'qcm' as Exercise['type'],
    difficulty: 3,
    title: '',
    question_text: '',
    correct_answer: '',
    explanation: '',
    is_annale: false,
    annale_year: new Date().getFullYear(),
    estimated_time_minutes: 5,
    points: 10,
};

export default function AdminExercises() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editEx, setEditEx] = useState<Exercise | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const { data: subjectsData = [] } = useQuery({
        queryKey: ['subjects-all'],
        queryFn: () => subjectsApi.list(),
    });

    const { data, isLoading } = useQuery({
        queryKey: ['admin-exercises', page, search, filterType],
        queryFn: () =>
            adminApi.exercises({
                page,
                limit: 20,
                search: search || undefined,
                type: filterType || undefined,
            }),
    });

    const createMutation = useMutation({
        mutationFn: adminApi.createExercise,
        onSuccess: () => {
            toast.success('Exercice créé !');
            setShowForm(false);
            setForm(EMPTY_FORM);
            queryClient.invalidateQueries({ queryKey: ['admin-exercises'] });
        },
        onError: () => toast.error('Erreur lors de la création'),
    });

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Record<string, unknown>;
        }) => adminApi.updateExercise(id, data),
        onSuccess: () => {
            toast.success('Exercice mis à jour !');
            setEditEx(null);
            queryClient.invalidateQueries({ queryKey: ['admin-exercises'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: adminApi.deleteExercise,
        onSuccess: () => {
            toast.success('Exercice masqué');
            queryClient.invalidateQueries({ queryKey: ['admin-exercises'] });
        },
    });

    const exercises: Exercise[] = data?.data ?? [];

    function handleSubmit() {
        if (editEx) {
            updateMutation.mutate({ id: editEx.id, data: form });
        } else {
            createMutation.mutate(form);
        }
    }

    function openEdit(ex: Exercise) {
        setEditEx(ex);
        setForm({
            subject_id: ex.subject_id,
            chapter_id: ex.chapter_id,
            type: ex.type,
            difficulty: ex.difficulty,
            title: ex.title ?? '',
            question_text: ex.question_text,
            correct_answer: ex.correct_answer ?? '',
            explanation: ex.explanation,
            is_annale: ex.is_annale,
            annale_year: ex.annale_year ?? new Date().getFullYear(),
            estimated_time_minutes: ex.estimated_time_minutes,
            points: ex.points,
        });
        setShowForm(true);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Exercices</h1>
                <Button
                    onClick={() => {
                        setEditEx(null);
                        setForm(EMPTY_FORM);
                        setShowForm(true);
                    }}
                    className="bg-green text-white hover:bg-green-dark"
                >
                    <Plus className="h-4 w-4" /> Ajouter
                </Button>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
                <div className="relative min-w-48 flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Rechercher…"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pr-4 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-green focus:outline-none"
                    />
                </div>
                <select
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-green focus:outline-none"
                >
                    <option value="">Tous les types</option>
                    <option value="qcm">QCM</option>
                    <option value="vrai_faux">Vrai/Faux</option>
                    <option value="calcul">Calcul</option>
                    <option value="dissertation">Dissertation</option>
                </select>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Spinner className="h-6 w-6 text-green" />
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-800">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-800 text-left text-xs text-slate-400">
                            <tr>
                                <th className="px-4 py-3">Question</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Difficulté</th>
                                <th className="px-4 py-3">Source</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-900">
                            {exercises.map((ex) => (
                                <tr
                                    key={ex.id}
                                    className={`hover:bg-slate-800/50 ${!ex.is_published ? 'opacity-50' : ''}`}
                                >
                                    <td className="max-w-xs px-4 py-3">
                                        <p className="truncate font-medium text-white">
                                            {ex.question_text}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {ex.subject_name}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge className="border-0 bg-slate-700 text-xs text-slate-300 capitalize">
                                            {ex.type}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-amber">
                                        {'★'.repeat(ex.difficulty)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {ex.is_annale ? (
                                            <Badge className="border-0 bg-amber-light text-xs text-amber">
                                                Annale {ex.annale_year}
                                            </Badge>
                                        ) : ex.ai_generated ? (
                                            <Badge className="flex items-center gap-1 border-0 bg-purple/20 text-xs text-purple">
                                                <Bot className="h-3 w-3" />
                                                IA
                                            </Badge>
                                        ) : (
                                            <Badge className="border-0 bg-slate-700 text-xs text-slate-400">
                                                Manuel
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEdit(ex)}
                                                className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteMutation.mutate(ex.id)
                                                }
                                                className="rounded p-1.5 text-slate-400 hover:bg-red-900/50 hover:text-red-400"
                                            >
                                                {ex.is_published ? (
                                                    <EyeOff className="h-3.5 w-3.5" />
                                                ) : (
                                                    <Eye className="h-3.5 w-3.5" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-40"
                >
                    Précédent
                </button>
                <span className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white">
                    Page {page}
                </span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white"
                >
                    Suivant
                </button>
            </div>

            {/* Modal formulaire */}
            <Modal
                open={showForm}
                onOpenChange={setShowForm}
                title={editEx ? "Modifier l'exercice" : 'Nouvel exercice'}
            >
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Matière *
                            </label>
                            <select
                                value={form.subject_id}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        subject_id: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                            >
                                <option value="">Choisir…</option>
                                {subjectsData.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} ({s.serie_code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Type *
                            </label>
                            <select
                                value={form.type}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        type: e.target
                                            .value as Exercise['type'],
                                    }))
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                            >
                                <option value="qcm">QCM</option>
                                <option value="vrai_faux">Vrai / Faux</option>
                                <option value="calcul">Calcul</option>
                                <option value="dissertation">
                                    Dissertation
                                </option>
                                <option value="oral">Oral</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Question *
                        </label>
                        <textarea
                            value={form.question_text}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    question_text: e.target.value,
                                }))
                            }
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Réponse correcte
                            </label>
                            <input
                                value={form.correct_answer}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        correct_answer: e.target.value,
                                    }))
                                }
                                placeholder="A, B, C, D ou texte"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Difficulté (1-5)
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={form.difficulty}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        difficulty: Number(e.target.value),
                                    }))
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Explication *
                        </label>
                        <textarea
                            value={form.explanation}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    explanation: e.target.value,
                                }))
                            }
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-green focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_annale"
                            checked={form.is_annale}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    is_annale: e.target.checked,
                                }))
                            }
                            className="h-4 w-4 accent-green"
                        />
                        <label
                            htmlFor="is_annale"
                            className="text-sm text-slate-700"
                        >
                            C'est une annale
                        </label>
                        {form.is_annale && (
                            <input
                                type="number"
                                value={form.annale_year}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        annale_year: Number(e.target.value),
                                    }))
                                }
                                className="ml-2 w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm focus:border-green focus:outline-none"
                                placeholder="Année"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setShowForm(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                !form.question_text ||
                                !form.explanation ||
                                createMutation.isPending ||
                                updateMutation.isPending
                            }
                            className="bg-green text-white hover:bg-green-dark"
                        >
                            {createMutation.isPending ||
                            updateMutation.isPending ? (
                                <Spinner className="h-4 w-4" />
                            ) : editEx ? (
                                'Sauvegarder'
                            ) : (
                                'Créer'
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
