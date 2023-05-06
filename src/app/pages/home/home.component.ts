import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool/tool.service';
import { Tool } from 'src/app/shared/models/Tool';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tools: Tool[] = [];

  constructor (private toolService :ToolService, private route:ActivatedRoute){}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        const searchTerm = params['searchTerm'].toLowerCase();
        this.toolService.getAllToolsBySearchTerm(searchTerm).subscribe(tools => {
          tools.forEach(tool => {
            this.toolService.getToolImageUrl(tool.imageUrl).subscribe(url => {
              tool.imageUrl = url;
            });
          });
          this.tools = tools;
          console.log(this.tools); // add this line to check if data is being fetched correctly
        });
      } else if (params['tag']) {
        const tag = params['tag'];
        this.toolService.getAllToolsByTag(tag).subscribe(tools => {
          tools.forEach(tool => {
            this.toolService.getToolImageUrl(tool.imageUrl).subscribe(url => {
              tool.imageUrl = url;
            });
          });
          this.tools = tools;
          console.log(this.tools); // add this line to check if data is being fetched correctly
        });
      } else {
        this.toolService.getAllTools().subscribe(tools => {
          tools.forEach(tool => {
            this.toolService.getToolImageUrl(tool.imageUrl).subscribe(url => {
              tool.imageUrl = url;
            });
          });
          this.tools = tools;
        });
      }
    });
  }
  
 
  
}
