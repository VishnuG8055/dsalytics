const INTERVALS = {
  revision1: 7,
  revision2: 30,
  recheck: 90,
}

export function getRevisionStatus(problem) {
  const now = Date.now()
  const daysSince = (t) => (now - new Date(t)) / 86400000

  if (!problem.revision1) {
    const days = daysSince(problem.solved_at)
    return {
      due: days >= INTERVALS.revision1,
      type: 'revision1',
      label: 'Rev 1',
      daysOverdue: Math.floor(days - INTERVALS.revision1),
      dueDate: new Date(new Date(problem.solved_at).getTime() + INTERVALS.revision1 * 86400000)
    }
  }
  if (!problem.revision2) {
    const days = daysSince(problem.revision1_at)
    return {
      due: days >= INTERVALS.revision2,
      type: 'revision2',
      label: 'Rev 2',
      daysOverdue: Math.floor(days - INTERVALS.revision2),
      dueDate: new Date(new Date(problem.revision1_at).getTime() + INTERVALS.revision2 * 86400000)
    }
  }
  if (!problem.confident) {
    const days = daysSince(problem.revision2_at)
    return {
      due: days >= INTERVALS.recheck,
      type: 'recheck',
      label: 'Confident?',
      daysOverdue: Math.floor(days - INTERVALS.recheck),
      dueDate: new Date(new Date(problem.revision2_at).getTime() + INTERVALS.recheck * 86400000)
    }
  }
  return { due: false, type: 'done', label: 'Mastered' }
}

export function getTodaysQueue(problems) {
  return problems
    .map(p => ({ ...p, revStatus: getRevisionStatus(p) }))
    .filter(p => p.revStatus.due)
    .sort((a, b) => b.revStatus.daysOverdue - a.revStatus.daysOverdue)
}