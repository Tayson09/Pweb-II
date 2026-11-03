export function Icon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  return (
    <span
      className="material-icons-round"
      style={{ fontSize: size, color, lineHeight: 1, userSelect: 'none' }}
      aria-hidden
    >
      {name}
    </span>
  );
}
