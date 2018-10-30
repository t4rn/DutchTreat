import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { Order, OrderItem } from "./order";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public order: Order = new Order();
    public products: Product[] = [];

    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            .pipe(
                map((data: any[]) => {
                    this.products = data;
                    return true;
                }));
    }

    public addToOrder(newProduct: Product) {

        let orderItem: OrderItem = this.order.items.find(i => i.productId == newProduct.id);
        if (orderItem) {
            orderItem.quantity++;
        } else {
            orderItem = new OrderItem();
            orderItem.productId = newProduct.id;
            orderItem.productArtist = newProduct.artist;
            orderItem.productArtId = newProduct.artId;
            orderItem.productCategory = newProduct.category;
            orderItem.productSize = newProduct.size;
            orderItem.productTitle = newProduct.title;
            orderItem.unitPrice = newProduct.price;
            orderItem.quantity = 1;

            this.order.items.push(orderItem);
        }
    }
}