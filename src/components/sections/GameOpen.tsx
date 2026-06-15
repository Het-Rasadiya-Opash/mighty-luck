'use client';

import React from 'react';
import GameFrame from './GameFrame';
import NinjaSlot from './NinjaSlot';

interface GameOpenProps {
  gameId?: string;
}

export default function GameOpen({ gameId }: GameOpenProps) {
  return (
    <div>
      <GameFrame imageSrc="/game-frame.png" />
      <NinjaSlot />
      
     
    </div>
  );
}
