import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  init(apiKey: string): Promise<void>;
  getVersion(): Promise<string>;
}

export const Sdk = TurboModuleRegistry.get<Spec>("AmapSdk");
