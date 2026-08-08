"use server";

import {
  getPagesData as _getPagesData,
  getPageById as _getPageById,
  updatePageData as _updatePageData,
  createPage as _createPage,
  deletePage as _deletePage,
  PageData,
} from "@/data/pagesStorage";

export async function getPagesData() {
  return await _getPagesData();
}

export async function getPageById(id: string) {
  return await _getPageById(id);
}

export async function updatePageData(id: string, updatedFields: Partial<PageData>) {
  return await _updatePageData(id, updatedFields);
}

export async function createPage(newPageData: Partial<PageData>) {
  return await _createPage(newPageData);
}

export async function deletePage(id: string) {
  return await _deletePage(id);
}
