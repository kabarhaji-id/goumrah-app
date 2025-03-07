import {LandingRepository} from "@/modules/landing/infrastructure/landingRepository";
import { LandingService } from "@/modules/landing/application/landingService";

export function createLandingHandler() {
    const repository = new LandingRepository();
    return new LandingService(repository);
}
