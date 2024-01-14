"use client";

export enum DataBaseKeys {
	PERMISSION_PROFILE = "permissionProfile",
	TOKEN = "token",
	USER = "user",
}

enum DataBaseMode {
	READONLY = "readonly",
	READWRITE = "readwrite",
}

const openRequest = indexedDB.open("ensaware", 1);

openRequest.onerror = () => {
	new Error("Error opening database");
};

let db: IDBDatabase | null = null;

openRequest.onsuccess = (event) => {
	db = (event.target as IDBOpenDBRequest).result;
};

openRequest.onupgradeneeded = (event) => {
	db = (event.target as IDBOpenDBRequest).result;
	const keys = Object.values(DataBaseKeys);

	keys.forEach((key) => {
		if (!db?.objectStoreNames.contains(key)) {
			const objectStore = db?.createObjectStore(key, {
				keyPath: "id",
			});
			objectStore?.createIndex(`${key}Index`, "id", {
				unique: true,
			});
		}
	});
};

export function save<T>(objectStoreName: string, value: T) {
	const transaction = db?.transaction(objectStoreName, DataBaseMode.READWRITE);
	const objectStore = transaction?.objectStore(objectStoreName);

	if (Array.isArray(value)) {
		value.forEach((item) => {
			objectStore?.add(item);
		});
	} else {
		objectStore?.put(value);
	}
}

export function get<T>(objectStoreName: string) {
	const transaction = db!.transaction(objectStoreName, DataBaseMode.READONLY);
	const objectStore = transaction?.objectStore(objectStoreName);

	const request = objectStore?.getAll();

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

export function remove(objectStoreName: string) {
	const transaction = db?.transaction(objectStoreName, DataBaseMode.READWRITE);
	const objectStore = transaction?.objectStore(objectStoreName);

	objectStore?.clear();
}
