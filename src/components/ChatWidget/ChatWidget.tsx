import { SendIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { aiChat } from '../../api/admin-portal.api';
import { toast } from 'react-toastify';
import { getApiErrorDetails } from '../../services/utils.service';

type Message = { role: 'user' | 'assistant'; content: string };

const ChatWidget = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  async function send(text: string) {
    try {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;
      setInput('');
      setError(false);
      setMessages((m) => [...m, { role: 'user', content: trimmed }]);
      setIsLoading(true);
      const data = await aiChat(
        JSON.stringify({ text: trimmed, history: messages })
      );

      setIsLoading(false);
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data?.data?.data?.summary },
      ]);
    } catch (err) {
      setIsLoading(false);
      const { message } = getApiErrorDetails(err);
      toast.error(message, {});
    }
  }
  return (
    <div
      className="bg-white dark:bg-slate-900
        text-slate-900 dark:text-slate-100
        shadow-2xl border-l border-slate-200 dark:border-slate-800
        flex flex-col max-h-[85vh] md:h-125 md:max-h-125 fixed z-300 left-0 right-0 bottom-0 md:absolute md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl"
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#534ab7] dark:bg-[#7f77dd]" />
          <span className="text-sm font-medium">Project assistant</span>
        </div>
        <button
          onClick={() => onClose?.()}
          aria-label="Close"
          className="cursor-pointer rounded-md p-1 text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ask me what this project is, how it was built, or how to try it.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Tell me about the developer',
                'What is this project?',
                'What stack does it use?',
                'Can I try it?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="cursor-pointer rounded-full border border-[#534ab7]/30 dark:border-[#534ab7]/40 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 transition hover:border-[#534ab7] hover:text-slate-900 dark:hover:border-[#7f77dd] dark:hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'user' ? 'flex justify-end' : 'flex justify-start'
            }
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'border border-[#534ab7]/40 bg-[#534ab7]/10 text-slate-900 dark:border-[#534ab7]/50 dark:bg-[#534ab7]/15 dark:text-slate-100'
                  : 'border border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-1 px-1">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#534ab7] dark:bg-[#7f77dd]"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-rose-600 dark:text-[#fb7185]">
            Chat is unavailable right now.
          </p>
        )}
      </div>

      <div
        className="border-t border-slate-200 dark:border-white/10 px-3 pt-3"
        style={{
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={input}
            maxLength={200}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about this project…"
            className="max-h-24 min-h-[2.5rem] flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#534ab7] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#7f77dd]"
          />

          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            aria-label="Send"
            className="cursor-pointer rounded-lg border border-[#534ab7]/40 bg-[#534ab7]/10 p-2.5 text-[#534ab7] transition hover:border-[#534ab7] hover:bg-[#534ab7]/20 disabled:opacity-40 dark:border-[#534ab7]/50 dark:bg-[#534ab7]/20 dark:text-slate-100 dark:hover:border-[#7f77dd] dark:hover:bg-[#534ab7]/30"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-1.5 flex justify-end">
          <span
            className={`text-[11px] ${input.length > 180 ? 'text-rose-600 dark:text-[#fb7185]' : 'text-slate-400 dark:text-slate-500'}`}
          >
            {input.length}/200
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
