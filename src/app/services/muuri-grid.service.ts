import { Injectable } from '@angular/core';

import Muuri, { GridOptions } from 'muuri';

@Injectable({
  providedIn: 'root',
})
export class MuuriGridService {
  private muuriGrid!: Muuri;

  constructor() {}

  public initMuuriGrid(
    gridContainer: string | HTMLElement,
    gridOptions?: GridOptions
  ) {
    this.muuriGrid = new Muuri(gridContainer, { ...gridOptions });
  }

  public addItemToGrid(targetItem: HTMLElement[]) {
    if (this.muuriGrid) {
      this.muuriGrid.add(targetItem, { index: 0 });
    } else {
      return alert('Muuri grid is not initialized');
    }
  }

  public removeItemFromGrid(targetItem: HTMLElement) {
    if (this.muuriGrid) {
      this.muuriGrid.remove(this.muuriGrid.getItems(targetItem), {
        removeElements: true,
      });
    } else {
      return alert('Muuri grid is not initialized');
    }
  }
}
