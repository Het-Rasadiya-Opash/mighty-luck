'use client';

import React from 'react';
import GameFrame from './GameFrame';
import { Maximize2, Heart } from 'lucide-react';
import Image from 'next/image';

interface GameOpenProps {
  gameId?: string;
}

export default function GameOpen({ gameId }: GameOpenProps) {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <GameFrame imageSrc="/game-frame.png" />
      
     
    </div>
  );
}
