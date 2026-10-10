import { SendIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { aiChat } from '../../api/admin-portal.api';
import { toast } from 'react-toastify';
import { getApiErrorDetails } from '../../services/utils.service';
import { button, chip, cx, form, modal, text } from '../../theme/theme';

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
    <div className={modal.dialog}>
      <div className={modal.header}>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className={cx(modal.title, 'text-sm font-medium')}>
            Project assistant
          </span>
        </div>
        <button
          onClick={() => onClose?.()}
          aria-label="Close"
          className={button.icon}
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
            <p className={cx(text.muted, 'text-sm')}>
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
                  className={chip.suggestion}
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
                  ? 'border border-accent-line bg-accent-soft text-ink'
                  : 'border border-line text-ink-secondary'
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
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        )}

        {error && (
          <p className={cx(text.danger, 'text-sm')}>
            Chat is unavailable right now.
          </p>
        )}
      </div>

      <div
        className="border-t border-line px-3 pt-3"
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
            className={cx(
              form.input,
              'max-h-24 min-h-10 flex-1 resize-none py-2'
            )}
          />

          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            aria-label="Send"
            className={cx(button.primary, 'h-10 w-10 px-0')}
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-1.5 flex justify-end">
          <span
            className={cx(
              'text-[11px]',
              input.length > 180 ? text.danger : text.subtle
            )}
          >
            {input.length}/200
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
