export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-muted rounded w-64 mx-auto mb-8" />
          <div className="h-6 bg-muted rounded w-96 mx-auto mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="h-96 bg-muted rounded" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 bg-muted rounded-full mx-auto mb-6" />
                <div className="h-6 bg-muted rounded w-32 mx-auto mb-2" />
                <div className="h-4 bg-muted rounded w-40 mx-auto mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
