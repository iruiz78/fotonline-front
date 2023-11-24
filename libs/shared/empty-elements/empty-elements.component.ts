import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-elements',
  templateUrl: './empty-elements.component.html',
  styleUrls: ['./empty-elements.component.scss']
})
export class EmptyElementsComponent implements OnInit {
  @Input() empty: boolean;
  @Input() message: string = 'Sin Datos';

  constructor() { }

  ngOnInit(): void { }
}
