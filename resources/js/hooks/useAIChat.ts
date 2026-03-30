import { useState } from 'react';
import toast from 'react-hot-toast';

import { aiApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { ChatMessage, Exercise } from '@/types';

const defaultWelcomeMessage: ChatMessage = {
    role: 'assistant',
    content:
        'Je suis Prof IA. Choisis une matière ou pose directement ta question sur le BAC Sénégal.',
};

export function useAIChat() {
    const {
        activeChatSubjectId,
        currentSessionId,
        clearChatSession,
        setCurrentSessionId,
    } = useAppStore();
    const [messages, setMessages] = useState<ChatMessage[]>([
        defaultWelcomeMessage,
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [provider, setProvider] = useState<'anthropic' | 'fallback' | null>(
        null,
    );

    function replaceLastAssistantMessage(
        content: string,
        sourceProvider: 'anthropic' | 'fallback' | null = null,
    ) {
        setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];

            if (last?.role === 'assistant') {
                next[next.length - 1] = {
                    role: 'assistant',
                    content,
                    provider: sourceProvider,
                };

                return next;
            }

            return [
                ...next,
                {
                    role: 'assistant',
                    content,
                    provider: sourceProvider,
                },
            ];
        });
        setProvider(sourceProvider);
    }

    async function runAssistantAction(
        userMessage: string,
        task: () => Promise<{
            content: string;
            provider: 'anthropic' | 'fallback' | null;
        }>,
    ) {
        setError(null);
        setIsLoading(true);
        setMessages((prev) => [
            ...prev,
            { role: 'user', content: userMessage },
            { role: 'assistant', content: '' },
        ]);

        try {
            const result = await task();
            replaceLastAssistantMessage(result.content, result.provider);
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : 'Erreur du tuteur IA';
            setError(message);
            replaceLastAssistantMessage(
                `Je rencontre un problème temporaire : ${message}`,
                null,
            );
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    function formatGeneratedExercise(exercise: Exercise, chapterTitle?: string) {
        const options = exercise.options
            .map((option) => `- **${option.label}.** ${option.text}`)
            .join('\n');
        const hints = exercise.hints.map((hint) => `- ${hint}`).join('\n');

        return [
            `**Exercice généré${chapterTitle ? ` — ${chapterTitle}` : ''}**`,
            '',
            `**${exercise.title}**`,
            '',
            exercise.question_text,
            '',
            options,
            '',
            `**Réponse attendue :** ${exercise.correct_answer ?? 'Voir corrigé'}`,
            '',
            `**Explication :** ${exercise.explanation}`,
            '',
            `**Astuces :**`,
            hints,
            '',
            `Temps conseillé : ${exercise.estimated_time_minutes} min`,
            `Points : ${exercise.points}`,
        ].join('\n');
    }

    async function sendMessage(text: string, chapterId?: string) {
        setError(null);
        setIsLoading(true);

        setMessages((prev) => [
            ...prev,
            { role: 'user', content: text },
            { role: 'assistant', content: '' },
        ]);

        try {
            const result = await aiApi.chat(
                text,
                {
                    session_id: currentSessionId,
                    subject_id: activeChatSubjectId,
                    chapter_id: chapterId ?? null,
                },
                (chunk) => {
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];

                        if (last?.role === 'assistant') {
                            next[next.length - 1] = {
                                ...last,
                                content: last.content + chunk,
                            };
                        }

                        return next;
                    });
                },
            );

            setCurrentSessionId(result.sessionId);
            setProvider(result.provider);
            setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];

                if (last?.role === 'assistant') {
                    next[next.length - 1] = {
                        ...last,
                        provider: result.provider,
                    };
                }

                return next;
            });
        } catch (caughtError) {
            const message =
                caughtError instanceof Error
                    ? caughtError.message
                    : 'Erreur de chat IA';
            setError(
                message,
            );
            setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];

                if (last?.role === 'assistant') {
                    next[next.length - 1] = {
                        role: 'assistant',
                        content: `Je rencontre un problème temporaire : ${message}`,
                    };
                    return next;
                }

                return [
                    ...next,
                    {
                        role: 'assistant',
                        content: `Je rencontre un problème temporaire : ${message}`,
                    },
                ];
            });
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    function sendQuickQuestion(question: string) {
        return sendMessage(question);
    }

    function clearChat() {
        setMessages([defaultWelcomeMessage]);
        clearChatSession();
        setProvider(null);
    }

    function pushAssistantMessage(
        content: string,
        sourceProvider: 'anthropic' | 'fallback' | null = null,
    ) {
        setMessages((prev) => [
            ...prev,
            {
                role: 'assistant',
                content,
                provider: sourceProvider,
            },
        ]);
        setProvider(sourceProvider);
    }

    function generateAndAsk(
        type: 'exercise' | 'summary' | 'oral',
        options?: {
            subjectId?: string | null;
            subjectName?: string | null;
            chapterId?: string | null;
            chapterTitle?: string | null;
        },
    ) {
        const prompts = {
            exercise:
                'Génère-moi un exercice adapté à mon niveau sur ce chapitre.',
            summary: 'Prépare une fiche de révision claire sur ce chapitre.',
            oral: 'Interroge-moi à l’oral sur les notions essentielles de ce chapitre.',
        };

        if (type === 'summary' && options?.chapterId) {
            return runAssistantAction(prompts.summary, async () => {
                const result = await aiApi.summary(options.chapterId!);

                return {
                    content: `**Fiche de révision${options.chapterTitle ? ` — ${options.chapterTitle}` : ''}**\n\n${result.summary}`,
                    provider: result.provider ?? null,
                };
            });
        }

        if (type === 'exercise' && options?.subjectId && options?.chapterId) {
            return runAssistantAction(prompts.exercise, async () => {
                const result = await aiApi.generateExercise({
                    subject_id: options.subjectId!,
                    chapter_id: options.chapterId!,
                    difficulty: 3,
                    type: 'qcm',
                });

                return {
                    content: formatGeneratedExercise(
                        result,
                        options.chapterTitle ?? undefined,
                    ),
                    provider: result.provider ?? null,
                };
            });
        }

        return sendMessage(prompts[type], options?.chapterId ?? undefined);
    }

    return {
        messages,
        isLoading,
        error,
        provider,
        sendMessage,
        sendQuickQuestion,
        pushAssistantMessage,
        clearChat,
        generateAndAsk,
    };
}
