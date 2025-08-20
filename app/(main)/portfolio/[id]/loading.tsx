export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-muted-foreground">Loading Project Details...</p>
      </div>
    </div>
  );
}
