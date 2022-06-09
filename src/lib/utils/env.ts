export function readFromEnv(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Environment variable "${name}" does not exist.`);
}
