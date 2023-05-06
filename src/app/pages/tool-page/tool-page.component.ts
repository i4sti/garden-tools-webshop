import { Component, OnInit } from '@angular/core';
import { Tool } from '../../shared/models/Tool';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ToolService } from '../../services/tool/tool.service';
import { CartService } from '../../services/cart/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tool-page',
  templateUrl: './tool-page.component.html',
  styleUrls: ['./tool-page.component.scss']
})
export class ToolPageComponent implements OnInit  {

  tool!: Tool;
  constructor(private activatedRoute: ActivatedRoute,
    private toolService: ToolService,
    private cartService: CartService,
    private router: Router) {}

  addToCart() {
    this.cartService.addToCart(this.tool);
    this.router.navigateByUrl('/cart-page');
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.toolService.getToolById(id).subscribe(tool => {
          if (tool) {
            this.tool = tool;
            this.toolService.getToolImageUrl(tool.imageUrl).subscribe(url => {
              tool.imageUrl = url;
            });
          } else {
            this.router.navigateByUrl('/not-found');
          }
        });
      }
    });
  }


}
