import { execFileSync } from 'node:child_process';

let commit: string | null = null;
let committedAt: string | null = null;
let dirty: boolean | null = null;
try {
  const lines = execFileSync('git', ['show', '-s', '--format=%H%n%cI', 'HEAD'], { cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim().split('\n');
  if (/^[a-f0-9]{40}$/.test(lines[0]) && Number.isFinite(Date.parse(lines[1]))) {
    commit = lines[0];
    committedAt = new Date(lines[1]).toISOString();
  }
  dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim().length > 0;
} catch {
  // A source archive can build without Git history; missing commit data stays unavailable.
}

export const release = Object.freeze({ commit, committedAt, builtAt: new Date().toISOString(), dirty, timeZone: 'Asia/Ho_Chi_Minh' });
