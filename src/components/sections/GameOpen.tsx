'use client';

import GameFrame from './GameFrame';
import NinjaSlot from './NinjaSlot';

interface GameOpenProps {
  gameId?: string;
}

export default function GameOpen({ gameId }: GameOpenProps) {
  return (
    <div className="w-full  mx-auto flex flex-col gap-4">
      <GameFrame imageSrc="/game-frame.png" />
      <NinjaSlot />
    </div>
  );
}
