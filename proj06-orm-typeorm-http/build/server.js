"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.default().then((app) => {
    app.listen(3000);
}).catch(error => {
    console.log(error);
    throw error;
});
//# sourceMappingURL=server.js.map