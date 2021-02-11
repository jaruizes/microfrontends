import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc/doc.component';
import { DocRoutingModule } from './doc-routing.module';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [DocComponent],
  imports: [
    CommonModule,
    DocRoutingModule,
    MarkdownModule.forChild()
  ]
})
export class DocModule { }
