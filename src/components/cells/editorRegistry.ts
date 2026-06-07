import { CellType } from "../Types";

/**
 * A module-level registry that lets a save read each mounted cell's *latest*
 * content/title straight from its editor/input, instead of the debounced React
 * state. This fixes the "first Ctrl+S saves stale text" bug: typing pushes to
 * state on a 1s debounce, but a save can flush the live value immediately.
 *
 * Only on-screen cells are registered (Virtuoso unmounts off-screen ones); for
 * those we fall back to the value already in state.
 */
type Entry = {
  getContent?: () => string;
  getTitle?: () => string;
  cancelContent?: () => void;
  cancelTitle?: () => void;
};

const registry = new Map<string, Entry>();

export function setCellFlush(id: string, part: Entry): void {
  registry.set(id, { ...registry.get(id), ...part });
}

export function clearCellFlush(id: string, keys: (keyof Entry)[]): void {
  const entry = registry.get(id);
  if (!entry) return;
  for (const key of keys) delete entry[key];
  if (Object.keys(entry).length === 0) registry.delete(id);
}

/**
 * Returns a new cells array with each mounted cell's content/title replaced by
 * its live value, and cancels that cell's pending debounce so it can't re-dirty
 * the file right after a successful save.
 */
export function flushCells(cells: CellType[]): CellType[] {
  return cells.map((cell) => {
    const entry = registry.get(cell.id);
    if (!entry) return cell;
    entry.cancelContent?.();
    entry.cancelTitle?.();
    const content = entry.getContent ? entry.getContent() : cell.content;
    const title = entry.getTitle ? entry.getTitle() : cell.title;
    if (content === cell.content && title === cell.title) return cell;
    return { ...cell, content, title };
  });
}
