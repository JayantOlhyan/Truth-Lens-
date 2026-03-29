export default function TextInputArea({ text, setText }) {
  const maxLength = 5000;
  
  return (
    <div className="w-full relative animate-fade-up">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news article, WhatsApp forward, or suspicious claim here..."
        className="w-full min-h-[220px] glass-input p-6 pb-12 resize-y text-lg leading-relaxed shadow-inner"
        maxLength={maxLength}
      />
      <div className="absolute bottom-5 right-5 text-sm font-medium text-text-muted select-none">
        <span className={text.length >= maxLength ? "text-danger" : text.length > 0 ? "text-accent-teal" : ""}>
          {text.length}
        </span>
        {" / "}{maxLength}
      </div>
    </div>
  );
}
