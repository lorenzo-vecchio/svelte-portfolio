export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

export interface Readme {
	repository: string;
	branch: string;
	markdown: string;
	html: string;
	toc: TocEntry[];
}

export const emptyReadme: Readme = {
	repository: '',
	branch: '',
	markdown: '',
	html: '',
	toc: []
};
