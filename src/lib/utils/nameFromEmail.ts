export const nameFromEmail = (email: string): string => {
  const local = (email.split('@')[0] || '').replace(/\d+$/g, '');
  const words = local.split(/[._\-+\s]+/).filter(Boolean);
  if (words.length === 0) return 'User';
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};
