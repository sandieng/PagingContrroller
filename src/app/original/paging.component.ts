export class Pagination1 {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  morePreviousPages: boolean;
  moreNextPages: boolean;

  private pageData: any;

  constructor(pages: any, pageSize: number) {
    this.pageData = pages;
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.moreNextPages = false;
    this.morePreviousPages = false;
    this.totalRecords = pages.length;
    this.totalPages = Math.round(this.totalRecords / this.pageSize);

    if (this.totalPages > 1) this.moreNextPages = true;
  }

  getFirstPage(): any {
    return this.pageData.slice(0, this.pageSize);
  }

  getPreviousPage(): any {
    if (this.currentPage > 1) this.currentPage--;
    if (this.currentPage === 1) this.morePreviousPages = false;

    const startingIndex = this.currentPage * this.pageSize - this.pageSize;

    if (startingIndex >= 0) {
      this.moreNextPages = true;
      return this.pageData.slice(startingIndex, startingIndex + this.pageSize);
    }
  }

  getNextPage(): any {
    const startingIndex = this.currentPage * this.pageSize;

    if (startingIndex + this.pageSize < this.totalRecords) {
      this.currentPage++;
      this.moreNextPages = true;
      this.morePreviousPages = true;
      return this.pageData.slice(startingIndex, startingIndex + this.pageSize);
    }

    // Last page
    this.moreNextPages = false;
    this.morePreviousPages = true;
    if (startingIndex === this.totalRecords) {      
      return this.pageData.slice(startingIndex - this.pageSize, this.totalRecords);
    }
    else {
      // return remaining records in the last page
      this.currentPage++;
      return this.pageData.slice(startingIndex, this.totalRecords);
    }
  }
}