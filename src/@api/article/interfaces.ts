import { IBaseFilter, IBaseResponse } from "src/interface";

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content?: unknown;
  publishedAt?: string;
  tags?: string[];
  authorIds?: string[];
  [key: string]: unknown;
}

export type IGetArticlesResponse = IBaseResponse<IArticle[]>;

export interface IArticleFilter extends IBaseFilter { }
