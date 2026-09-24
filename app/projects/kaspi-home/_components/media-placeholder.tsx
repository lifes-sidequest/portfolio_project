export function MediaPlaceholder({ className = "" }: { className?: string }) {
  return <div className={`case-placeholder scroll-reveal ${className}`} aria-label="Project image placeholder" />;
}
