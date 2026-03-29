import { useQuery } from '@tanstack/react-query';
import { Camera, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { ChatMessage } from '@/components/ChatMessage';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAIChat } from '@/hooks/useAIChat';
import { subjectsApi, aiApi } from '@/services/api';
import { useAppStore } from '@/store';

const QUICK_ACTIONS = [
    {
        label: 'Explique ce chapitre',
        value: 'Explique-moi les notions essentielles de ce chapitre de façon claire.',
    },
    { label: 'Génère un exercice', value: 'exercise' as const },
    { label: 'Fiche de révision', value: 'summary' as const },
    {
        label: 'Erreurs classiques',
        value: 'Quelles sont les erreurs classiques des élèves au BAC sur ce chapitre ?',
    },
    { label: 'Interrogation orale', value: 'oral' as const },
];

export default function AIChat() {
    const { user, setActiveChatSubject, activeChatSubjectId, setPage } =
        useAppStore();
    const {
        messages,
        isLoading,
        sendMessage,
        sendQuickQuestion,
        clearChat,
        generateAndAsk,
    } = useAIChat();

    const [input, setInput] = useState('');
    const [photoLoading, setPhotoLoading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', user?.serie_code],
        queryFn: () => subjectsApi.list(user?.serie_code),
        enabled: !!user?.serie_code,
    });

    useEffect(() => {
        setPage('ai-chat');
    }, [setPage]);

    // Auto-scroll vers le bas à chaque nouveau message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function handleSend() {
        if (!input.trim() || isLoading) {
            return;
        }

        const text = input.trim();
        setInput('');
        sendMessage(text);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function handleQuickAction(
        value: string | 'exercise' | 'summary' | 'oral',
    ) {
        if (value === 'exercise' || value === 'summary' || value === 'oral') {
            generateAndAsk(value);
        } else {
            sendQuickQuestion(value);
        }
    }

    async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image trop grande (max 5 Mo)');

            return;
        }

        if (!user?.is_premium) {
            toast.error('Correction photo réservée aux élèves Premium');

            return;
        }

        setPhotoLoading(true);

        try {
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const base64 = (ev.target?.result as string).split(',')[1];
                const result = await aiApi.correctPhoto({
                    image_base64: base64,
                    media_type: file.type,
                    subject_id: activeChatSubjectId,
                });
                sendQuickQuestion(
                    `[Photo envoyée]\n\n**Correction IA :**\n${result.correction}\n\n**Note estimée :** ${result.note_estimee}/20\n\n**Points à retravailler :** ${result.points_a_retravailler.join(', ')}`,
                );
            };
            reader.readAsDataURL(file);
        } catch {
            toast.error('Erreur lors de la correction de la photo');
        } finally {
            setPhotoLoading(false);

            if (fileRef.current) {
                fileRef.current.value = '';
            }
        }
    }

    // Dernier message assistant pour afficher les quick actions
    const showQuickActions = messages.length <= 2 && !isLoading;

    return (
        <Layout>
            <div className="flex h-[calc(100vh-8rem)] flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* ── Sélecteur de matière ── */}
                <div className="scrollbar-none flex items-center gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
                    <button
                        onClick={() => setActiveChatSubject(null)}
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                            !activeChatSubjectId
                                ? 'bg-green text-white shadow'
                                : 'bg-slate-100 text-slate-600 hover:bg-green-light hover:text-green-dark'
                        }`}
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        Général
                    </button>

                    {subjects.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => setActiveChatSubject(subject.id)}
                            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                                activeChatSubjectId === subject.id
                                    ? 'bg-green text-white shadow'
                                    : 'bg-slate-100 text-slate-600 hover:bg-green-light hover:text-green-dark'
                            }`}
                        >
                            <span>{subject.icon}</span>
                            {subject.name}
                        </button>
                    ))}
                </div>

                {/* ── Zone de messages ── */}
                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                    {messages.map((msg, i) => (
                        <ChatMessage
                            key={i}
                            message={msg}
                            isStreaming={
                                isLoading &&
                                i === messages.length - 1 &&
                                msg.role === 'assistant'
                            }
                        />
                    ))}

                    {/* Quick actions après le 1er message */}
                    {showQuickActions && (
                        <div className="flex flex-wrap gap-2 pl-11">
                            {QUICK_ACTIONS.map((action) => (
                                <button
                                    key={action.label}
                                    onClick={() =>
                                        handleQuickAction(action.value)
                                    }
                                    className="rounded-full border border-green/30 bg-green-xlight px-3 py-1.5 text-xs font-medium text-green-dark transition-colors hover:bg-green-light"
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* ── Barre de saisie ── */}
                <div className="border-t border-slate-100 px-4 py-3">
                    <div className="flex items-end gap-2">
                        {/* Bouton photo */}
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            disabled={photoLoading || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-green-light hover:text-green disabled:opacity-40"
                            title={
                                user?.is_premium
                                    ? 'Corriger une photo'
                                    : 'Premium requis'
                            }
                        >
                            {photoLoading ? (
                                <Spinner className="h-4 w-4" />
                            ) : (
                                <Camera className="h-5 w-5" />
                            )}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handlePhotoUpload}
                        />

                        {/* Input texte */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                activeChatSubjectId
                                    ? `Pose ta question sur ${subjects.find((s) => s.id === activeChatSubjectId)?.name ?? 'cette matière'}…`
                                    : 'Pose ta question sur le BAC Sénégal…'
                            }
                            rows={1}
                            className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20 focus:outline-none"
                            style={{ maxHeight: 120, overflowY: 'auto' }}
                        />

                        {/* Bouton effacer */}
                        {messages.length > 1 && (
                            <button
                                type="button"
                                onClick={clearChat}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                title="Nouvelle conversation"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        )}

                        {/* Bouton envoyer */}
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green text-white shadow transition-colors hover:bg-green-dark disabled:opacity-40"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Indicateur premium pour correction photo */}
                    {!user?.is_premium && (
                        <p className="mt-1.5 text-center text-[11px] text-slate-400">
                            ✨ La correction de photo est réservée aux élèves{' '}
                            <span className="font-medium text-amber">
                                Premium
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
