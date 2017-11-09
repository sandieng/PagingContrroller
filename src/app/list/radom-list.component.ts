import { Component } from '@angular/core';

@Component({
  selector: 'app-random-list',
  templateUrl: './random-list.component.html'
})
export class RandomListComponent {
  allSampleList: any[] = [
    {id: 1, details: 'sample detail 1'},
    {id: 2, details: 'sample detail 2'},
    {id: 3, details: 'sample detail 3'},
    {id: 4, details: 'sample detail 4'},
    {id: 5, details: 'sample detail 5'},
    {id: 6, details: 'sample detail 6'},
    {id: 7, details: 'sample detail 7'},
    {id: 8, details: 'sample detail 8'},
    {id: 9, details: 'sample detail 9'},
    {id: 10, details: 'sample detail 10'},
    {id: 11, details: 'sample detail 11'},
    {id: 12, details: 'sample detail 12'},
  ];

  sampleList: any[];

	loadPage(data) {
		this.sampleList = data;
	}
}
