export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-muted rounded w-48 mb-2" />
        <div className="h-4 bg-muted rounded w-64" />
      </div>
      
      <div className="grid w-full grid-cols-4 gap-2 bg-muted rounded-lg p-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-muted-foreground/20 rounded" />
        ))}
      </div>
      
      <div className="space-y-6">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
