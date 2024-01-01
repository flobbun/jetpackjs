import { GameToolBox } from '../types';

const debugLog = (
  message: string,
  toolbox: Partial<GameToolBox> | undefined
) => {
  if (!toolbox || !toolbox.debug) return;
  console.debug(`[•] ${message}`);
};

export default debugLog;
