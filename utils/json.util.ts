// utils/json.util.ts
import fs from 'fs';
import path from 'path';

export class JsonUtil {
  static writeJson(filePath: string, data: object) {
    const fullPath = path.resolve(filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  }

  static readJson<T>(filePath: string): T {
    const fullPath = path.resolve(filePath);
    const fileData = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(fileData) as T;
  }
}