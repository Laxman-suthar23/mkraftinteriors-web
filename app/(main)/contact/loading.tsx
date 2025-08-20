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
      
      <div className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded w-48 mb-6" />
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="h-10 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="h-10 bg-muted rounded" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="h-32 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
              </div>
            </div>
            
            {/* Contact Info Skeleton */}
            <div className="space-y-8">
              <div className="h-8 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-full mb-8" />
              
              <div className="grid gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded" />
                ))}
              </div>
              
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
