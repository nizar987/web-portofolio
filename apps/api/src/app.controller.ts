import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContactDto } from "./dto/contact.dto";
import { portfolio } from "./portfolio.data";

@Controller()
export class AppController {
  @Get("health")
  health() {
    return {
      status: "ok",
      service: "web-cv-api",
      timestamp: new Date().toISOString()
    };
  }

  @Get("portfolio")
  getPortfolio() {
    return portfolio;
  }

  @Post("contact")
  submitContact(@Body() contact: ContactDto) {
    return {
      status: "accepted",
      message: "Contact message received",
      data: {
        name: contact.name,
        email: contact.email
      },
      timestamp: new Date().toISOString()
    };
  }
}
