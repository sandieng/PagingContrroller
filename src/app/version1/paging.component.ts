import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging-control',
  templateUrl: './paging.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() pageData: any;
  @Output() pageLoaded = new EventEmitter<any>(true);
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  morePreviousPages: boolean;
  moreNextPages: boolean;
  startIndex: number;
  availablePageSizes = [{ 'size': 5, 'value': 5 }, { 'size': 10, 'value': 10 }, { 'size': 25, 'value': 25 }, { 'size': 50, 'value': 50 }];

  constructor() {
    this.currentPage = 1;
    this.moreNextPages = false;
    this.morePreviousPages = false;
    this.pageSize = 5;
    this.startIndex = 0;
  }

  ngOnInit() {
    if (this.pageData) {
      this.totalRecords = this.pageData.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

      if (this.totalPages > 1) this.moreNextPages = true;

      this.pageLoaded.emit(this.getFirstPage());
    }
  }

  onChange(event) {
    this.pageSize = event.target.value;
    this.resizePage();
  }

  getFirstPage(): any {
    return this.pageData.slice(0, this.pageSize);
  }

  resizePage() {
    this.moreNextPages = false;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

    if (this.totalPages > 1) this.moreNextPages = true;

    this.pageLoaded.emit(this.getCurrentPage());
  }

  getCurrentPage(): any {
    this.moreNextPages = (this.currentPage < this.totalPages);
    this.morePreviousPages = (this.currentPage > 1);

    if (this.startIndex + this.pageSize < this.totalRecords) {
      const nextPage = this.pageData.slice(this.startIndex, this.startIndex + this.pageSize);
      return nextPage;
    }

    // Last page
    if (this.startIndex === this.totalRecords) {
      const nextPage = this.pageData.slice(this.startIndex - this.pageSize, this.totalRecords);
      return nextPage;
    } else {
      // return remaining records in the last page
      const nextPage = this.pageData.slice(this.startIndex, this.totalRecords);
      return nextPage;
    }
  }

  getPreviousPage(): any {
    if (this.currentPage > 1) this.currentPage--;
    if (this.currentPage === 1) this.morePreviousPages = false;

    this.moreNextPages = (this.currentPage < this.totalPages);
    this.morePreviousPages = (this.currentPage > 1);

    this.startIndex = this.currentPage * this.pageSize - this.pageSize;

    if (this.startIndex >= 0) {
      const previousPage = this.pageData.slice(this.startIndex, this.startIndex + this.pageSize);
      this.pageLoaded.emit(previousPage);
    }
  }

  getNextPage(): any {
    this.startIndex = this.currentPage * this.pageSize;

    if (this.startIndex + this.pageSize < this.totalRecords) {
      this.currentPage++;
      const nextPage = this.pageData.slice(this.startIndex, this.startIndex + this.pageSize);
      this.pageLoaded.emit(nextPage);
    } else 
    if (this.startIndex === this.totalRecords) {
      const nextPage = this.pageData.slice(this.startIndex - this.pageSize, this.totalRecords);
      this.pageLoaded.emit(nextPage);
    }
    else {
      // return remaining records in the last page
      this.currentPage++;
      const nextPage = this.pageData.slice(this.startIndex, this.totalRecords);
      this.pageLoaded.emit(nextPage);
    }

    this.moreNextPages = (this.currentPage < this.totalPages);
    this.morePreviousPages = (this.currentPage > 1);
  }
}