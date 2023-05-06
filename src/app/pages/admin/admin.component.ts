import { Component } from '@angular/core';
import { ToolService } from 'src/app/services/tool/tool.service';
import { Tool } from 'src/app/shared/models/Tool';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  displayedColumns: string[] = ['name', 'price', 'actions'];
  dataSource: Tool[] = [];
  selectedTool: Tool = new Tool();
  updateDialog: boolean = false; 
  addDialog: boolean = false; 

  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe(tools => {
      this.dataSource = tools;
    });
  }

  deleteTool(toolId: string): void {
    this.toolService.deleteTool(toolId)
      .then(() => {
        console.log('Tool deleted successfully.');
      })
      .catch(error => {
        console.error(error);
      });
  }
  openUpdateDialog(tool: Tool): void {
    this.selectedTool = tool;
    this.updateDialog = true;

  }
  closeUpdateDialog(){
    this.updateDialog = false;
  }
  updateTool(tool: Tool) {
    this.toolService.updateTool(tool.id, tool)
      .then(() => console.log(`Tool with id ${tool.id} updated successfully.`))
      .catch(error => console.log(`Error updating tool: ${error}`));
      this.updateDialog = false;
  }
  openAddDialog(){
    this.selectedTool = new Tool();
    this.addDialog = true;
  }
  closeAddDialog(){
    this.addDialog = false;
  }
  addTool():void {
    this.selectedTool.imageUrl = 'tools_image/not-found.jpg';
    this.selectedTool.tags = [];
    const toolData = Object.assign({}, this.selectedTool); 
  
    this.toolService.addTool(toolData)
      .then(() => {
        console.log('Tool added successfully!');
        this.closeAddDialog();
      })
      .catch((error) => {
        console.error('Error adding tool: ', error);
      });
  }
  
}
