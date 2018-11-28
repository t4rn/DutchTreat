# DutchTreat

Building a Web App with ASP.NET Core, MVC, Entity Framework Core, Bootstrap, and Angular
by Shawn Wildermuth

ef: 
* `dotnet ef database update`
* `dotnet ef migrations add InitialDb`
* `dotnet ef database drop`

npm:
* `npm -g  install @angular/cli`
* `npm install`

angular:
* `ng --version`
* `ng serve`
* `ng build --watch`

gulp:
* `npm install -g gulp`
* `gulp`
* `fulp minify`

run from local publish folder:
* `dotnet DutchTreat.dll`

deployment scripts in `DutchTreat.csproj`

self-contaied publish:
* `dotnet publish -o c:\_dutchTreatPublishSelfContained --self-contained`
* `dotnet DutchTreat.exe`
