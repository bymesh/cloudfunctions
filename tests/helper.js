import {loadFirestoreRuls, initializeTestApp} from "@firebase/rules-unit-testing"
import { readFileSync } from "fs"

export const setup = async (auth,data) => {
  const projectId = "mesh-dev-55129"
  const app = initializeTestApp({projectId, auth})
}

export const teardown = async () => {
  
}