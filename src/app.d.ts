declare global {
	const __BUILD_REVISION__: string;

	namespace App {
		interface PageData {
			title?: string;
			description?: string;
		}
	}
}

export {};
