import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveSearchService {
  private localStorageKey = 'searchParameters';

  setSavedSearch(searchParameters: SearchParameters): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(searchParameters));
  }

  getSavedSearch(): SearchParameters {
    const storedData = localStorage.getItem(this.localStorageKey);
    try {
      return storedData ? JSON.parse(storedData) : getDefaultSearchParameters();
    } catch (error) {
      console.error('Error parsing stored data:', error);
      return getDefaultSearchParameters();
    }
  }

  clearSavedSearch(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  isSavedSearchEmpty(): boolean {
    const storedData = localStorage.getItem(this.localStorageKey);
    return !storedData || storedData === 'null';
  }
}

interface SearchParameters {
  title: string;
  category: string;
  targetAudience: string;
  difficultyLevel: number;
  isLike : boolean;
  created : boolean;
}

function getDefaultSearchParameters(): SearchParameters {
  return {
    title : '',
    category : '',
    targetAudience : '',
    difficultyLevel : 0,
    isLike: false,
    created: false,
  };
}

