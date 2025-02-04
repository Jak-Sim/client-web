export default function isVaildObject(obj: Record<string, unknown> | undefined | null) {
  if (!obj) return false;
  const conditions = [
    typeof obj === 'object',
    Object.keys(obj as object).length > 0,
    Object.values(obj as object).some((value) => value),
  ];
  return conditions.every((condition) => condition);
}
