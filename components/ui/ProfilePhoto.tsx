"use client";

import { useState } from "react";
import Image from "next/image";
import { person } from "@/data/content";
import { asset } from "@/lib/utils";

/** Round portrait from /public/profile.jpg, falling back to initials if the file is missing. */
export function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative size-full overflow-hidden rounded-full bg-accent-soft">
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-accent/40"
      >
        {person.initials}
      </span>
      {!failed && (
        <Image
          src={asset(person.photo)}
          alt={person.photoAlt}
          fill
          priority
          sizes="(min-width: 1024px) 360px, 280px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
