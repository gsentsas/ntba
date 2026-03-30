import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types';

type Props = {
    message: ChatMessageType;
    isStreaming?: boolean;
};

export function ChatMessage({ message, isStreaming }: Props) {
    const isAssistant = message.role === 'assistant';

    if (isAssistant) {
        return (
            <div className="flex items-start gap-3">
                {/* Avatar IA */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green text-sm text-white shadow">
                    ✦
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
                    {message.content === '' && isStreaming ? (
                        /* Indicateur de frappe */
                        <div className="flex items-center gap-1 py-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                        </div>
                    ) : (
                        <div className="prose prose-sm prose-headings:font-semibold prose-strong:text-slate-900 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-green-dark prose-pre:bg-slate-900 prose-pre:text-slate-50 max-w-none text-slate-800">
                            {message.provider ? (
                                <div className="mb-2 not-prose">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                            message.provider === 'anthropic'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}
                                    >
                                        {message.provider === 'anthropic'
                                            ? 'Mode IA avance'
                                            : 'Mode secours'}
                                    </span>
                                </div>
                            ) : null}
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                            {isStreaming && (
                                <span className="inline-block h-4 w-0.5 animate-pulse bg-green align-middle" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start justify-end gap-3">
            <div
                className={cn(
                    'max-w-[80%] rounded-2xl rounded-tr-sm bg-green px-4 py-3 text-sm text-white shadow',
                )}
            >
                {message.content}
            </div>

            {/* Avatar utilisateur */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-dark text-xs font-bold text-white shadow">
                Toi
            </div>
        </div>
    );
}
