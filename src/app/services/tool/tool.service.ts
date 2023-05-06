import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, tap } from 'rxjs';
import { Tag } from 'src/app/shared/models/Tag';
import { Tool } from 'src/app/shared/models/Tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private toolsCollection: AngularFirestoreCollection<Tool>;
  private tools: Observable<Tool[]>;

  constructor(private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) { 
    this.toolsCollection = afs.collection<Tool>('Tools');
    this.tools = this.toolsCollection.valueChanges({ idField: 'id' });
  }

  getToolById(id:number): Observable<Tool | undefined> {
    return this.afs.doc<Tool>(`Tools/${id}`).valueChanges();

  }
  capitalizeFirstLetter(str: string): string {
    const  word = str.charAt(0).toUpperCase() + str.slice(1)
    return word;
  
  }
    
  
  getAllToolsBySearchTerm(searchTerm: string): Observable<Tool[]> {
    const capitalizedSearchTerm = this.capitalizeFirstLetter(searchTerm);
    const startAt = capitalizedSearchTerm;
    const endAt = capitalizedSearchTerm + '\uf8ff';
  
    return this.afs.collection<Tool>('Tools', ref =>
      ref.where('name', '>=', startAt)
         .where('name', '<=', endAt)
         .orderBy('name')
         .limit(5)
    ).valueChanges({ idField: 'id' });
  }

  getAllToolsByTag(tag:string):Observable<Tool[]> {
    if (tag == 'All') {
      return this.tools;
    } else {
      return this.afs.collection<Tool>('Tools', ref => 
        ref.where('tags', 'array-contains', tag).orderBy('name')
      ).valueChanges({ idField: 'id' });
      
    }
  }

  getAllTools(): Observable<Tool[]> {
    return this.tools;
  }

  getAllTags():Tag[]{
    return[
      {name: 'All', count: 12},
      {name: 'chopping', count: 2},
      {name: 'digging', count: 3},
      {name: 'cutting', count: 6},
      {name: 'trimming', count: 2}
    ];

  }
  getToolImageUrl(imageUrl: string): Observable<string> {
    const storageRef = this.storage.ref(imageUrl);
    return storageRef.getDownloadURL();
  }

   // Add new tool
  addTool(tool: Tool): Promise<any> {
    return this.toolsCollection.add(tool);
  }

  // Delete tool
  deleteTool(toolId: string): Promise<void> {
    return this.toolsCollection.doc(toolId).delete();
  }

  //Update tool
  updateTool(toolId: number, tool: Tool): Promise<void> {
    const toolRef = this.toolsCollection.doc(toolId.toString());
    return toolRef.update(tool);
  }
 
  
  


 
  


}
