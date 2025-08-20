"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";

interface GoogleMapProps {
  address: string;
  className?: string;
}

export default function GoogleMap({ address, className }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would integrate with Google Maps API
    // For now, we'll use an embedded map
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="${mapUrl}"
          style="border-radius: 8px;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      `;
    }
  }, [address]);

  return (
    <FadeIn>
      <Card className={`overflow-hidden ${className}`}>
        <div ref={mapRef} className="w-full h-64 md:h-80" />
      </Card>
    </FadeIn>
  );
}
