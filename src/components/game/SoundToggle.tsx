"use client";

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toggleMute as toggleAudioMute } from '@/lib/sounds';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const muted = localStorage.getItem('rupee-quest-muted') !== 'false';
    setIsMuted(muted);
    toggleAudioMute(muted);
  }, []);

  const handleToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('rupee-quest-muted', String(newMutedState));
    toggleAudioMute(newMutedState);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      <span className="sr-only">Toggle Sound</span>
    </Button>
  );
}
