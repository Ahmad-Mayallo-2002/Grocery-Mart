export default function Loading({ dimension }: { dimension: string }) {
  return (
    <div
      className="rounded-full animate-spin border-4 border-t-transparent"
      style={{ width: dimension, height: dimension }}
    ></div>
  );
}
