import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.markdownService.renderer.table = (header, body) => {
      return '<table class="table table-bordered">' + header + body + '</table>'
    }
  }

}
