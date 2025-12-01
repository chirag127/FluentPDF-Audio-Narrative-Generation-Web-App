// src/shared/utils.ts

export function chunkText(text: string, maxSize: number): string[] {
    if (!text) {
        return [];
    }

    const chunks: string[] = [];
    let currentChunk = "";

    const lines = text.split("\n");

    for (const line of lines) {
        if (currentChunk.length + line.length > maxSize) {
            chunks.push(currentChunk);
            currentChunk = `${line}\n`;
        } else {
            currentChunk += `${line}\n`;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

export function sanitizeFileName(name: string): string {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

export function formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) {
        return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function generateId(): string {
    return (
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
}

export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
