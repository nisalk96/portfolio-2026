"use client";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { withAutoplay } from "@/lib/video-url";

interface VideoEmbedProps {
  embedUrl: string;
  title: string;
  thumbnailUrl: string | null;
}

/** Shows a poster and only loads the (heavy) player iframe once clicked. */
export function VideoEmbed({ embedUrl, title, thumbnailUrl }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        title={`${title} video`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        src={withAutoplay(embedUrl)}
        className="aspect-video w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title} video`}
      className="group relative block aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950"
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
      <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-110">
        <IconPlayerPlayFilled className="ml-0.5 size-6" />
      </span>
    </button>
  );
}
