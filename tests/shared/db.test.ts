// tests/shared/db.test.ts
import { DatabaseManager } from "@/shared/db";
import { openDB } from "idb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock idb
vi.mock("idb", () => ({
    openDB: vi.fn(),
}));

interface MockDB {
    put: ReturnType<typeof vi.fn>;
    get: ReturnType<typeof vi.fn>;
    getAll: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    objectStoreNames: {
        contains: ReturnType<typeof vi.fn>;
    };
    createObjectStore?: ReturnType<typeof vi.fn>;
}

describe("DatabaseManager", () => {
    let mockDb: MockDB;
    let manager: DatabaseManager;

    beforeEach(async () => {
        mockDb = {
            put: vi.fn(),
            get: vi.fn(),
            getAll: vi.fn(),
            delete: vi.fn(),
            objectStoreNames: {
                contains: vi.fn().mockReturnValue(true),
            },
        };

        (openDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockDb);
        // We need to re-instantiate or reset the module if it's a singleton export
        // But the class is exported too. Let's verify instance creation.
        manager = new DatabaseManager();
        await new Promise((r) => setTimeout(r, 0)); // tick for constructor promise
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should initialize DB", () => {
        expect(openDB).toHaveBeenCalledWith("speakflow_v6", 1, expect.any(Object));
    });

    it("should save record", async () => {
        const file = new File(["content"], "test.pdf");
        const blob = new Blob(["audio"], { type: "audio/mp3" });
        await manager.saveRecord(file, blob);
        expect(mockDb.put).toHaveBeenCalledWith(
            "records",
            expect.objectContaining({
                id: "test.pdf_7", // 7 bytes "content"
                fileName: "test.pdf",
            }),
        );
    });

    it("should get record", async () => {
        const file = new File(["content"], "test.pdf");
        await manager.getRecord(file);
        expect(mockDb.get).toHaveBeenCalledWith("records", "test.pdf_7");
    });

    it("should get record by id", async () => {
        await manager.getRecordById("some_id");
        expect(mockDb.get).toHaveBeenCalledWith("records", "some_id");
    });

    it("should get all records", async () => {
        await manager.getAllRecords();
        expect(mockDb.getAll).toHaveBeenCalledWith("records");
    });

    it("should delete record", async () => {
        await manager.deleteRecord("some_id");
        expect(mockDb.delete).toHaveBeenCalledWith("records", "some_id");
    });

    it("should handle upgrade needed", async () => {
        // To test the upgrade callback, we'd need to invoke the callback passed to openDB
        // This requires capturing the config object passed to openDB
        const openDBSpy = openDB as unknown as ReturnType<typeof vi.fn>;
        const upgradeCallback = openDBSpy.mock.calls[0][2].upgrade;

        const mockDbUpgrade = {
            objectStoreNames: { contains: vi.fn().mockReturnValue(false) },
            createObjectStore: vi.fn(),
        };

        upgradeCallback(mockDbUpgrade);
        expect(mockDbUpgrade.createObjectStore).toHaveBeenCalledWith("records", { keyPath: "id" });
    });
});
