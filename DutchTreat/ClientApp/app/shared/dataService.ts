import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { Order, OrderItem } from "./order";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    private token: string = "";
    private tokenExpiration: Date;


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

    public get loginRequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    login(creds): Observable<boolean> {
        return this.http
            .post("/account/createtoken", creds)
            .pipe(
                map((data: any) => {
                    this.token = data.token;
                    this.tokenExpiration = data.expiration;
                    return true;
                }));
    }

    public checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }

        return this.http.post("/api/orders", this.order, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        })
            .pipe(
                map(response => {
                    this.order = new Order();
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