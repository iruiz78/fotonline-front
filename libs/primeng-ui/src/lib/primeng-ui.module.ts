import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from 'primeng/overlay';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    OverlayPanelModule,
    AvatarModule,
    BadgeModule,
    TableModule
  ],
  exports: [
    CommonModule,
    OverlayModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    OverlayPanelModule,
    AvatarModule,
    BadgeModule,
    TableModule
  ]
})
export class PrimengUiModule {}
