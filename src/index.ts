import { server } from "./server/Serve";

server.listen(3333, () => {
    console.log("Server running on port 3333");
});