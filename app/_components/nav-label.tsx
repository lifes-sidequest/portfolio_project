export function NavLabel({ children }: { children: string }) {
  return (
    <span className="nav-label">
      <span className="nav-label-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
