

## Two issues, two small fixes — both in `src/components/CopilotPanel.tsx`

### 1. Render assistant messages as markdown

The Render agent returns markdown (lists, **bold**, headings, code), but we render it inside `<p className="whitespace-pre-wrap">{m.content}</p>` so it shows as raw `**text**` and `- item`.

**Fix:** add `react-markdown` + `remark-gfm` (for tables, task lists, autolinks) and render assistant messages through it. User messages stay as plain text (no need to parse what the user typed).

- Add deps: `react-markdown`, `remark-gfm`.
- New small component `MarkdownMessage` inside `CopilotPanel.tsx` that wraps `<ReactMarkdown remarkPlugins={[remarkGfm]}>` with Tailwind-styled element overrides (p, ul, ol, li, strong, em, a, code, pre, h1-3, blockquote) so it matches the existing chat bubble typography (small, tight leading, inherited color).
- In the chat map, when `m.role === "assistant"` use `<MarkdownMessage>{m.content}</MarkdownMessage>`; keep the current `<p>` for user messages.

### 2. Stop the whole page from scrolling on every chat update

Current code:
```ts
useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [chat.length, chatBusy]);
```

`scrollIntoView` without `block: "nearest"` walks up the ancestor chain and scrolls **every** scrollable parent — including the page/main container — to bring the target into view. That's why the whole screen jumps to the bottom.

**Fix:** scroll only the chat's own scroll container, not the window:

- Replace the `scrollIntoView` call with a direct `scrollTop = scrollHeight` on the chat messages container. Add a `chatScrollRef` on the `<div className="flex-1 ... overflow-y-auto ...">` that wraps the messages, and set `chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight` in the effect. This keeps autoscroll inside the panel and never touches the page scroll.
- Remove the now-unused `chatEndRef` and its sentinel `<div ref={chatEndRef} />`.

That's all. No other files touched.

## Files

- `src/components/CopilotPanel.tsx` — edit
- `package.json` — add `react-markdown` and `remark-gfm`

## Out of scope

- Markdown styling for the Suggestions cards (those are short structured strings; not needed unless you ask).
- Any change to the transcript auto-scroll in `meeting.tsx` (that one is intentional and uses its own ref correctly).

