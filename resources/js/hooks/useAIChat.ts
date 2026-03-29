import { useState } from 'react';

import { aiApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { ChatMessage } from '@/types';

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

    async function sendMessage(text: string, chapterId?: string) {
        setError(null);
        setIsLoading(true);

        setMessages((prev) => [
            ...prev,
            { role: 'user', content: text },
            { role: 'assistant', content: '' },
        ]);

        try {
            const sessionId = await aiApi.chat(
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

            setCurrentSessionId(sessionId);
        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? caughtError.message
                    : 'Erreur de chat IA',
            );
            setMessages((prev) => prev.slice(0, -1));
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
    }

    function generateAndAsk(type: 'exercise' | 'summary' | 'oral') {
        const prompts = {
            exercise:
                'Génère-moi un exercice adapté à mon niveau sur ce chapitre.',
            summary: 'Prépare une fiche de révision claire sur ce chapitre.',
            oral: 'Interroge-moi à l’oral sur les notions essentielles de ce chapitre.',
        };

        return sendMessage(prompts[type]);
    }

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        sendQuickQuestion,
        clearChat,
        generateAndAsk,
    };
}
