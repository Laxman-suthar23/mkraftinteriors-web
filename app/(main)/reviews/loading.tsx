export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-muted/30 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 bg-muted rounded w-64 mx-auto mb-6" />
            <div className="h-6 bg-muted rounded w-96 mx-auto mb-8" />
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-muted rounded" />
                ))}
              </div>
              <div className="h-8 bg-muted rounded w-12" />
              <div className="h-6 bg-muted rounded w-24" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-4 h-4 bg-muted-foreground/20 rounded" />
                      ))}
                    </div>
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-5/6" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-4/5" />
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-1" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
