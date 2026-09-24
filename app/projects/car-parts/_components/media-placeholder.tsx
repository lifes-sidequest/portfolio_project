type MediaPlaceholderProps = {
  label: string;
  className?: string;
};

export function MediaPlaceholder({
  label,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`case-placeholder scroll-reveal ${className}`.trim()}
      aria-label={label}
    />
  );
}
