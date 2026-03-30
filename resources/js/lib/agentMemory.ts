import type { AgentPdf } from '@/types';

export type AgentMemoryAction =
    | 'study-pack'
    | 'answer-correction'
    | 'photo-correction';

type StoredAgentPdf = Pick<AgentPdf, 'file_name' | 'mime_type' | 'base64'>;

export type AgentSessionDraft = {
    serieCode: string;
    subjectId: string;
    chapterId: string;
    exerciseId: string;
    answerDraft: string;
    updatedAt: string;
};

export type AgentHistoryItem = {
    id: string;
    type: AgentMemoryAction;
    title: string;
    subtitle: string;
    provider?: 'anthropic' | 'fallback' | 'internal' | null;
    serieCode?: string;
    subjectId?: string;
    chapterId?: string;
    exerciseId?: string;
    pdf?: StoredAgentPdf;
    createdAt: string;
};

type AgentMemoryState = {
    lastSession: AgentSessionDraft | null;
    recentItems: AgentHistoryItem[];
};

const STORAGE_KEY = 'bac-agent-memory-v1';
const MAX_PDF_BASE64_LENGTH = 350_000;

function getDefaultState(): AgentMemoryState {
    return {
        lastSession: null,
        recentItems: [],
    };
}

export function loadAgentMemory(): AgentMemoryState {
    if (typeof window === 'undefined') {
        return getDefaultState();
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return getDefaultState();
        }

        const parsed = JSON.parse(raw) as AgentMemoryState;

        return {
            lastSession: parsed.lastSession ?? null,
            recentItems: Array.isArray(parsed.recentItems)
                ? parsed.recentItems
                : [],
        };
    } catch {
        return getDefaultState();
    }
}

function saveAgentMemory(nextState: AgentMemoryState) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function rememberAgentSession(
    session: Omit<AgentSessionDraft, 'updatedAt'>,
) {
    const nextState = loadAgentMemory();

    nextState.lastSession = {
        ...session,
        updatedAt: new Date().toISOString(),
    };

    saveAgentMemory(nextState);
    return nextState;
}

export function rememberAgentHistoryItem(
    item: Omit<AgentHistoryItem, 'id' | 'createdAt'>,
) {
    const nextState = loadAgentMemory();
    const pdf =
        item.pdf && item.pdf.base64.length <= MAX_PDF_BASE64_LENGTH
            ? item.pdf
            : undefined;

    nextState.recentItems = [
        {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString(),
            ...item,
            pdf,
        },
        ...nextState.recentItems,
    ].slice(0, 8);

    saveAgentMemory(nextState);
    return nextState;
}
