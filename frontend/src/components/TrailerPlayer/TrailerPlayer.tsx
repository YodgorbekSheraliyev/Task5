import { useEffect, useRef, useState } from "react";
import type { TrailerSegment, TrailerSpec } from "../../models/Trailer";

import "./trailer.css";

interface TrailerPlayerProps {
  title: string;
  trailer: TrailerSpec;
}

function getColorFilter(filter: string): string {
  switch (filter) {
    case "warm":
      return "sepia(0.25) saturate(1.35)";

    case "cool":
      return "saturate(0.8) hue-rotate(180deg)";

    case "highContrast":
      return "contrast(1.4)";

    case "desaturated":
      return "saturate(0.35)";

    case "none":
    default:
      return "none";
  }
}
export function TrailerPlayer({ title, trailer }: TrailerPlayerProps) {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const timerRef = useRef<number | null>(null);

  const segment = trailer.segments[segmentIndex];

  useEffect(() => {
    setSegmentIndex(0);
    setPlaying(false);
  }, [trailer]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!playing || !segment) {
      return;
    }

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    if (segment.type === "clip") {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      video.currentTime = 0;

      video.playbackRate = segment.speed || 1;

      video.play().catch(() => {
        setPlaying(false);
      });

      return;
    }

    timerRef.current = window.setTimeout(
      moveToNextSegment,
      segment.duration * 1000,
    );

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [playing, segmentIndex, segment]);

  if (!segment) {
    return <div className="alert alert-secondary">Trailer unavailable.</div>;
  }

  function moveToNextSegment() {
    if (segmentIndex < trailer.segments.length - 1) {
      setSegmentIndex((current) => current + 1);
    } else {
      setPlaying(false);
      setSegmentIndex(0);
    }
  }

  function handlePlay() {
    setPlaying(true);
  }

  function handlePause() {
    videoRef.current?.pause();

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setPlaying(false);
  }

  function handleVideoEnded() {
    moveToNextSegment();
  }

  return (
    <div className="trailer-container">
      <div className="trailer-screen">
        {segment.type === "title" && (
          <TextSegment text={title} animationStyle={segment.animationStyle} />
        )}

        {segment.type === "filler" && (
          <TextSegment
            text={segment.text}
            animationStyle={segment.animationStyle}
          />
        )}

        {segment.type === "clip" && (
          <VideoSegment
            segment={segment}
            videoRef={videoRef}
            onEnded={handleVideoEnded}
          />
        )}

        {!playing && (
          <button
            type="button"
            className="btn btn-light trailer-play-button"
            onClick={handlePlay}
          >
            ▶
          </button>
        )}

        {playing && (
          <button
            type="button"
            className="btn btn-dark trailer-pause-button"
            onClick={handlePause}
          >
            ❚❚
          </button>
        )}

        <div className="trailer-counter">
          {segmentIndex + 1} / {trailer.segments.length}
        </div>
      </div>
    </div>
  );
}

interface TextSegmentProps {
  text: string;
  animationStyle: string;
}

function TextSegment({ text, animationStyle }: TextSegmentProps) {
  return <div className={`trailer-text trailer-${animationStyle}`}>{text}</div>;
}

interface VideoSegmentProps {
  segment: TrailerSegment;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onEnded: () => void;
}

function VideoSegment({ segment, videoRef, onEnded }: VideoSegmentProps) {
  const videoUrl = `/trailers/clips/${segment.clipId}.mp4`;

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className="trailer-video"
      style={{
        filter: getColorFilter(segment.colorFilter),

        transform: `scale(${segment.zoom || 1})`,
      }}
      playsInline
      muted
      onEnded={onEnded}
    />
  );
}
