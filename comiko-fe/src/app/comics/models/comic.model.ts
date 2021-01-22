export interface Comic {
  id: number;
  name: string;
  thumbnailUrl: string;
}

export interface SelectedComic extends Comic {
  pages: string[];
  selectedPageIndex: number;
}

export interface CreateComic {
  name: string;
  path: string;
}
