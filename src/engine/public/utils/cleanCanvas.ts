import { BaseToolBox } from '../../types';

export const cleanCanvas = (toolbox: Partial<BaseToolBox>) => {
  if (!toolbox) return;
  if (!toolbox.canvas || !toolbox.ctx) return;
  const { ctx, canvas } = toolbox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
