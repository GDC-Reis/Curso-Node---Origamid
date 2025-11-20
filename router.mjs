export class Router {
  routes = {
    GET: {},
    POST: {},
  }

  get(route, handler) {
    this.routes["GET"][route] = handler;
  }

  post(route, handler) {
    this.routes["GET"][route] = handler;
  }

  find(method, route){
    // ?. -> tenta procurar a propriedade route caso o método exista (Não seja UNDEFINED)
    return this.routes[method]?.[route] || null;
  }
}