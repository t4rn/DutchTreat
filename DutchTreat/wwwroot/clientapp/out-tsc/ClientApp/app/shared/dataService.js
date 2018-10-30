var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Order, OrderItem } from "./order";
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.order = new Order();
        this.products = [];
    }
    DataService.prototype.loadProducts = function () {
        var _this = this;
        return this.http.get("/api/products")
            .pipe(map(function (data) {
            _this.products = data;
            return true;
        }));
    };
    DataService.prototype.addToOrder = function (newProduct) {
        var orderItem = this.order.items.find(function (i) { return i.productId == newProduct.id; });
        if (orderItem) {
            orderItem.quantity++;
        }
        else {
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
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=dataService.js.map