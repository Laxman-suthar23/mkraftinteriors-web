export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-muted rounded w-48 mb-2" />
          <div className="h-4 bg-muted rounded w-72" />
        </div>
        <div className="h-10 bg-muted rounded w-32" />
      </div>
      
      <div className="bg-card rounded-lg p-6">
        <div className="h-10 bg-muted rounded max-w-md" />
      </div>
      
      <div className="bg-card rounded-lg">
        <div className="space-y-4 p-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-muted rounded" />
                ))}
              </div>
              <div className="h-4 bg-muted rounded w-24" />
              <div className="flex-1">
                <div className="h-3 bg-muted rounded w-full mb-1" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
              <div className="h-4 bg-muted rounded w-20" />
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
