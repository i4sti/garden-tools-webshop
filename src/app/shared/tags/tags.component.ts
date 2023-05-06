import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../models/Tag';
import { ToolService } from '../../services/tool/tool.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input()
  toolPageTags?: string[];

  @Input()
  justifyContent: string = 'center'

  tags?: Tag[];

  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
    if (!this.toolPageTags) {
      this.tags = this.toolService.getAllTags();
    }
  }

}
