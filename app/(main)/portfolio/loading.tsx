export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-muted/30 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 bg-muted rounded w-64 mx-auto mb-6" />
            <div className="h-6 bg-muted rounded w-96 mx-auto" />
          </div>
        </div>
      </div>
      
      <div className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-10 bg-muted rounded flex-1 max-w-md" />
            <div className="h-10 bg-muted rounded w-48" />
          </div>
        </div>
      </div>
      
      <div className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
