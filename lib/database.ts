export enum DataBaseKeys {
	PERMISSION_PROFILE = "permissionProfile",
	TOKEN = "token",
	USER = "user",
}

enum DataBaseMode {
	READONLY = "readonly",
	READWRITE = "readwrite",
}

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("ensaware", 1);

		request.onerror = () => {
			reject(new Error("Error opening database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			resolve(db);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const keys = Object.values(DataBaseKeys);

			keys.forEach((key) => {
				if (!db.objectStoreNames.contains(key)) {
					const objectStore = db.createObjectStore(key, {
						keyPath: "id",
					});
					objectStore.createIndex(`${key}Index`, "id", {
						unique: true,
					});
				}
			});
		};
	});
}

export async function save<T>(
	objectStoreName: string,
	value: T
): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction(objectStoreName, DataBaseMode.READWRITE);
	const objectStore = transaction.objectStore(objectStoreName);

	if (Array.isArray(value)) {
		value.forEach((item) => {
			objectStore.add(item);
		});
	} else {
		objectStore.put(value);
	}
}

export async function get<T>(objectStoreName: string): Promise<T | null> {
	const db = await openDB();
	const transaction = db.transaction(objectStoreName, DataBaseMode.READONLY);
	const objectStore = transaction.objectStore(objectStoreName);

	const request = objectStore.getAll();

	return new Promise((resolve, reject) => {
		request.onsuccess = () => {
			const items = request.result;

			if (items.length > 1) {
				resolve(items as T);
			} else {
				resolve(items[0] as T);
			}
		};

		request.onerror = () => {
			reject(null);
		};
	});
}

export async function remove(objectStoreName: string): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction(objectStoreName, DataBaseMode.READWRITE);
	const objectStore = transaction.objectStore(objectStoreName);

	objectStore.clear();
}
