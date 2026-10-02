import { isPending, type Spec } from "@/lib/data/plans";

// Renders a plan spec. Unconfirmed values (TODO_CONFIRM) show as "Ask us" to
// visitors and as a loud marker in development so they're easy to spot.
export function SpecValue({ value }: { value: Spec }) {
  if (!isPending(value)) return <>{value}</>;

  if (process.env.NODE_ENV !== "production") {
    return (
      <span className="font-mono text-[0.6875rem] text-danger" title="Value not confirmed yet">
        TODO_CONFIRM
      </span>
    );
  }

  return (
    <span className="text-ink-muted" title="Not published yet, contact us for details">
      Ask us
    </span>
  );
}
