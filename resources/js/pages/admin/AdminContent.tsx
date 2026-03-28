import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Plus, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/services/api';
import type { Chapter, Subject } from '@/types';

// ─── Types admin ───────────────────────────────────────────────
type ChapterWithContent = Chapter & {
    exercises_count?: number;
};

type SubjectWithChapters = Subject & {
    chapters: ChapterWithContent[];
};

// ─── API helpers ────────────────────────────────────────────────
const adminContentApi = {
    subjects: async (): Promise<SubjectWithChapters[]> => {
        const subjects = (await api.get<Subject[]>('/subjects')).data;
        const withChapters = await Promise.all(
            subjects.map(async (s) => {
                const chapters = (await api.get<ChapterWithContent[]>(`/subjects/${s.id}/chapters`)).data;
                return { ...s, chapters };
            }),
        );
        return withChapters;
    },
    updateChapter: async (id: string, data: Partial<Chapter>) =>
        (await api.patch(`/chapters/${id}`, data)).data,
};

// ─── Composant édition de chapitre ─────────────────────────────
function ChapterEditor({
    chapter,
    onClose,
}: {
    chapter: ChapterWithContent;
    onClose: () => void;
}) {
    const [courseContent, setCourseContent] = useState(chapter.course_content ?? '');
    const [summary, setSummary] = useState(chapter.summary ?? '');
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        setSaving(true);
        try {
            await api.patch(`/chapters/${chapter.id}`, {
                course_content: courseContent,
                summary: summary,
            });
            toast.success('Chapitre mis à jour');
            onClose();
        } catch {
            toast.error('Erreur lors de la sauvegarde');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Card className="border-green/30 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base text-slate-800">{chapter.title}</CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">Chapitre {chapter.order_index}</p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X className="h-4 w-4" />
                </button>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Résumé */}
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Résumé (affiché aux élèves)
                    </label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={3}
                        placeholder="Résumé court du chapitre..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-green focus:outline-none"
                    />
                </div>

                {/* Contenu du cours */}
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Cours complet (Markdown)
                    </label>
                    <textarea
                        value={courseContent}
                        onChange={(e) => setCourseContent(e.target.value)}
                        rows={12}
                        placeholder="# Titre du chapitre&#10;&#10;## Notion 1&#10;&#10;Contenu en Markdown..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800 focus:border-green focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-slate-400">Markdown pris en charge : titres, listes, formules LaTeX $...$, tableaux</p>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green text-white hover:bg-green-dark"
                    >
                        {saving ? <Spinner className="h-3 w-3" /> : <Save className="h-3 w-3" />}
                        Sauvegarder
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Composant ligne sujet ──────────────────────────────────────
function SubjectRow({ subject }: { subject: SubjectWithChapters }) {
    const [expanded, setExpanded] = useState(false);
    const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

    const completedChapters = subject.chapters.filter((c) => c.course_content && c.course_content.length > 100).length;

    return (
        <Card className="border-white/70 bg-white/90 overflow-hidden">
            <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setExpanded((e) => !e)}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                        <p className="font-semibold text-slate-900">{subject.name}</p>
                        <p className="text-xs text-slate-400">{subject.serie_code} · Coeff {subject.coefficient}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className={`border-0 text-xs ${completedChapters === subject.chapters.length ? 'bg-green-light text-green-dark' : 'bg-amber-light text-amber'}`}>
                        {completedChapters}/{subject.chapters.length} chapitres
                    </Badge>
                    {expanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                </div>
            </button>

            {expanded && (
                <div className="border-t border-slate-100 px-5 pb-4 pt-3 space-y-3">
                    {subject.chapters.length === 0 ? (
                        <p className="text-sm text-slate-400 py-4 text-center">Aucun chapitre pour cette matière.</p>
                    ) : (
                        subject.chapters.map((chapter) => (
                            <div key={chapter.id}>
                                {editingChapterId === chapter.id ? (
                                    <ChapterEditor
                                        chapter={chapter}
                                        onClose={() => setEditingChapterId(null)}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-slate-300" />
                                            <span className="text-sm text-slate-700">{chapter.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400">
                                                {chapter.course_content && chapter.course_content.length > 100
                                                    ? `✅ ${chapter.course_content.length} chars`
                                                    : '⚠️ À compléter'}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingChapterId(chapter.id)}
                                                className="h-7 px-2 text-xs text-green hover:bg-green-xlight"
                                            >
                                                Éditer
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </Card>
    );
}

// ─── Page principale ────────────────────────────────────────────
export default function AdminContent() {
    const [selectedSerie, setSelectedSerie] = useState('');

    const { data: subjects = [], isLoading } = useQuery({
        queryKey: ['admin-content-subjects'],
        queryFn: adminContentApi.subjects,
        staleTime: 60_000,
    });

    const series = [...new Set(subjects.map((s) => s.serie_code))].sort();
    const filtered = selectedSerie ? subjects.filter((s) => s.serie_code === selectedSerie) : subjects;

    const totalChapters = subjects.reduce((sum, s) => sum + s.chapters.length, 0);
    const completedChapters = subjects.reduce(
        (sum, s) => sum + s.chapters.filter((c) => c.course_content && c.course_content.length > 100).length,
        0,
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestion du contenu</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Éditer les cours et chapitres pour toutes les séries.
                </p>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                    { label: 'Matières', value: subjects.length },
                    { label: 'Chapitres total', value: totalChapters },
                    { label: 'Chapitres complets', value: completedChapters },
                    { label: 'À compléter', value: totalChapters - completedChapters },
                ].map((kpi) => (
                    <Card key={kpi.label} className="border-white/70 bg-white/90">
                        <CardContent className="px-5 py-4">
                            <p className="text-xs text-slate-500">{kpi.label}</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{kpi.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filtre série */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedSerie('')}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${selectedSerie === '' ? 'bg-green text-white' : 'bg-white text-slate-600 hover:bg-green-xlight'}`}
                >
                    Toutes les séries
                </button>
                {series.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSelectedSerie(s)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${selectedSerie === s ? 'bg-green text-white' : 'bg-white text-slate-600 hover:bg-green-xlight'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Liste des matières */}
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <Spinner className="h-8 w-8 text-green" />
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((subject) => (
                        <SubjectRow key={subject.id} subject={subject} />
                    ))}
                </div>
            )}
        </div>
    );
}
