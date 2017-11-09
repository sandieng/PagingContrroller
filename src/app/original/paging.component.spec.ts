import { Pagination } from "./paging.component";
import { TestBed } from "@angular/core/testing";

describe('Pagination', () => {
  let sampleList: any = [];

  beforeEach((done) => {
    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [],
        providers: []
      })
      .compileComponents()
      .then(() => {
        sampleList = [ 
          {'id': 1, 'title': 'typescript vol 1'}, 
          {'id': 2, 'title': 'typescript vol 2'},
          {'id': 3, 'title': 'typescript vol 3'},
          {'id': 4, 'title': 'typescript vol 4'},
          {'id': 5, 'title': 'typescript vol 5'},
          {'id': 6, 'title': 'typescript vol 6'},
          {'id': 7, 'title': 'typescript vol 7'},
          {'id': 8, 'title': 'typescript vol 8'},
        ];        
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  describe('#constructor', () => {
    it('create a paging object and fill the instance will initial values', () => {  
      const pages = new Pagination(sampleList, 3);

      expect(pages.currentPage).toEqual(1);
      expect(pages.totalPages).toEqual(3);
      expect(pages.moreNextPages).toEqual(true);
      expect(pages.morePreviousPages).toEqual(false);
      expect(pages.totalRecords).toEqual(8);
    });
  });

  describe('#getFirstPage', () => {
    it('should get the first page', () => {
      const pages = new Pagination(sampleList, 3);
      const firstPage = pages.getFirstPage();

      expect(firstPage.length).toEqual(3);
      expect(firstPage[0].id).toEqual(1);
    })
  });

  describe('#loadNextPage', () => {
    it('should load the next page', () => {
      const pages = new Pagination(sampleList, 3);
      const firstPage = pages.getFirstPage();
      const secondPage = pages.getNextPage();

      expect(secondPage.length).toEqual(3);
      expect(secondPage[0].id).toEqual(4);
    });

    it ('should return the same page when it is already at the last page', () => {
      const pages = new Pagination(sampleList, 8);
      const firstPage = pages.getFirstPage();
      const secondPage = pages.getNextPage();

      expect(secondPage).toEqual(firstPage);
      expect(secondPage.moreNextPages).toBeFalsy();
    });

    it ('should load the last page', () => {
      const pages = new Pagination(sampleList, 5);
      const firstPage = pages.getFirstPage();
      const lastPage = pages.getNextPage();

      expect(lastPage.length).toEqual(3);
      expect(lastPage.moreNextPages).toBeFalsy();
    });
  });

  describe('#loadPreviousPage', () => {
    it('should return the same page when it is already at the first page', () => {
      const pages = new Pagination(sampleList, 3);
      const firstPage = pages.getFirstPage();
      const pageZero = pages.getPreviousPage();

      expect(pageZero).toEqual(firstPage);
      expect(pageZero.morePreviousPages).toBeFalsy();
    });

    it('should return the previous page when it is not at the first page', () => {
      const pages = new Pagination(sampleList, 3);
      const firstPage = pages.getFirstPage();
      const secondPage = pages.getNextPage();
      const previousPage = pages.getPreviousPage();

      expect(previousPage).toEqual(firstPage);
      expect(previousPage.morePreviousPages).toBeFalsy();
    });
  });
});