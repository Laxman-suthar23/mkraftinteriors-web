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
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="h-10 bg-muted rounded flex-1 lg:w-80" />
              <div className="h-10 bg-muted rounded w-48" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 bg-muted rounded w-24" />
              <div className="h-8 bg-muted rounded w-20" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-padding">
        <div className="container">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`bg-muted rounded-lg break-inside-avoid mb-4 ${
                  i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
