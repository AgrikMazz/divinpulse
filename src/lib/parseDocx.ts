import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

export async function parseDocx(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const { value } = await mammoth.convertToHtml({ buffer });
  return value; // Returns HTML string
}
