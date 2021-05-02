import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";
import {initialData} from './Data'

faker.seed(125);

export default function setupMockServer() {
    console.log("dsscsd");
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      video: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("videos");
    },

    seeds(server) {
      [...initialData].forEach((item) => {
        server.create("video", item);
      });
    }
  });
}